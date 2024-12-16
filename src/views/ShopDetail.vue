<template>
  <div class="shop-detail">
    <div v-if="loading" class="loading-state">
      <el-skeleton style="width: 100%">
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 300px" />
          <div style="padding: 20px">
            <el-skeleton-item variant="h1" style="width: 50%" />
            <el-skeleton-item variant="text" style="width: 80%" />
            <el-skeleton-item variant="text" style="width: 60%" />
          </div>
        </template>
      </el-skeleton>
    </div>

    <template v-else>
      <div class="shop-header">
        <div class="header-content">
          <div class="shop-info">
            <h1>{{ shop.name }}</h1>
            <div class="rating-info">
              <el-rate v-model="shop.rating" disabled text-color="#ff9900" />
              <span class="rating-score">{{ shop.rating }}分</span>
              <span class="review-count">{{ shop.reviewCount }}条评价</span>
            </div>
            <div class="basic-info">
              <p><el-icon><Location /></el-icon> {{ shop.address }}</p>
              <p><el-icon><Phone /></el-icon> {{ shop.phone }}</p>
              <p><el-icon><Timer /></el-icon> {{ shop.businessHours }}</p>
            </div>
            <div class="tags">
              <el-tag v-for="tag in shop.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
            </div>
          </div>
          <div class="shop-image">
            <el-image :src="shop.image" fit="cover" />
          </div>
        </div>
      </div>

      <div class="main-content">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="菜品" name="menu">
            <div class="menu-list">
              <el-row :gutter="20">
                <el-col :span="6" v-for="dish in shop.menu" :key="dish.id">
                  <el-card class="dish-card">
                    <img :src="dish.image" class="dish-image">
                    <div class="dish-info">
                      <h3>{{ dish.name }}</h3>
                      <p class="dish-desc">{{ dish.description }}</p>
                      <div class="dish-price">
                        <span class="price">¥{{ dish.price }}</span>
                        <span class="monthly-sales">月售{{ dish.monthlySales }}份</span>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <el-tab-pane label="评价" name="reviews">
            <div class="reviews-list">
              <div v-for="review in shop.reviews" :key="review.id" class="review-item">
                <div class="review-header">
                  <el-avatar :src="review.userAvatar" />
                  <div class="review-user-info">
                    <span class="username">{{ review.username }}</span>
                    <div class="review-rating">
                      <el-rate v-model="review.rating" disabled size="small" />
                      <span class="review-date">{{ review.date }}</span>
                    </div>
                  </div>
                </div>
                <div class="review-content">
                  <p>{{ review.content }}</p>
                  <div class="review-images" v-if="review.images && review.images.length">
                    <el-image
                      v-for="image in review.images"
                      :key="image"
                      :src="image"
                      :preview-src-list="review.images"
                      fit="cover"
                      class="review-image"
                    />
                  </div>
                  <div class="review-dishes" v-if="review.dishes">
                    <span class="ordered-dishes">点菜：{{ review.dishes.join('、') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Location, Phone, Timer } from '@element-plus/icons-vue'

export default {
  name: 'ShopDetailPage',
  components: {
    Location,
    Phone,
    Timer
  },
  setup() {
    const route = useRoute()
    const activeTab = ref('menu')
    const shop = ref({})
    const loading = ref(true)

    onMounted(async () => {
      try {
        console.log('Shop ID:', route.params.id)
        // 模拟加载延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟从服务器获取商家数据
        shop.value = {
          id: route.params.id,
          name: '老王火锅',
          rating: 4.8,
          reviewCount: 2389,
          image: 'https://via.placeholder.com/800x400',
          address: '北京市朝阳区xxx街xxx号',
          phone: '010-12345678',
          businessHours: '周一至周日 10:00-22:00',
          tags: ['特色火锅', '川味', '地道'],
          menu: [
            {
              id: 1,
              name: '毛肚',
              description: '新鲜毛肚，口感脆嫩',
              price: 58,
              image: 'https://via.placeholder.com/300x200',
              monthlySales: 328
            },
            {
              id: 2,
              name: '虾滑',
              description: '手打虾滑，鲜美可口',
              price: 48,
              image: 'https://via.placeholder.com/300x200',
              monthlySales: 256
            },
            {
              id: 3,
              name: '牛肉',
              description: '精选牛肉，品质保证',
              price: 68,
              image: 'https://via.placeholder.com/300x200',
              monthlySales: 432
            },
            {
              id: 4,
              name: '青菜拼盘',
              description: '新鲜时蔬',
              price: 28,
              image: 'https://via.placeholder.com/300x200',
              monthlySales: 189
            }
          ],
          reviews: [
            {
              id: 1,
              username: '张三',
              userAvatar: 'https://via.placeholder.com/40',
              rating: 5,
              date: '2023-12-01',
              content: '火锅很好吃，服务态度也很好！锅底很正宗，配菜也很新鲜。',
              images: [
                'https://via.placeholder.com/200x200',
                'https://via.placeholder.com/200x200'
              ],
              dishes: ['毛肚', '虾滑', '牛肉']
            },
            {
              id: 2,
              username: '李四',
              userAvatar: 'https://via.placeholder.com/40',
              rating: 4,
              date: '2023-11-30',
              content: '环境不错，就是价格稍贵',
              images: [],
              dishes: ['青菜拼盘', '牛肉']
            }
          ]
        }
      } catch (error) {
        console.error('Error loading shop data:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      activeTab,
      shop,
      loading
    }
  }
}
</script>

<style scoped>
.shop-detail {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.shop-header {
  background-color: #fff;
  padding: 30px 0;
  margin-bottom: 20px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  padding: 0 20px;
}

.shop-info {
  flex: 1;
}

.shop-info h1 {
  margin: 0 0 15px 0;
  font-size: 28px;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.rating-score {
  font-size: 20px;
  color: #ff9900;
}

.review-count {
  color: #666;
}

.basic-info {
  color: #666;
  margin-bottom: 15px;
}

.basic-info p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.shop-image {
  width: 400px;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.dish-card {
  margin-bottom: 20px;
}

.dish-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.dish-info {
  padding: 15px;
}

.dish-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: bold;
}

.dish-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  height: 40px;
  overflow: hidden;
}

.dish-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #f60;
  font-size: 18px;
  font-weight: bold;
}

.monthly-sales {
  color: #999;
  font-size: 12px;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.review-user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.username {
  font-weight: bold;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.review-date {
  color: #999;
  font-size: 12px;
}

.review-content {
  color: #333;
  line-height: 1.6;
}

.review-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.review-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  cursor: pointer;
}

.review-dishes {
  margin-top: 10px;
  color: #666;
  font-size: 13px;
}

.ordered-dishes {
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.loading-state {
  padding: 20px;
  background: #fff;
}
</style> 