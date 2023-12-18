import request from '@/utils/request'

// 查询性别数据
export function userGenderReport() {
  return request({
    url: '/report/userGenderReport',
    method: 'get'
  })
}

// 查询年龄数据
export function userAgeReport() {
  return request({
    url: '/report/userAgeReport',
    method: 'get'
  })
}

// 查询年龄数据
export function userLabelReport() {
  return request({
    url: '/report/userLabelReport',
    method: 'get'
  })
}

export function basicsAppData(data) {
  return request({
    url: '/report/basicsAppData',
    method: 'POST',
    data: data
  })
}

export function profileSelectTransform(data) {
  return request({
    url: '/report/profileSelectTransform',
    method: 'POST',
    data: data
  })
}

export function swipeSelectTransform(data) {
  return request({
    url: '/report/swipeSelectTransform',
    method: 'POST',
    data: data
  })
}

export function diamondConstructionUnionTransformOne(data) {
  return request({
    url: '/report/diamondConstructionUnionTransformOne',
    method: 'POST',
    data: data
  })
}

export function diamondConstructionUnionTransformTwo(data) {
  return request({
    url: '/report/diamondConstructionUnionTransformTwo',
    method: 'POST',
    data: data
  })
}

export function diamondUnlockTransform(data) {
  return request({
    url: '/report/diamondUnlockTransform',
    method: 'POST',
    data: data
  })
}

export function diamondGiftTransform(data) {
  return request({
    url: '/report/diamondGiftTransform',
    method: 'POST',
    data: data
  })
}

export function diamondFlashTransformOne(data) {
  return request({
    url: '/report/diamondFlashTransformOne',
    method: 'POST',
    data: data
  })
}

export function diamondFlashTransformTwo(data) {
  return request({
    url: '/report/diamondFlashTransformTwo',
    method: 'POST',
    data: data
  })
}

export function diamondFunctionTransformOne(data) {
  return request({
    url: '/report/diamondFunctionTransformOne',
    method: 'POST',
    data: data
  })
}


export function diamondFunctionTransformTwo(data) {
  return request({
    url: '/report/diamondFunctionTransformTwo',
    method: 'POST',
    data: data
  })
}

export function diamondFunctionTransformThree(data) {
  return request({
    url: '/report/diamondFunctionTransformThree',
    method: 'POST',
    data: data
  })
}






// 消耗深度
export function consumeDepth(data) {
  return request({
    url: '/report/consumeDepth',
    method: 'post',
    data: data
  })
}

// 内容消费
export function contentConsume(data) {
  return request({
    url: '/report/contentConsume',
    method: 'post',
    data: data
  })
}

// 赠礼消耗深度
export function chatterConsume(data) {
  return request({
    url: '/report/chatterConsume',
    method: 'post',
    data: data
  })
}

// 平均付费转化
export function avgChatterConsume(data) {
  return request({
    url: '/report/avgChatterConsume',
    method: 'post',
    data: data
  })
}

// 付费转化情况-钻石消耗
export function diamondPaidConversion(data) {
  return request({
    url: '/report/diamondPaidConversion',
    method: 'post',
    data: data
  })
}

// 充值分布
export function payOrderDistribution(data) {
  return request({
    url: '/report/payOrderDistribution',
    method: 'post',
    data: data
  })
}

// 付费深度分布
export function paymentDepthDistribution(data) {
  return request({
    url: '/report/paymentDepthDistribution',
    method: 'post',
    data: data
  })
}

// 首次付费转化
export function firstPayMsgRate(data) {
  return request({
    url: '/report/firstPayMsgRate',
    method: 'post',
    data: data
  })
}

// 消耗倾向分布
export function diamondConsumeCount(data) {
  return request({
    url: '/report/diamondConsumeCount',
    method: 'post',
    data: data
  })
}

// 消费人设集中度分布
export function characterConsumeConcentrationRatio(data) {
  return request({
    url: '/report/characterConsumeConcentrationRatio',
    method: 'post',
    data: data
  })
}

// 营收数据折线图
export function revenueData(data) {
  return request({
    url: '/report/revenueData',
    method: 'post',
    data: data
  })
}

// 人设阅后即焚归因
export function chatterFireImageOrder(data) {
  return request({
    url: '/report/chatterFireImageOrder',
    method: 'post',
    data: data
  })
}

// chatter在线时长
export function chatterOnlineDuration(data) {
  return request({
    url: '/report/chatterOnlineDuration',
    method: 'post',
    data: data
  })
}
