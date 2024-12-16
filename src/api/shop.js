import request from './request'

// 获取商店类型列表
export const getShopTypes = () => {
  return request({
    url: '/shopType/list',
    method: 'get'
  })
}

// 根据id查询商铺详情
export const getShopById = (id) => {
  return request({
    url: `/shop/${id}`,
    method: 'get'
  })
}

// 根据分类查询商铺
export const getShopsByType = (typeId, current = 1) => {
  return request({
    url: '/shop/type',
    method: 'get',
    params: { typeId, current }
  })
}

// 根据商铺名模糊查询
export const searchShops = (name, current = 1) => {
  return request({
    url: '/shop/name',
    method: 'get',
    params: { name, current }
  })
} 