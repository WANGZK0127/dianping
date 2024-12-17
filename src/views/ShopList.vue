<template>
  <div class="shop-list">
    <div class="nav-bar">
      <div class="back" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
        返回
      </div>
      <div class="title">{{ currentType }}</div>
    </div>

    <div class="main-content">
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="6" v-for="shop in shops" :key="shop.id">
            <div class="shop-card" @click="goToShopDetail(shop.id)">
              <div class="shop-image">
                <el-image :src="shop.images[0]" fit="cover" />
              </div>
              <div class="shop-content">
                <h3>{{ shop.name }}</h3>
                <div class="shop-info">
                  <div class="score">
                    <el-rate
                      v-model="shop.score"
                      disabled
                      text-color="#ff9900"
                      :max="50"
                      :show-score="true"
                      :score-template="shop.score/10 + '分'"
                    />
                  </div>
                  <div class="price">人均 ¥{{ shop.avgPrice }}</div>
                  <div class="address">
                    <span class="area">{{ shop.area }}</span>
                    <span class="full-address">{{ shop.address }}</span>
                  </div>
                </div>
                <div class="shop-stats">
                  <span class="sold">已售{{ shop.sold }}单</span>
                  <span class="comments">{{ shop.comments }}条评价</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="pagination" v-if="total > 0">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="handlePageChange"
            layout="prev, pager, next"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { getShopsByType } from '../api/shop'
import { ElMessage } from 'element-plus'

export default {
  name: 'ShopList',
  components: {
    ArrowLeft
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const shops = ref([])
    const currentPage = ref(1)
    const pageSize = ref(12)
    const total = ref(0)
    const loading = ref(false)

    const currentType = computed(() => decodeURIComponent(route.params.type || ''))
    const typeId = computed(() => route.query.typeId)

    const loadShops = async () => {
      if (!typeId.value) return
      
      try {
        loading.value = true
        const data = await getShopsByType(typeId.value, currentPage.value)
        shops.value = data.map(shop => ({
          ...shop,
          images: shop.images ? shop.images.split(',').map(img => {
            if (img.startsWith('http')) {
              return img
            }
            return img.startsWith('/') ? img : `/${img}`
          }) : []
        }))
        total.value = shops.value.length * 2
      } catch (error) {
        console.error('获取商铺列表失败:', error)
        ElMessage.error('获取商铺列表失败')
      } finally {
        loading.value = false
      }
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      loadShops()
    }

    const goToShopDetail = (id) => {
      router.push(`/shop/${id}`)
    }

    watch(() => route.query.typeId, (newTypeId) => {
      if (newTypeId) {
        currentPage.value = 1
        loadShops()
      }
    }, { immediate: true })

    onMounted(() => {
      loadShops()
    })

    return {
      router,
      shops,
      currentPage,
      pageSize,
      total,
      loading,
      currentType,
      handlePageChange,
      goToShopDetail
    }
  }
}
</script>

<style scoped>
.shop-list {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back:hover {
  background-color: #f5f5f5;
}

.title {
  margin-left: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.main-content {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.shop-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.shop-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.shop-image {
  height: 160px;
  overflow: hidden;
}

.shop-image .el-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-content {
  padding: 16px;
}

.shop-content h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

.shop-info {
  margin-bottom: 12px;
}

.score {
  margin-bottom: 8px;
}

.price {
  color: #f60;
  font-size: 14px;
  margin-bottom: 8px;
}

.address {
  font-size: 12px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.area {
  color: #409EFF;
}

.shop-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style> 