import request from '@/utils/request'

// 查询参数列表
export function listPropType(query) {
  return request({
    url: '/system/propType/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getPropType(id) {
  return request({
    url: '/system/propType/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addPropType(data) {
  return request({
    url: '/system/propType',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updatePropType(data) {
  return request({
    url: '/system/propType',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delPropType(id) {
  return request({
    url: '/system/propType/' + id,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/propType/refreshCache',
    method: 'delete'
  })
}

