<template>
  <div class="post-detail">
    <div class="post-container">
      <div class="post-header">
        <div class="author-info">
          <el-avatar :src="post.author?.avatar" :size="50" />
          <div class="author-meta">
            <h3 class="author-name">{{ post.author?.name }}</h3>
            <span class="post-time">{{ post.createTime }}</span>
          </div>
        </div>
        <el-tag size="large" effect="plain">{{ post.category }}</el-tag>
      </div>

      <div class="post-content">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="content-text">{{ post.content }}</p>

        <div class="post-images" v-if="post.images?.length">
          <el-image v-for="(image, index) in post.images" :key="index" :src="image" :preview-src-list="post.images"
            fit="cover" class="detail-image" />
        </div>
      </div>

      <div class="post-stats">
        <div class="stat-item">
          <el-icon>
            <Star />
          </el-icon>
          <span>{{ post.likes }} 赞</span>
        </div>
        <div class="stat-item">
          <el-icon>
            <ChatDotRound />
          </el-icon>
          <span>{{ post.comments }} 评论</span>
        </div>
      </div>

      <div class="comments-section">
        <h2>评论区</h2>
        <div class="comment-input">
          <el-input v-model="commentText" type="textarea" :rows="2" placeholder="写下你的评论..." />
          <el-button type="primary" @click="submitComment" :disabled="!commentText.trim()">
            发表评论
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Star, ChatDotRound } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'PostDetailPage',
  components: {
    Star,
    ChatDotRound
  },
  setup() {
    const route = useRoute()
    const post = ref({})
    const commentText = ref('')

    onMounted(() => {
      // 模拟从服务器获取帖子数据
      const mockPosts = {
        1: {
          id: 1,
          title: '这家火锅太赞了！',
          content: '和朋友一起去的，锅底特别正宗，服务态度很好，价格也实惠。强烈推荐大家去尝试！',
          images: [
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600'
          ],
          author: {
            name: '美食达人',
            avatar: 'https://via.placeholder.com/100'
          },
          category: '美食',
          likes: 328,
          comments: 45,
          createTime: '2023-12-12'
        },
        2: {
          id: 2,
          title: '周末欢乐游',
          content: '带着孩子们去了欢乐谷，玩了很多项目，孩子们都很开心。园区很干净，工作人员也很热情。',
          images: [
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600'
          ],
          author: {
            name: '快乐旅行家',
            avatar: 'https://via.placeholder.com/100'
          },
          category: '旅游',
          likes: 256,
          comments: 32,
          createTime: '2023-12-11'
        },
        3: {
          id: 3,
          title: '五星级酒店体验',
          content: '入住体验非常好，房间宽敞明亮，服务周到，早餐种类丰富。位置也很便利，周边设施齐全。',
          images: [
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600'
          ],
          author: {
            name: '生活品鉴师',
            avatar: 'https://via.placeholder.com/100'
          },
          category: '酒店',
          likes: 198,
          comments: 28,
          createTime: '2023-12-10'
        }
      }
      // 根据路由参数获取对应的帖子数据
      const postId = parseInt(route.params.id)
      post.value = mockPosts[postId] || {}
    })

    const submitComment = () => {
      if (!commentText.value.trim()) return
      ElMessage.success('评论发表成功')
      commentText.value = ''
    }

    return {
      post,
      commentText,
      submitComment
    }
  }
}
</script>

<style scoped>
.post-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.post-time {
  color: #999;
  font-size: 14px;
}

.post-content {
  margin-bottom: 24px;
}

.post-title {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.content-text {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.detail-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  cursor: pointer;
}

.post-stats {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 16px;
}

.comments-section {
  margin-top: 24px;
}

.comments-section h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.comment-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-input .el-button {
  align-self: flex-end;
}
</style>