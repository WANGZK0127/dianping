<template>
  <div class="home">
    <div class="nav-bar">
      <div class="nav-left">
        <div class="location" @click="checkLogin(() => showLocationDialog())">
          <el-icon><Location /></el-icon>
          <span>{{ currentLocation }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
      </div>
      <div class="nav-center">
        <div class="search-box">
          <el-input
            v-model="searchText"
            placeholder="搜索商家、商品"
            :prefix-icon="Search"
            @keyup.enter="checkLogin(() => handleSearch())"
          />
        </div>
      </div>
      <div class="nav-right">
        <template v-if="userStore.isLoggedIn.value">
          <el-dropdown>
            <span class="user-profile">
              <el-avatar :size="32" :src="userStore.userInfo.value.avatar" />
              <span class="username">{{ userStore.userInfo.value.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToUserCenter">个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login" class="login-btn">登录</router-link>
          <router-link to="/register" class="register-btn">注册</router-link>
        </template>
      </div>
    </div>

    <div class="main-content">
      <div class="categories-section">
        <div class="container">
          <div class="shop-type-grid">
            <div v-for="category in categories" :key="category.name" 
                 class="category-item" 
                 @click="checkLogin(() => handleCategoryClick(category.name))">
              <img :src="category.icon" class="category-icon" alt="category.name" />
              <span>{{ category.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="posts-section">
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="4" v-for="post in posts" :key="post.id">
              <div class="post-card" @click="checkLogin(() => goToPostDetail(post.id))">
                <div class="post-image">
                  <el-image :src="post.images[0]" fit="cover" />
                </div>
                <div class="post-content">
                  <h3>{{ post.title }}</h3>
                  <p>{{ post.content }}</p>
                  <div class="post-footer">
                    <div class="author">
                      <el-avatar :size="24" :src="post.author.avatar" />
                      <span>{{ post.author.name }}</span>
                    </div>
                    <div class="stats">
                      <span><el-icon><ChatDotRound /></el-icon> {{ post.comments }}</span>
                      <span><el-icon><Star /></el-icon> {{ post.likes }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="floating-button create-post" @click="checkLogin(() => goToCreatePost())">
      <el-button type="primary" circle>
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>

    <div class="floating-button back-to-top" @click="scrollToTop" v-show="showBackToTop">
      <el-button type="info" circle>
        <el-icon><Top /></el-icon>
      </el-button>
    </div>

    <el-dialog
      v-model="locationDialogVisible"
      title="选择城市"
      width="30%"
      :before-close="handleLocationDialogClose"
    >
      <div class="location-dialog">
        <div class="current-city">
          <h3>当前定位城市</h3>
          <el-tag size="large">{{ currentLocation }}</el-tag>
        </div>
        <div class="hot-cities">
          <h3>热门城市</h3>
          <div class="city-grid">
            <el-tag
              v-for="city in hotCities"
              :key="city"
              size="large"
              class="city-tag"
              @click="selectLocation(city)"
            >
              {{ city }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, ArrowDown, Food, Headset, 
  ScaleToOriginal, Star, Location, House, 
  Present, GobletSquareFull, Film, 
  Basketball, ChatDotRound, Plus, Top 
} from '@element-plus/icons-vue'
import { userStore } from '../store/user'
import { ElMessage } from 'element-plus'
import { getShopTypes } from '../api/shop'

export default {
  name: 'HomePage',
  components: {
    Search,
    ArrowDown,
    Food,
    Headset,
    ScaleToOriginal,
    Star,
    Location,
    House,
    Present,
    GobletSquareFull,
    Film,
    Basketball,
    ChatDotRound,
    Plus,
    Top
  },
  setup() {
    const router = useRouter()
    const searchText = ref('')
    const currentLocation = ref('北京')
    const locationDialogVisible = ref(false)
    const categories = ref([])

    // 获取商店类型数据
    const loadShopTypes = async () => {
      try {
        const data = await getShopTypes()
        categories.value = data.map(item => {
          return {
            id: item.id,
            name: item.name,
            icon: item.icon,
            sort: item.sort
          }
        }).sort((a, b) => a.sort - b.sort)
      } catch (error) {
        console.error('获取商店类型失败:', error)
        ElMessage.error('获取商店类型失败')
      }
    }

    // 初始化数据
    onMounted(() => {
      userStore.initUserState()
      loadShopTypes()
    })

    const posts = ref([
      {
        id: 1,
        title: '这家火锅太好吃了',
        content: '今天和朋友一起去吃了这家火锅，味道真的很不错！服务态度也很好，环境很干净。',
        images: [
          'https://via.placeholder.com/300x200',
          'https://via.placeholder.com/300x200',
          'https://via.placeholder.com/300x200'
        ],
        author: {
          name: '美食达人',
          avatar: 'https://via.placeholder.com/40'
        },
        category: '美食',
        likes: 245,
        comments: 32,
        createTime: '2023-12-12'
      },
      // ... 其他帖子数据 ...
    ])

    const hotCities = [
      '北京', '上海', '广州', '深圳',
      '杭州', '南京', '武汉', '成都',
      '重庆', '西安', '苏州', '天津'
    ]

    // 登录检查函数
    const checkLogin = (callback) => {
      if (!userStore.isLoggedIn.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
        return
      }
      callback && callback()
    }

    // 处理搜索
    const handleSearch = () => {
      // TODO: 实现搜索功能
      console.log('搜索:', searchText.value)
    }

    // 处理分类点击
    const handleCategoryClick = (category) => {
      router.push(`/category/${encodeURIComponent(category)}`)
    }

    // 跳转到帖子详情
    const goToPostDetail = (postId) => {
      router.push(`/post/${postId}`)
    }

    // 跳转到发帖页面
    const goToCreatePost = () => {
      router.push('/create-post')
    }

    // 跳转到用户中心
    const goToUserCenter = () => {
      router.push('/user-center')
    }

    // 处理退出登录
    const handleLogout = () => {
      userStore.logout()
      ElMessage.success('已退出登录')
      router.push('/login')
    }

    // 位置相关方法
    const showLocationDialog = () => {
      locationDialogVisible.value = true
    }

    const handleLocationDialogClose = () => {
      locationDialogVisible.value = false
    }

    const selectLocation = (city) => {
      currentLocation.value = city
      locationDialogVisible.value = false
    }

    // 返回顶部功能
    const showBackToTop = ref(false)
    
    const handleScroll = () => {
      showBackToTop.value = window.pageYOffset > 300
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      userStore,
      searchText,
      currentLocation,
      locationDialogVisible,
      categories,
      posts,
      hotCities,
      checkLogin,
      handleSearch,
      handleCategoryClick,
      goToPostDetail,
      goToCreatePost,
      goToUserCenter,
      handleLogout,
      showLocationDialog,
      handleLocationDialogClose,
      selectLocation,
      showBackToTop,
      scrollToTop
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-left {
  display: flex;
  align-items: center;
}

.location {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.location:hover {
  background-color: #f5f5f5;
}

.location .el-icon {
  font-size: 16px;
  color: #409EFF;
}

.location span {
  font-size: 14px;
  color: #333;
}

.nav-center {
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
}

.nav-right {
  display: flex;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-profile:hover {
  background-color: #f5f5f5;
}

.username {
  font-size: 14px;
  color: #333;
}

.login-btn,
.register-btn {
  text-decoration: none;
  margin-left: 16px;
  font-size: 14px;
}

.login-btn {
  color: #409EFF;
}

.register-btn {
  color: #67C23A;
}

.main-content {
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
  padding: 10px 0 40px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 300px;
}

/* 添加响应式布局，在小屏幕上减小边距 */
@media screen and (max-width: 1920px) {
  .container {
    padding: 0 250px;
  }
}

@media screen and (max-width: 1600px) {
  .container {
    padding: 0 150px;
  }
}

@media screen and (max-width: 1200px) {
  .container {
    padding: 0 100px;
  }
}

.categories-section {
  margin-bottom: 20px;
}

.shop-type-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px 0;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
}

.category-item .el-icon {
  font-size: 24px;
  color: #409EFF;
}

.category-item span {
  font-size: 14px;
  color: #333;
}

.posts-section {
  margin-top: 20px;
}

.post-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
}

.post-image {
  height: 160px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-content h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.post-content p {
  margin: 0;
  font-size: 12px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.post-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.author span {
  font-size: 12px;
  color: #666;
}

.stats {
  display: flex;
  justify-content: space-between;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.floating-button {
  position: fixed;
  z-index: 1000;
}

.create-post {
  right: 30px;
  bottom: 100px;
}

.back-to-top {
  right: 30px;
  bottom: 30px;
}

.floating-button .el-button {
  width: 50px;
  height: 50px;
  font-size: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.back-to-top .el-button {
  background-color: rgba(255, 255, 255, 0.9);
}

.back-to-top .el-button:hover {
  background-color: #f2f6fc;
}

.location-dialog {
  padding: 20px;
}

.current-city {
  margin-bottom: 24px;
}

.current-city h3,
.hot-cities h3 {
  margin-bottom: 16px;
  color: #333;
  font-size: 16px;
}

.city-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.city-tag {
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.city-tag:hover {
  background-color: #409EFF;
  color: white;
}

.category-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style> 