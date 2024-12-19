<template>
  <div class="user-center">
    <div class="container">
      <!-- 用户信息区域 -->
      <div class="user-info">
        <el-avatar :size="80" :src="userStore.userInfo.value.icon" />
        <div class="user-meta">
          <h2>{{ userStore.userInfo.value.nickName }}</h2>
        </div>
      </div>

      <!-- 导航标签页和内容区域 -->
      <div class="content-wrapper">
        <el-tabs v-model="activeTab" class="custom-tabs" @tab-click="handleTabChange">
          <el-tab-pane label="笔记" name="blogs">
            <div class="blog-list">
              <el-empty v-if="blogs.length === 0" description="暂无笔记" />
              <div v-else class="blog-grid">
                <div v-for="blog in blogs" :key="blog.id" class="blog-card" @click="goToBlogDetail(blog.id)">
                  <div class="blog-image" v-if="blog.images && blog.images.length">
                    <el-image :src="blog.images[0]" fit="cover" />
                  </div>
                  <div class="blog-content">
                    <h4>{{ blog.title }}</h4>
                    <p>{{ blog.content }}</p>
                    <div class="blog-footer">
                      <span class="time">{{ formatTime(blog.createTime) }}</span>
                      <div class="stats">
                        <span class="likes">
                          <el-icon :class="{ 'liked': blog.isLike }"><Pointer /></el-icon>
                          {{ blog.liked }}
                        </span>
                        <span class="comments">
                          <el-icon><ChatLineRound /></el-icon>
                          {{ blog.comments }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="关注" name="follows">
            <div class="follow-blogs">
              <el-empty v-if="followBlogs.length === 0" description="暂无关注的博客" />
              <div v-else class="blog-grid">
                <div v-for="blog in followBlogs" 
                     :key="blog.id" 
                     class="blog-card" 
                     @click="goToBlogDetail(blog.id)">
                  <div class="blog-image" v-if="blog.images && blog.images.length">
                    <el-image :src="blog.images[0]" fit="cover" />
                  </div>
                  <div class="blog-content">
                    <div class="blog-author">
                      <el-avatar :size="24" :src="blog.icon" />
                      <span>{{ blog.name }}</span>
                    </div>
                    <h4>{{ blog.title }}</h4>
                    <p>{{ blog.content }}</p>
                    <div class="blog-footer">
                      <span class="time">{{ formatTime(blog.createTime) }}</span>
                      <div class="stats">
                        <span class="likes">
                          <el-icon :class="{ 'liked': blog.isLike }"><Pointer /></el-icon>
                          {{ blog.liked }}
                        </span>
                        <span class="comments">
                          <el-icon><ChatLineRound /></el-icon>
                          {{ blog.comments }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 加载更多按钮 -->
              <div class="load-more" v-if="hasMore">
                <el-button :loading="loading" @click="loadMoreFollowBlogs">
                  加载更多
                </el-button>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="粉丝" name="fans">
            <div class="fans-list">
              <el-empty v-if="fans.length === 0" description="暂无粉丝" />
              <div v-else class="fans-grid">
                <div v-for="fan in fans" :key="fan.id" class="fan-card">
                  <div class="fan-info">
                    <el-avatar :size="50" :src="fan.icon || '/default-avatar.png'" />
                    <div class="fan-meta">
                      <h4>{{ fan.name }}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Pointer, ChatLineRound } from '@element-plus/icons-vue'
import { userStore } from '../store/user'
import { getBlogOfMe, getFollowBlogs } from '../api/blog'
import { getMyFans } from '../api/user'

export default {
  name: 'UserCenter',
  components: { Pointer, ChatLineRound },
  setup() {
    const router = useRouter()
    const blogs = ref([])
    const activeTab = ref('blogs')
    const followBlogs = ref([])
    const fans = ref([])
    const lastId = ref(Date.now())
    const loading = ref(false)
    const hasMore = ref(true)
    const currentPage = ref(1)

    // 格式化时间
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString()
    }

    // 获取个人博客列表
    const loadUserBlogs = async (isLoadMore = false) => {
      if (loading.value || (!isLoadMore && blogs.value.length > 0)) return
      
      try {
        loading.value = true
        const data = await getBlogOfMe(currentPage.value)
        
        if (!data || data.length === 0) {
          hasMore.value = false
          if (!isLoadMore) {
            blogs.value = []
          }
          return
        }

        const formattedBlogs = data.map(blog => ({
          id: blog.id,
          title: blog.title || '无标题',
          content: blog.content || '暂无内容',
          images: blog.images ? blog.images.split(',').filter(img => img).map(img => {
            if (img.startsWith('http')) return img
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          createTime: blog.createTime,
          isLike: blog.isLike,
          liked: blog.liked || 0,
          comments: blog.comments || 0
        }))

        if (isLoadMore) {
          blogs.value.push(...formattedBlogs)
        } else {
          blogs.value = formattedBlogs
        }

        // 如果返回的数据少于8条，说明没有更多数据了
        hasMore.value = data.length === 8
        if (hasMore.value) {
          currentPage.value++
        }
      } catch (error) {
        console.error('获取个人博客列表失败:', error)
        ElMessage.error('获取个人博客列表失败')
        if (!isLoadMore) {
          blogs.value = []
        }
      } finally {
        loading.value = false
      }
    }

    // 加载更多个人博客
    const loadMoreUserBlogs = () => {
      if (!hasMore.value || loading.value) return
      loadUserBlogs(true)
    }

    // 监听滚动事件
    const handleScroll = () => {
      if (activeTab.value !== 'blogs') return

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // 当滚动到距离底部100px时加载更多
      if (documentHeight - scrollTop - windowHeight < 100) {
        loadMoreUserBlogs()
      }
    }

    // 跳转到博客详情
    const goToBlogDetail = (blogId) => {
      router.push(`/post/${blogId}`)
    }

    // 获取关注列表博客
    const loadFollowBlogs = async () => {
      try {
        loading.value = true
        const data = await getFollowBlogs(Date.now())
        
        if (!data || !data.list || data.list.length === 0) {
          hasMore.value = false
          followBlogs.value = []
          return
        }

        followBlogs.value = data.list.map(blog => ({
          id: blog.id,
          title: blog.title || '无标题',
          content: blog.content || '暂无内容',
          images: blog.images ? blog.images.split(',').filter(img => img).map(img => {
            if (img.startsWith('http')) return img
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          icon: blog.icon || '/default-avatar.png',
          name: blog.name,
          isLike: blog.isLike,
          liked: blog.liked || 0,
          comments: blog.comments || 0,
          createTime: blog.createTime
        }))

        lastId.value = data.minTime
        hasMore.value = data.list.length > 0
      } catch (error) {
        console.error('获取关注博���列表失败:', error)
        ElMessage.error('获取关注博客列表失败')
        followBlogs.value = []
        hasMore.value = false
      } finally {
        loading.value = false
      }
    }

    // 加载更多关注博客
    const loadMoreFollowBlogs = async () => {
      if (loading.value || !hasMore.value) return
      
      try {
        loading.value = true
        const data = await getFollowBlogs(lastId.value)
        
        if (!data || !data.list || data.list.length === 0) {
          hasMore.value = false
          return
        }

        const newBlogs = data.list.map(blog => ({
          id: blog.id,
          title: blog.title || '无标题',
          content: blog.content || '暂无内容',
          images: blog.images ? blog.images.split(',').filter(img => img).map(img => {
            if (img.startsWith('http')) return img
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          icon: blog.icon || '/default-avatar.png',
          name: blog.name,
          isLike: blog.isLike,
          liked: blog.liked || 0,
          comments: blog.comments || 0,
          createTime: blog.createTime
        }))

        followBlogs.value.push(...newBlogs)
        lastId.value = data.minTime
        hasMore.value = data.list.length > 0
      } catch (error) {
        console.error('加载更多关注博客失败:', error)
        ElMessage.error('加载更多失败')
        hasMore.value = false
      } finally {
        loading.value = false
      }
    }

    // 获取粉丝列表
    const loadFans = async () => {
      try {
        const data = await getMyFans()
        console.log('粉丝数据:', data) // 添加日志查看数据结构
        fans.value = data || []
      } catch (error) {
        console.error('获取粉丝列表失败:', error)
        ElMessage.error('获取粉丝列表失败')
        fans.value = []
      }
    }

    // 监听标签页切换
    const handleTabChange = (tab) => {
      if (tab.props.name === 'fans') {
        loadFans()
      }
    }

    onMounted(() => {
      loadUserBlogs()
      loadFollowBlogs()
      // 添加滚动监听到window
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      // 移除window的滚动监听
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      userStore,
      blogs,
      activeTab,
      formatTime,
      goToBlogDetail,
      followBlogs,
      hasMore,
      loading,
      loadMoreUserBlogs,
      fans,
      handleTabChange
    }
  }
}
</script>

<style scoped>
.user-center {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-meta {
  margin-left: 20px;
}

.user-meta h2 {
  margin: 0;
  font-size: 24px;
}

.content-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.custom-tabs {
  padding: 20px;
}

.custom-tabs :deep(.el-tabs__header) {
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.custom-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.custom-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  padding: 0 24px 16px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.custom-tabs :deep(.el-tabs__item:hover) {
  color: var(--el-color-primary);
}

.custom-tabs :deep(.el-tabs__item.is-active) {
  font-weight: bold;
  color: var(--el-color-primary);
}

.custom-tabs :deep(.el-tabs__active-bar) {
  height: 2px;
  border-radius: 2px;
  background-color: var(--el-color-primary);
}

.blog-list, .user-list {
  min-height: 300px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.blog-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.blog-image {
  height: 200px;
  overflow: hidden;
}

.blog-image .el-image {
  width: 100%;
  height: 100%;
}

.blog-content {
  padding: 15px;
}

.blog-content h4 {
  margin: 0 0 10px 0;
}

.blog-content p {
  margin: 0;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.user-card .username {
  margin-left: 10px;
  font-size: 16px;
}

.follow-blogs {
  padding: 20px 0;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.blog-author span {
  font-size: 14px;
  color: #666;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.time {
  font-size: 12px;
  color: #999;
}

.stats {
  display: flex;
  gap: 12px;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.stats .el-icon {
  font-size: 16px;
  color: #409EFF;
}

.stats .el-icon.liked {
  color: #ff6b6b;
}

.comments .el-icon {
  color: #67C23A;
}

.load-more {
  text-align: center;
  margin-top: 20px;
}

.fans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.fan-card {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.fan-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.fan-meta {
  flex: 1;
}

.fan-meta h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.fan-meta p {
  margin: 5px 0 0;
  font-size: 12px;
  color: #999;
}

.blog-list {
  padding: 20px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}
</style> 