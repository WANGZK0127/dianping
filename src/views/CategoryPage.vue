<template>
  <div class="category-page">
    <div class="category-header">
      <h1>{{ categoryName }}</h1>
      <el-tag size="large" effect="plain">{{ totalShops }} 家商户</el-tag>
    </div>

    <div class="shop-list">
      <el-row :gutter="16" justify="center">
        <el-col :span="6" v-for="shop in shops" :key="shop.id">
          <el-card class="shop-card" @click="goToShopDetail(shop.id)">
            <img :src="shop.image" class="shop-image">
            <div class="shop-info">
              <h3>{{ shop.name }}</h3>
              <div class="rating">
                <el-rate v-model="shop.rating" disabled text-color="#ff9900" />
                <span>{{ shop.rating }}分</span>
              </div>
              <div class="tags">
                <el-tag v-for="tag in shop.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
              </div>
              <p class="address">{{ shop.address }}</p>
              <div class="price-info">
                <span class="price">人均 ¥{{ shop.averagePrice }}</span>
                <span class="monthly-sales">月售{{ shop.monthlySales }}单</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'CategoryPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const shops = ref([])

    const categoryName = computed(() => {
      const category = route.params.category
      return decodeURIComponent(category)
    })

    onMounted(() => {
      // 模拟获取分类数据
      // 实际项目中应该调用API获取对应分类的商家
      shops.value = [
        {
          id: 1,
          name: '老王火锅',
          rating: 4.8,
          image: 'https://via.placeholder.com/300x200',
          address: '北京市朝阳区xxx街xxx号',
          averagePrice: 98,
          tags: ['特色火锅', '川味'],
          monthlySales: 2890
        },
        {
          id: 2,
          name: '聚福楼',
          rating: 4.6,
          image: 'https://via.placeholder.com/300x200',
          address: '北京市海淀区xxx路xxx号',
          averagePrice: 78,
          tags: ['粤式点心', '茶楼'],
          monthlySales: 2100
        },
        {
          id: 3,
          name: '小李烧烤',
          rating: 4.7,
          image: 'https://via.placeholder.com/300x200',
          address: '北京市西城区xxx胡同xxx号',
          averagePrice: 45,
          tags: ['烧烤', '夜宵'],
          monthlySales: 3200
        },
        {
          id: 4,
          name: '京味小馆',
          rating: 4.5,
          image: 'https://via.placeholder.com/300x200',
          address: '北京市东城区xxx路xxx号',
          averagePrice: 68,
          tags: ['北京菜', '家常菜'],
          monthlySales: 1800
        }
      ]
    })

    const totalShops = computed(() => shops.value.length)

    const goToShopDetail = (shopId) => {
      router.push(`/shop/${shopId}`)
    }

    return {
      shops,
      categoryName,
      totalShops,
      goToShopDetail
    }
  }
}
</script>

<style scoped>
.category-page {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.category-header {
  max-width: 1200px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.category-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.shop-list {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
}

.shop-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.shop-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.shop-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.shop-info {
  padding: 12px;
}

.shop-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rating span {
  color: #ff9900;
  font-size: 14px;
}

.tags {
  margin: 8px 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.address {
  color: #666;
  font-size: 13px;
  margin: 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.price {
  color: #f60;
  font-size: 14px;
  font-weight: bold;
}

.monthly-sales {
  color: #999;
  font-size: 12px;
}
</style> 