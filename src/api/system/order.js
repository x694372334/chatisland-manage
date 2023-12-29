import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/pay/order/selectOrderTable',
    method: 'post',
    data: query
  })
}
