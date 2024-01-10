import request from '@/utils/request'

// 查询chatisland举报列表
export function listReport(query) {
  return request({
    url: '/report/list',
    method: 'get',
    params: query
  })
}

// 查询chatisland举报详细
export function getReport(id) {
  return request({
    url: '/report/' + id,
    method: 'get'
  })
}

// 新增chatisland举报
export function addReport(data) {
  return request({
    url: '/report',
    method: 'post',
    data: data
  })
}

// 修改chatisland举报
export function updateReport(data) {
  return request({
    url: '/report',
    method: 'put',
    data: data
  })
}

// 删除chatisland举报
export function delReport(id) {
  return request({
    url: '/report/' + id,
    method: 'delete'
  })
}
