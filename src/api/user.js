import request from './request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户主页信息
export function getUserMe() {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

// 获取用户详细信息
export function getUserDetailInfo() {
  return request({
    url: '/userInfo/info',
    method: 'get'
  })
} 