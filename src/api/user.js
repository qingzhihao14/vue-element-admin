import request from '@/utils/request'

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
    url: '/adminlogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admininfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
export function getLb() {
  return request({
    url: '/getLb',
    method: 'get'
  })
}
export function getLbXms() {
  return request({
    url: '/getLbXms',
    method: 'get'
  })
}
export function delLb(params) {
  return request({
    url: '/delLb',
    method: 'get',
    params: params
  })
}
export function delXm(params) {
  return request({
    url: '/delXm',
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
    url: '/insertOrUpdateLbItemPic',
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
    url: '/insertOrUpdateLbItem',
    method: 'post',
    data: param
  })
}
export function insertOrUpdateLb(data) {
  return request({
    url: '/insertOrUpdateLb',
    method: 'post',
    data
  })
}
export function changeIsChoice(params) {
  return request({
    url: '/changeIsChoice',
    method: 'get',
    params
  })
}

