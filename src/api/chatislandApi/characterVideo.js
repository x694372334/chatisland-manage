import request from '@/utils/request'

// 查询全部人设用户列表
export function selectAllSystemUserList() {
  return request({
    url: '/system/member/selectAllSystemUserList',
    method: 'post',
    params: {}
  })
}

// 查询图片列表
export function listVideo(query) {
  console.log(query)
  return request({
    url: '/system/member/selectCharacterVideoTable',
    method: 'get',
    params: query
  })
}

// 上传图片
export function uploadVideos(data) {
  return request({
    url: '/system/member/uploadCharacterVideos',
    method: 'post',
    data: data
  })
}

// 删除图片
export function delVideo(id) {
  return request({
    url: '/system/member/deleteVideo/' + id,
    method: 'delete'
  })
}

// 保存图片排序
export function saveVideoSort(data) {
  return request({
    url: '/system/member/sortCharacterVideos',
    method: 'post',
    data: {
      list: data
    }
  })
}
