import request from '@/utils/request'

// 查询参数列表
export function listInformation(query) {
  return request({
    url: '/system/information/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getInformation(id) {
  return request({
    url: '/system/information/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addInformation(data) {
  return request({
    url: '/system/information',
    method: 'post',
    data: data
  })
}

// 删除参数配置
export function delInformation(id) {
  return request({
    url: '/system/information/' + id,
    method: 'delete'
  })
}

// 删除参数配置
export function publishInformation(id) {
  return request({
    url: '/system/information/publish',
    method: 'post',
    data: {"id": id}
  })
}
