import request from '@/utils/request'

var path = '/home'
// export function insertOrUpdateLbItems(data, filesCsLd) {
//   if (data.B107) {
//     data.B107 = data.B107.toString()
//   }
//   let param = new FormData()
//   if (filesCsLd !== undefined && filesCsLd) {
//     for (var i = 0; i < filesCsLd.length; i++) {
//       param.append('filescsLd_' + i, filesCsLd[i].raw)
//     }
//   }
//   param.append('data', JSON.stringify(data))
//   return request({
//     headers: { 'Content-Type': 'multipart/form-data' },
//     url: address + '/dflzapi/portal/saveFh',
//     method: 'post',
//     data: param,
//   })
// }
export function login(data) {
  return request({
    url: path + '/adminlogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: path + '/admininfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: path + '/vue-element-admin/user/logout',
    method: 'post'
  })
}
export function getLb() {
  return request({
    url: path + '/getLb',
    method: 'get'
  })
}
export function getLbXms() {
  return request({
    url: path + '/getLbXms',
    method: 'get'
  })
}
export function delLb(params) {
  return request({
    url: path + '/delLb',
    method: 'get',
    params: params
  })
}
export function delXm(params) {
  return request({
    url: path + '/delXm',
    method: 'get',
    params: params
  })
}
export function insertOrUpdateLbItemPic(id, filesCsLd) {
  const param = new FormData()
  param.append('file', filesCsLd.raw)
  param.append('id', id)
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: path + '/insertOrUpdateLbItemPic',
    method: 'post',
    data: param
  })
}

export function insertOrUpdateLbPic(id, filesCsLd) {
  const param = new FormData()
  param.append('file', filesCsLd.raw)
  param.append('id', id)
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: path + '/insertOrUpdateLbPic',
    method: 'post',
    data: param
  })
}
export function insertOrUpdateLbs(formData) {
  const param = new FormData()
  // param.append('file', filesCsLd.raw)
  param.append('id', formData.id)
  param.append('create', formData.create)
  param.append('code', formData.code)
  param.append('name', formData.name)
  param.append('picName', formData.picName)
  param.append('picPath', formData.picPath)
  param.append('picPath', formData.picPath)
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: path + '/insertOrUpdateLbs',
    method: 'post',
    data: param
  })
}
export function insertOrUpdateLbItem(formData) {
  const param = new FormData()
  // param.append('file', filesCsLd.raw)
  param.append('id', formData.id)
  param.append('create', formData.create)
  param.append('parent', formData.parent)
  param.append('code', formData.code)
  param.append('name', formData.name)
  param.append('price', formData.price)
  param.append('unit', formData.unit)
  param.append('sold', formData.sold)
  param.append('fwqx', formData.fwqx)
  param.append('fwxz', formData.fwxz)
  param.append('fwxj', formData.fwxj)
  param.append('fwbz', formData.fwbz)
  param.append('picName', formData.picName)
  param.append('picPath', formData.picPath)
  param.append('picPath', formData.picPath)
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: path + '/insertOrUpdateLbItem',
    method: 'post',
    data: param
  })
}
export function insertOrUpdateLb(data) {
  return request({
    url: path + '/insertOrUpdateLb',
    method: 'post',
    data
  })
}
export function changeIsChoice(params) {
  return request({
    url: path + '/changeIsChoice',
    method: 'get',
    params
  })
}
export function findPage(data) {
  return request({
    url: path + '/findPage',
    method: 'post',
    data
  })
}
export function findLogPage(data) {
  return request({
    url: path + '/findLogPage',
    method: 'post',
    data
  })
}
export function cancel(data) {
  return request({
    url: '/api/wx-pay/cancel/',
    method: 'post',
    data
  })
}
export function refunds(orderNo, reason) {
  return request({
    url: '/api/wx-pay/refunds/' + orderNo + '/' + reason,
    method: 'post'
  })
}
//
export function taskFindOrders(data) {
  return request({
    url: path + '/taskFindOrders',
    method: 'post',
    data
  })
}
