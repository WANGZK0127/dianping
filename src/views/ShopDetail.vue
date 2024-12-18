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
              <el-rate v-model="shop.rating" disabled show-score text-color="#ff9900" />
              <span class="review-count">{{ shop.reviewCount }}条评价</span>
            </div>
            <div class="basic-info">
              <p><el-icon><Location /></el-icon> {{ shop.address }}</p>
              <p><el-icon><Timer /></el-icon> {{ shop.businessHours }}</p>
            </div>
            <div class="shop-stats">
              <div class="stat-item">
                <span class="label">人均消费</span>
                <span class="value">¥{{ shop.avgPrice }}</span>
              </div>
              <div class="stat-item">
                <span class="label">销量</span>
                <span class="value">{{ shop.sold }}+</span>
              </div>
            </div>
          </div>
          <div class="shop-image" v-if="shop.image">
            <el-image :src="shop.image" fit="cover" />
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="shop-description">
          <h3>商铺信息</h3>
          <p>类型：{{ shop.typeId }}</p>
          <p>区域：{{ shop.area }}</p>
          <p>地址：{{ shop.address }}</p>
          <p>营业时间：{{ shop.businessHours }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Location, Phone, Timer } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

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

    // 获取商铺详情
    const fetchShopDetail = async (id) => {
      try {
        const response = await axios.get(`/api/shop/detail`, {
          params: { id }
        })
        const result = response.data
        if (result.success) {
          shop.value = result.data
          // 处理评分，将score转换为5分制
          shop.value.rating = (shop.value.score / 10).toFixed(1)
          shop.value.reviewCount = shop.value.comments
          shop.value.businessHours = shop.value.openHours
          shop.value.image = shop.value.images?.split(',')[0]
        } else {
          ElMessage.error('获取商铺信息失败')
        }
      } catch (error) {
        console.error('Error loading shop data:', error)
        ElMessage.error('获取商铺信息失败')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (route.params.id) {
        fetchShopDetail(route.params.id)
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
  padding-bottom: 20px;
}

.shop-header {
  background-color: #fff;
  padding: 30px 0;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  color: #333;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.review-count {
  color: #666;
  font-size: 14px;
}

.basic-info {
  margin: 20px 0;
}

.basic-info p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
  color: #666;
}

.shop-stats {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-item .label {
  color: #666;
  font-size: 14px;
}

.stat-item .value {
  color: #ff9900;
  font-size: 20px;
  font-weight: bold;
}

.shop-image {
  width: 400px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

.shop-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.shop-description {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.shop-description h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.shop-description p {
  margin: 10px 0;
  color: #666;
  line-height: 1.6;
}

.loading-state {
  padding: 20px;
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 