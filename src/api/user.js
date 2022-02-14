import request from '@/utils/request'

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
