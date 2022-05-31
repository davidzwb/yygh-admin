<template>
  <div class="login-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getList()"
      >查询</el-button
      >
      <el-form-item>
        <el-button type="danger" @click="removeRows()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button
          >
          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id, 0)"
          >锁定</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id, 1)"
          >取消锁定</el-button
          >
          <router-link :to="`/hospSet/edit/${scope.row.id}`">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import getHospSet from '../../api/hospset'

export default {
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {},
      list: [],
      total: 0,
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.current = page
      getHospSet
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getHospSet
            .deleteHospSet(id)
            .then(response => {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: error
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    removeRows() {
      this.$confirm('此操作将永久删除该医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.multipleSelection.length !== 0) {
            const idList = this.multipleSelection.map(item => item.id)
            getHospSet
              .removeRows(idList)
              .then(response => {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              })
              .catch(error => {
                console.log(error)
                this.$message({
                  type: 'error',
                  message: error
                })
              })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    lockHostSet(id, status) {
      getHospSet.lockHospSet(id, status).then(() => {
        this.getList(this.current)
      })
    }
  }
}
</script>
