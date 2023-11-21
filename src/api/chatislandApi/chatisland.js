import request from '@/utils/request'

// 查询chatisLand列表
export function listChatisland(query) {
  return request({
    url: '/chatisland/list',
    method: 'get',
    params: query
  })
}

// 查询chatisLand详细
export function getChatisland(chatislandId) {
  return request({
    url: '/chatisland/' + chatislandId,
    method: 'get'
  })
}

// 新增chatisLand
export function addChatisland(data) {
  return request({
    url: '/chatisland',
    method: 'post',
    data: data
  })
}

// 修改chatisLand
export function updateChatisland(data) {
  return request({
    url: '/chatisland',
    method: 'put',
    data: data
  })
}

// 删除chatisLand
export function delChatisland(chatislandId) {
  return request({
    url: '/chatisland/' + chatislandId,
    method: 'delete'
  })
}
