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
    method: 'get',
    noAuth: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
    method: 'get',
    noAuth: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取我的博客列表
export const getBlogOfMe = (current = 1) => {
  return request({
    url: '/blog/of/me',
    method: 'get',
    params: { current }
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

// 获取关注列表博客
export const getFollowBlogs = (lastId, offset) => {
  return request({
    url: '/blog/myFollow',
    method: 'get',
    params: {
      lastId: lastId || Date.now(),
      offset: offset || ''
    }
  })
}

// 获取博客评论列表
export const getBlogComments = (id) => {
  return request({
    url: `/commentReply/list`,
    method: 'post',
    params: { id }
  }).then(response => {
    console.log('API Response:', response)
    return response
  })
}

// 添加评论或回复
export const addComment = (blogId, content, options = {}) => {
  const { replyType = 1, targetId = null } = options
  return request({
    url: '/commentReply/save',
    method: 'post',
    data: {
      blogId,
      content,
      replyType, // 1表示评论，2表示回复
      targetId   // 回复时设置为父评论的ID
    }
  }).then(response => {
    console.log('评论/回复响应:', response)
    return response
  })
}

// 发布博客
export const createBlog = (blog) => {
  return request({
    url: '/blog/',
    method: 'post',
    data: blog
  })
}

// 删除图片
export const deleteImage = (imagePath) => {
  return request({
    url: '/upload/delete',
    method: 'get',
    params: {
      name: imagePath
    },
    transformResponse: [(data) => {
      return JSON.parse(data)
    }]
  })
} 