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
export const getUserMe = () => {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

// 获取用户详细信息
export const getUserDetailInfo = () => {
  return request({
    url: '/userInfo/info',
    method: 'get'
  })
}

// 获取我的关注列表
export const getMyFollows = () => {
  return request({
    url: '/follow/follows',
    method: 'get'
  })
}

// 获取我的粉丝列表
export const getMyFans = () => {
  return request({
    url: '/follow/followMe',
    method: 'get'
  })
}

// 关注/取消关注用户
export const followUser = (id, isFollow) => {
  return request({
    url: `/follow/${id}/${isFollow}`,
    method: 'put'
  })
}

// 判断是否关注
export const isFollow = (id) => {
  return request({
    url: `/follow/if/${id}`,
    method: 'get'
  })
}

// ... existing code ... 