<template>
  <div class="app-container">
    医院设置编辑
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospset from '../../api/hospset'

export default {
  data() {
    return {
      hospitalSet: {}
    }
  },
  created() {
    console.log('params: ' + this.$route.params)
    hospset.getHospSet(this.$route.params.id).then(response => {
      this.hospitalSet = response.data
    })
  },
  methods: {
    saveOrUpdate() {
      hospset.updateHospSet(this.hospitalSet).then(() => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.$router.push({ path: '/hospSet/list' })
      })
    }
  }
}
</script>
