import request from '@/utils/request'

// 查询用户列表
export function listChatterBindName(query) {
  return request({
    url: '/system/chatter/listChatterBindName',
    method: 'post',
    data: query
  })
}

// 查询用户列表
export function listAllChatter() {
  return request({
    url: '/system/chatter/listAllChatter',
    method: 'post'
  })
}

// 查询chatte真实名称
export function getChatterBindName(chatterId) {
  return request({
    url: '/system/chatter/getChatterBindName',
    method: 'post',
    data: {
      chatterId: chatterId
    }
  })
}

// chatter注册
export function addChatterBindName(data) {
  return request({
    url: '/system/chatter/addChatterBindName',
    method: 'post',
    data: data
  })
}

// 修改chatter
export function editChatterBindName(data) {
  return request({
    url: '/system/chatter/editChatterBindName',
    method: 'post',
    data: data
  })
}

// 查询chatter薪资参数
export function listChatterSalaryParams(data) {
  return request({
    url: '/report/listChatterSalaryParams',
    method: 'post',
    data: data
  })
}
