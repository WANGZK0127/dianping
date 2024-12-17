<template>
  <div class="post-detail">
    <div class="container">
      <!-- 博客内容区域 -->
      <div class="blog-content">
        <h1 class="title">{{ blog.title }}</h1>
        
        <div class="author-info">
          <el-avatar :size="40" :src="blog.icon" />
          <div class="author-meta">
            <div class="name">{{ blog.name }}</div>
            <div class="time">{{ formatTime(blog.createTime) }}</div>
          </div>
          <div class="actions">
            <span class="like-btn" @click="handleLike">
              <el-icon :class="{ 'liked': blog.isLike }"><Pointer /></el-icon>
              {{ blog.liked }}
            </span>
          </div>
        </div>

        <div class="content">{{ blog.content }}</div>

        <!-- 图片展示区 -->
        <div class="images" v-if="blog.images && blog.images.length">
          <el-image 
            v-for="(img, index) in blog.images" 
            :key="index"
            :src="img"
            :preview-src-list="blog.images"
            fit="cover"
          />
        </div>
      </div>

      <!-- 点赞用户列表 -->
      <div class="likes-section" v-if="likeUsers.length">
        <h3>点赞用户</h3>
        <div class="like-users">
          <div v-for="user in likeUsers" :key="user.id" class="like-user">
            <el-avatar :size="32" :src="user.icon" />
            <span>{{ user.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Pointer } from '@element-plus/icons-vue'
import { getBlogById, likeBlog, getBlogLikes } from '../api/blog'
import { userStore } from '../store/user'

export default {
  name: 'PostDetail',
  components: { Pointer },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const blog = ref({})
    const likeUsers = ref([])

    // 格式化时间
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString()
    }

    // 获取博客详情
    const loadBlogDetail = async () => {
      try {
        const data = await getBlogById(route.params.id)
        blog.value = {
          ...data,
          images: data.images ? data.images.split(',').filter(img => img).map(img => {
            if (img.startsWith('http')) return img
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          icon: data.icon ? (data.icon.startsWith('http') ? data.icon : `/${data.icon}`) : '',
          liked: data.liked || 0
        }
      } catch (error) {
        console.error('获取博客详情失败:', error)
        ElMessage.error('获取博客详情失败')
      }
    }

    // 获取点赞用户列表
    const loadLikeUsers = async () => {
      try {
        const data = await getBlogLikes(route.params.id)
        likeUsers.value = data.map(user => ({
          id: user.id,
          name: user.nickName,
          icon: user.icon ? (user.icon.startsWith('http') ? user.icon : `/${user.icon}`) : ''
        }))
      } catch (error) {
        console.error('获取点赞用户列表失败:', error)
      }
    }

    // 处理点赞
    const handleLike = async () => {
      if (!userStore.isLoggedIn.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
        return
      }

      try {
        await likeBlog(blog.value.id)
        blog.value.isLike = !blog.value.isLike
        if (blog.value.isLike) {
          blog.value.liked++
        } else {
          blog.value.liked--
        }
        // 重新加载点赞用户列表
        loadLikeUsers()
        ElMessage.success(blog.value.isLike ? '点赞成功' : '取消点赞成功')
      } catch (error) {
        if (error.response?.status === 401) {
          ElMessage.warning('请先登录')
          router.push('/login')
        } else {
          console.error('点赞失败:', error)
          ElMessage.error('点赞失败')
        }
      }
    }

    onMounted(() => {
      loadBlogDetail()
      loadLikeUsers()
    })

    return {
      blog,
      likeUsers,
      formatTime,
      handleLike
    }
  }
}
</script>

<style scoped>
.post-detail {
  padding: 20px 0;
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.blog-content {
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.author-meta {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.actions {
  display: flex;
  gap: 16px;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 15px;
  background-color: rgba(64, 158, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.like-btn:hover {
  background-color: rgba(64, 158, 255, 0.2);
  transform: scale(1.05);
}

.like-btn .el-icon {
  font-size: 16px;
  color: #409EFF;
}

.like-btn .el-icon.liked {
  color: #ff6b6b;
}

.content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.images .el-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  cursor: pointer;
}

.likes-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.likes-section h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
}

.like-users {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.like-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: 20px;
}

.like-user span {
  font-size: 14px;
  color: #666;
}
</style>