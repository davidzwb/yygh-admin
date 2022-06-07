import request from '@/utils/request'

export default {
  // 医院列表
  getPageList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospital/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  }, // 查询dictCode查询下级数据字典
  findByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  }, // 根据id查询下级数据字典
  findByParentId(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  }
}
