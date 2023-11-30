import request from '@/utils/request'

// 查询性别数据
export function userGenderReport() {
  return request({
    url: '/system/report/userGenderReport',
    method: 'get'
  })
}

// 查询年龄数据
export function userAgeReport() {
  return request({
    url: '/system/report/userAgeReport',
    method: 'get'
  })
}

// 查询年龄数据
export function userLabelReport() {
  return request({
    url: '/system/report/userLabelReport',
    method: 'get'
  })
}
