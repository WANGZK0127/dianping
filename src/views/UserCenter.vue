<template>
  <div class="user-center">
    <div class="container">
      <!-- 用户信息区域 -->
      <div class="user-info">
        <el-avatar :size="80" :src="userStore.userInfo.value.icon" />
        <div class="user-meta">
          <h2>{{ userStore.userInfo.value.nickName }}</h2>
          <div class="user-stats">
            <div class="stat-item">
              <span class="count">{{ blogs.length }}</span>
              <span class="label">博客</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 博客列表 -->
      <div class="blog-list">
        <h3>我的博客</h3>
        <el-empty v-if="blogs.length === 0" description="暂无博客" />
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
                <span class="likes">
                  <el-icon :class="{ 'liked': blog.isLike }"><Pointer /></el-icon>
                  {{ blog.liked }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Pointer } from '@element-plus/icons-vue'
import { userStore } from '../store/user'
import { getBlogOfMe } from '../api/blog'

export default {
  name: 'UserCenter',
  components: { Pointer },
  setup() {
    const router = useRouter()
    const blogs = ref([])

    // 格式化时间
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString()
    }

    // 获取个人博客列表
    const loadUserBlogs = async () => {
      try {
        const data = await getBlogOfMe()
        blogs.value = data.map(blog => ({
          id: blog.id,
          title: blog.title || '无标题',
          content: blog.content || '暂无内容',
          images: blog.images ? blog.images.split(',').filter(img => img).map(img => {
            if (img.startsWith('http')) return img
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          createTime: blog.createTime,
          isLike: blog.isLike,
          liked: blog.liked || 0
        }))
      } catch (error) {
        console.error('获取个人博客列表失败:', error)
        ElMessage.error('获取个人博客列表失败')
      }
    }

    // 跳转到博客详情
    const goToBlogDetail = (blogId) => {
      router.push(`/post/${blogId}`)
    }

    onMounted(() => {
      loadUserBlogs()
    })

    return {
      userStore,
      blogs,
      formatTime,
      goToBlogDetail
    }
  }
}
</script>

<style scoped>
.user-center {
  padding: 20px 0;
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.user-info {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.user-meta {
  flex: 1;
}

.user-meta h2 {
  margin: 0 0 16px 0;
  font-size: 24px;
  color: #333;
}

.user-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-item .count {
  font-size: 20px;
  font-weight: 600;
  color: #409EFF;
}

.stat-item .label {
  font-size: 14px;
  color: #666;
}

.blog-list {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.blog-list h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #333;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.blog-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #eee;
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  padding: 16px;
}

.blog-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

.blog-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 12px;
  color: #999;
}

.likes {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.likes .el-icon {
  font-size: 16px;
  color: #409EFF;
}

.likes .el-icon.liked {
  color: #ff6b6b;
}
</style> 