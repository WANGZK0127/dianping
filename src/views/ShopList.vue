<template>
  <div class="shop-list">
    <div class="nav-bar">
      <div class="back" @click="goHome">
        <el-icon><ArrowLeft /></el-icon>
        返回首页
      </div>
      <div class="title">
        <el-dropdown @command="handleTypeChange" trigger="click">
          <span class="type-selector">
            {{ currentType }}
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                v-for="type in shopTypes" 
                :key="type.id"
                :command="type"
              >
                {{ type.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="search-section">
      <div class="search-container">
        <el-input
          v-model="searchText"
          placeholder="搜索商家、商品"
          class="search-input"
          :prefix-icon="Search"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button type="primary" :icon="Search" @click="handleSearch">
              搜索
            </el-button>
          </template>
        </el-input>
        <div class="search-tags" v-if="hotSearches.length">
          <span class="tag-label">热门搜索：</span>
          <el-tag
            v-for="tag in hotSearches"
            :key="tag"
            class="search-tag"
            @click="searchText = tag"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
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
                      :max="5"
                      :show-score="true"
                      :score-template="(shop.score).toFixed(1) + '分'"
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
import { ArrowLeft, ArrowDown, Search } from '@element-plus/icons-vue'
import { getShopsByType, getShopTypes } from '../api/shop'
import { ElMessage } from 'element-plus'

export default {
  name: 'ShopList',
  components: {
    ArrowLeft,
    ArrowDown,
    Search
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const shops = ref([])
    const currentPage = ref(1)
    const pageSize = ref(12)
    const total = ref(0)
    const loading = ref(false)
    const shopTypes = ref([])

    const currentType = computed(() => decodeURIComponent(route.params.type || ''))
    const typeId = computed(() => route.query.typeId)

    const loadShops = async () => {
      if (!typeId.value) return
      
      try {
        loading.value = true
        const data = await getShopsByType(typeId.value, currentPage.value)
        shops.value = data.map(shop => {
          const normalizedScore = (shop.score / 10).toFixed(1)
          return {
            ...shop,
            images: shop.images ? shop.images.split(',').map(img => {
              if (img.startsWith('http')) {
                return img
              }
              return img.startsWith('/') ? img : `/${img}`
            }) : [],
            score: parseFloat(normalizedScore)
          }
        })
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

    const loadShopTypes = async () => {
      try {
        const data = await getShopTypes()
        shopTypes.value = data.sort((a, b) => a.sort - b.sort)
      } catch (error) {
        console.error('获取商铺类型失败:', error)
        ElMessage.error('获取商铺类型失败')
      }
    }

    const handleTypeChange = (type) => {
      router.push({
        name: 'ShopList',
        params: { type: type.name },
        query: { typeId: type.id }
      })
    }

    watch(() => route.query.typeId, (newTypeId) => {
      if (newTypeId) {
        currentPage.value = 1
        loadShops()
      }
    }, { immediate: true })

    onMounted(() => {
      loadShopTypes()
      loadShops()
    })

    // 返回首页
    const goHome = () => {
      router.push('/')
    }

    // 搜索相关
    const searchText = ref('')
    const hotSearches = ref(['火锅', '烤肉', '奶茶', '小吃', '川菜'])

    const handleSearch = () => {
      if (!searchText.value.trim()) {
        ElMessage.warning('请输入搜索内容')
        return
      }
      // TODO: 实现搜索功能
      console.log('搜索:', searchText.value)
    }

    return {
      router,
      shops,
      currentPage,
      pageSize,
      total,
      loading,
      currentType,
      handlePageChange,
      goToShopDetail,
      shopTypes,
      handleTypeChange,
      goHome,
      searchText,
      hotSearches,
      handleSearch
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
  display: flex;
  align-items: center;
}

.title .el-dropdown {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.main-content {
  padding-top: 20px;
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

.type-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.type-selector:hover {
  background-color: #f5f5f5;
}

.search-section {
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding: 20px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.search-input {
  width: 100%;
}

.search-input :deep(.el-input__wrapper) {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
}

.search-input :deep(.el-input__inner) {
  height: 40px;
  font-size: 16px;
}

.search-input :deep(.el-input-group__append) {
  background-color: #409EFF;
  border-color: #409EFF;
  color: white;
  padding: 0 20px;
  border-radius: 0 8px 8px 0;
}

.search-input :deep(.el-input-group__append:hover) {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.search-input :deep(.el-input-group__append .el-button) {
  color: white;
  border: none;
  margin: 0;
  padding: 0;
}

.search-tags {
  margin-top: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-label {
  color: #666;
  font-size: 14px;
}

.search-tag {
  cursor: pointer;
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e0e0e0;
}

.search-tag:hover {
  background-color: #409EFF;
  color: white;
  transform: translateY(-1px);
}
</style> 