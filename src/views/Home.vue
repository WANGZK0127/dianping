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
          <el-dropdown trigger="click">
            <span class="user-profile">
              <el-avatar :size="32" :src="userStore.userInfo.value.avatar" />
              <span class="username">{{ userStore.userInfo.value.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="custom-dropdown">
                <el-dropdown-item class="dropdown-item">
                  <el-icon><User /></el-icon>
                  <span @click="goToUserCenter">个人中心</span>
                </el-dropdown-item>
                <div class="dropdown-divider"></div>
                <el-dropdown-item class="dropdown-item">
                  <el-icon><SwitchButton /></el-icon>
                  <span @click="handleLogout">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <div class="auth-buttons">
            <router-link to="/login" class="login-btn">登录</router-link>
            <div class="divider"></div>
            <router-link to="/register" class="register-btn">注册</router-link>
          </div>
        </template>
      </div>
    </div>

    <div class="main-content">
      <div class="categories-section">
        <div class="container">
          <div class="shop-type-grid">
            <div v-for="category in categories" :key="category.name" 
                 class="category-item" 
                 @click="handleCategoryClick(category.name)">
              <img :src="category.icon" class="category-icon" alt="category.name" />
              <span>{{ category.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="posts-section">
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="6" v-for="post in posts" :key="post.id">
              <div class="post-card" @click="goToPostDetail(post.id)">
                <div class="post-image">
                  <el-image :src="post.images[0]" fit="cover" />
                </div>
                <div class="post-content">
                  <h3>{{ post.title }}</h3>
                  <p>{{ post.content }}</p>
                  <div class="post-footer">
                    <div class="author">
                      <el-avatar :size="24" :src="post.icon" />
                      <span>{{ post.name }}</span>
                    </div>
                    <div class="stats">
                      <span @click.stop="handleLike(post)">
                        <el-icon :class="{ 'liked': post.isLike }"><Pointer /></el-icon>
                        {{ post.liked }}
                      </span>
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
  Basketball, Plus, Top, Pointer,
  User, SwitchButton 
} from '@element-plus/icons-vue'
import { userStore } from '../store/user'
import { ElMessage } from 'element-plus'
import { getShopTypes } from '../api/shop'
import { getHotBlogs, likeBlog } from '../api/blog'

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
    Plus,
    Top,
    Pointer,
    User,
    SwitchButton
  },
  setup() {
    const router = useRouter()
    const searchText = ref('')
    const currentLocation = ref('北京')
    const locationDialogVisible = ref(false)
    const categories = ref([])
    const posts = ref([])
    const currentPage = ref(1)
    const loading = ref(false)

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

    // 获取博客列表数据
    const loadBlogPosts = async () => {
      try {
        loading.value = true
        const data = await getHotBlogs(currentPage.value)
        posts.value = data.map(post => ({
          id: post.id,
          title: post.title || '无标题',
          content: post.content || '暂无内容',
          images: post.images ? post.images.split(',').filter(img => img).map(img => {
            // 如果是完整的URL，直接使用
            if (img.startsWith('http')) {
              return img
            }
            // 否则拼接本地路径
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          icon: post.icon ? (post.icon.startsWith('http') ? post.icon : `/${post.icon}`) : '',
          name: post.name,
          isLike: post.isLike,
          liked: post.liked || 0,
          likes: post.liked || 0
        }))
      } catch (error) {
        console.error('获取博客列表失败:', error)
        ElMessage.error('获取博客列表失败')
      } finally {
        loading.value = false
      }
    }

    // 处理点赞
    const handleLike = async (post) => {
      // 点赞需要登录
      if (!userStore.isLoggedIn.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
        return
      }

      try {
        await likeBlog(post.id)
        post.isLike = !post.isLike
        if (post.isLike) {
          post.likes++
        } else {
          post.likes--
        }
        post.liked = post.likes
        ElMessage.success(post.isLike ? '点赞成功' : '取消点赞成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          ElMessage.warning('请先登录')
          router.push('/login')
        } else {
          console.error('点赞失败:', error)
          ElMessage.error('点赞失败')
        }
      }
    }

    // 初始化数据
    onMounted(() => {
      userStore.initUserState()
      loadShopTypes()
      loadBlogPosts()
    })

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
      scrollToTop,
      handleLike,
      loading
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

.auth-buttons {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 158, 255, 0.1);
}

.divider {
  width: 1px;
  height: 14px;
  background-color: #e0e0e0;
  margin: 0 12px;
}

.login-btn,
.register-btn {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.login-btn {
  color: #409EFF;
}

.register-btn {
  color: #67C23A;
}

.login-btn:hover,
.register-btn:hover {
  background-color: rgba(64, 158, 255, 0.1);
  transform: translateY(-1px);
}

.register-btn:hover {
  background-color: rgba(103, 194, 58, 0.1);
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
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.post-image .el-image {
  width: 100%;
  height: 100%;
}

.post-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-content h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  font-weight: 600;
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
  justify-content: flex-end;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
  padding: 4px 8px;
  border-radius: 15px;
  background-color: rgba(64, 158, 255, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.stats span:hover {
  background-color: rgba(64, 158, 255, 0.2);
  transform: scale(1.05);
}

.stats .el-icon {
  font-size: 16px;
  color: #409EFF;
}

.stats .el-icon.liked {
  color: #ff6b6b;
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

.custom-dropdown {
  padding: 8px;
  min-width: 150px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.dropdown-item:hover {
  background-color: rgba(64, 158, 255, 0.1);
  transform: translateX(4px);
}

.dropdown-item .el-icon {
  font-size: 18px;
  color: #409EFF;
}

.dropdown-item span {
  font-size: 14px;
  color: #333;
}

.dropdown-divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 8px 0;
}
</style> 