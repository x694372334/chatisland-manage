import request from '@/utils/request'

// 查询用户信息列表
export function listUser(query) {
  return request({
    url: '/system/user/listBackgroud',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'get'
  })
}

// 新增用户信息
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

export function chatisland(userId) {
  return request({
    url: '/chatisland/list?createBy=' + userId,
    method: 'get'
  })
}

export function addCharacterProp(data) {
  return request({
    url: '/system/member/addCharacterProp',
    method: 'post',
    data: data
  })
}

export function createFirstChatisland(ids){
  return request({
    url: '/chatisland/createFirstChatisland',
    method: 'post',
    data: {ids: ids}
  })
}

export function selectChatHistory(query){
  return request({
    url: '/system/user/selectChatHistory',
    method: 'get',
    params: query
  })
}

export function selectChatHistoryFromUser(query){
  return request({
    url: '/system/user/selectChatHistoryFromUser',
    method: 'get',
    params: query
  })
}

export function selectChatHistoryFromChatter(query){
  return request({
    url: '/system/user/selectChatHistoryFromChatter',
    method: 'get',
    params: query
  })
}
export function selectChatHistoryToUser(query){
  return request({
    url: '/system/user/selectChatHistoryToUser',
    method: 'get',
    params: query
  })
}

export function selectChatHistoryToCharacter(query){
  return request({
    url: '/system/user/selectChatHistoryToCharacter',
    method: 'get',
    params: query
  })
}

export function selectChatHistoryExport(data){
  return request({
    url: '/system/user/selectChatHistoryExport',
    method: 'post',
    data: data
  })
}

export function selectChatHistoryList(data){
  return request({
    url: '/system/user/selectChatHistoryList',
    method: 'post',
    data: data
  })
}

