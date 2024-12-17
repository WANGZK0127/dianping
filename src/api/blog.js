import request from './request'

// 获取热门博客列表
export const getHotBlogs = (current = 1) => {
  return request({
    url: '/blog/hot',
    method: 'get',
    params: { current }
  })
}

// 获取博客详情
export const getBlogById = (id) => {
  return request({
    url: `/blog/${id}`,
    method: 'get'
  })
}

// 点赞博客
export const likeBlog = (id) => {
  return request({
    url: `/blog/like/${id}`,
    method: 'get'
  })
}

// 获取博客点赞列表
export const getBlogLikes = (id) => {
  return request({
    url: `/blog/likes/${id}`,
    method: 'get'
  })
}

// 获取个人博客列表
export const getBlogOfMe = () => {
  return request({
    url: '/blog/of/me',
    method: 'get'
  })
}

// 获取博客内商铺信息
export const getBlogShopInfo = (id) => {
  return request({
    url: '/shop/inBlog',
    method: 'get',
    params: { id }
  })
} 