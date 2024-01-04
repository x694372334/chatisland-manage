import request from '@/utils/request'

// 查询用户列表
export function listChatter(query) {
  return request({
    url: '/system/chatter/listChatter',
    method: 'post',
    data: query
  })
}

// 查询chatter详细
export function getChatter(chatterId) {
  return request({
    url: '/system/chatter/chatterDetail',
    method: 'post',
    data: {
      chatterId: chatterId
    }
  })
}

// chatter注册
export function register(data) {
  return request({
    url: '/system/chatter/register',
    method: 'post',
    data: data
  })
}

// 修改chatter
export function updateChatter(data) {
  return request({
    url: '/system/chatter/edit',
    method: 'post',
    data: data
  })
}

// 删除chatter
export function delChatter(chatterId) {
  return request({
    url: '/system/chatter/delChatter',
    method: 'post',
    data: {
      id: chatterId
    }
  })
}

// 修改chatter密码
export function changePass(data) {
  return request({
    url: '/system/chatter/changePass',
    method: 'post',
    data: data
  })
}

// 分组获取
export function groupChatterHourCountMsg(data) {
  return request({
    url: '/system/chatter/groupChatterHourCountMsg',
    method: 'post',
    data: data
  })
}
