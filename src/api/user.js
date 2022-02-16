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
export function getLbXms() {
  return request({
    url: '/getLbXms',
    method: 'get'
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

export function insertOrUpdateLbItem(data) {
  return request({
    url: '/insertOrUpdateLbItem',
    method: 'post',
    data
  })
}
export function insertOrUpdateLb(data) {
  return request({
    url: '/insertOrUpdateLb',
    method: 'post',
    data
  })
}
