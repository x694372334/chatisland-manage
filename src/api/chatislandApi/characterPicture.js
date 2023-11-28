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
export function listPicture(query) {
  console.log(query)
  return request({
    url: '/system/member/selectCharacterPictureTable',
    method: 'get',
    params: query
  })
}

// 上传图片
export function uploadPictures(data) {
  return request({
    url: '/system/member/uploadCharacterPictures',
    method: 'post',
    data: data
  })
}

// 删除图片
export function delPicture(id) {
  return request({
    url: '/system/member/deletePicture/' + id,
    method: 'delete'
  })
}

// 保存图片排序
export function savePictureSort(data) {
  return request({
    url: '/system/member/sortCharacterPictures',
    method: 'post',
    data: {
      list: data
    }
  })
}
