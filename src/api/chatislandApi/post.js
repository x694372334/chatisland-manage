import request from '@/utils/request'

// 查询post列列表
export function listPost(query) {
  return request({
    url: '/system/chatislandPost/list',
    method: 'get',
    params: query
  })
}

// 查询post列详细
export function getPost(postId) {
  return request({
    url: '/system/chatislandPost/' + postId,
    method: 'get'
  })
}

// 新增post列
export function addPost(data) {
  return request({
    url: '/system/chatislandPost',
    method: 'post',
    data: data
  })
}

// 修改post列
export function updatePost(data) {
  return request({
    url: '/system/chatislandPost',
    method: 'put',
    data: data
  })
}

// 删除post列
export function delPost(postId) {
  return request({
    url: '/system/chatislandPost/' + postId,
    method: 'delete'
  })
}
