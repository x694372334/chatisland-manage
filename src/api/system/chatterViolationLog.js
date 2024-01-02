import request from '@/utils/request'

// 扣除chatter钻石
export function violationChatterDiamond(data) {
  return request({
    url: '/system/chatter/violationChatterDiamond',
    method: 'post',
    data: data
  })
}

// 删除扣除记录
export function deleteViolationLog(id) {
  return request({
    url: '/system/chatter/deleteViolationLog',
    method: 'post',
    data: {id: id}
  })
}

// 查询chatter扣除记录
export function selectChatterViolationLogList(data) {
  return request({
    url: '/system/chatter/selectChatterViolationLogList',
    method: 'post',
    data: data
  })
}
