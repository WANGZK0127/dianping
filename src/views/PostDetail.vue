<template>
  <div class="post-detail">
    <div class="container">
      <!-- 博客内容区域 -->
      <div class="blog-content">
        <h1 class="title">{{ blog.title }}</h1>
        
        <div class="blog-header">
          <div class="author-info">
            <el-avatar :size="40" :src="blog.icon" />
            <div class="author-meta">
              <div class="name">{{ blog.name }}</div>
              <div class="time">{{ formatTime(blog.createTime) }}</div>
            </div>
          </div>
          <div class="actions">
            <el-button 
              type="primary" 
              :class="{ 'is-following': blog.isFollow }"
              @click="handleFollow"
              size="small"
            >
              {{ blog.isFollow ? '已关注' : '关注' }}
            </el-button>
            <div v-if="shopInfo" class="shop-info-mini" @click="router.push(`/shop/${shopInfo.id}`)">
              <el-image class="shop-image-mini" :src="shopInfo.images[0]" fit="cover" />
              <div class="shop-meta">
                <div class="shop-name">
                  <el-icon><Location /></el-icon>
                  {{ shopInfo.name }}
                </div>
                <div class="shop-rating-mini">
                  <el-rate
                    v-model="shopInfo.score"
                    disabled
                    :max="5"
                  />
                  <span class="score">{{ shopInfo.score }}分</span>
                </div>
              </div>
            </div>
            <span class="divider"></span>
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

      <!-- 评论区域 -->
      <div class="comments-section">
        <h3>评论区</h3>
        
        <!-- 评论输入框 -->
        <div class="comment-input">
          <el-input
            v-model="commentContent"
            type="textarea"
            :rows="3"
            placeholder="写下你的评论..."
          />
          <el-button 
            type="primary" 
            :loading="commenting"
            @click="submitComment"
          >
            发表评论
          </el-button>
        </div>

        <!-- 评论列表 -->
        <div class="comment-list">
          <el-empty v-if="comments.length === 0" description="暂无评论" />
          <div v-else class="comment-items">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="comment-user">
                <el-avatar :size="32" :src="comment.avatar" />
                <div class="comment-info">
                  <span class="username">
                    {{ comment.userName }}
                    <el-tag v-if="comment.isAuthor" size="small" type="success">作者</el-tag>
                  </span>
                  <span class="time">{{ formatTime(comment.createdTime) }}</span>
                </div>
              </div>
              <div class="comment-content">
                {{ comment.content }}
              </div>
              <!-- 评论操作区 -->
              <div class="comment-actions">
                <el-button 
                  link
                  size="small"
                  @click="handleReplyClick(comment)"
                >
                  <el-icon><ChatLineRound /></el-icon>
                  回复
                </el-button>
              </div>
              <!-- 回复输入框 -->
              <div v-if="activeReplyId === comment.id" class="reply-input">
                <el-input
                  v-model="replyContent"
                  type="textarea"
                  :rows="2"
                  placeholder="写下你的回复..."
                />
                <div class="reply-actions">
                  <el-button 
                    size="small"
                    @click="cancelReply"
                  >
                    取消
                  </el-button>
                  <el-button 
                    type="primary" 
                    size="small"
                    :loading="replying"
                    @click="submitReply(comment)"
                  >
                    发表回复
                  </el-button>
                </div>
              </div>
              <!-- 子评论列表 -->
              <div v-if="comment.children && comment.children.length" class="reply-list">
                <div v-for="reply in comment.children" :key="reply.id" class="reply-item">
                  <div class="comment-user">
                    <el-avatar :size="24" :src="reply.avatar" />
                    <div class="comment-info">
                      <span class="username">
                        {{ reply.userName }}
                        <el-tag v-if="reply.isAuthor" size="small" type="success">作者</el-tag>
                      </span>
                      <span class="time">{{ formatTime(reply.createdTime) }}</span>
                    </div>
                  </div>
                  <div class="reply-content">
                    <template v-if="reply.toUserName">
                      <span class="reply-to">回复 <span class="username">@{{ reply.toUserName }}</span>：</span>
                    </template>
                    {{ reply.content }}
                  </div>
                  <!-- 回复的操作区 -->
                  <div class="comment-actions">
                    <el-button 
                      link
                      size="small"
                      @click="handleReplyClick(reply, comment)"
                    >
                      <el-icon><ChatLineRound /></el-icon>
                      回复
                    </el-button>
                  </div>
                  <!-- 回复的回复输入框 -->
                  <div v-if="activeReplyId === reply.id" class="reply-input nested">
                    <el-input
                      v-model="replyContent"
                      type="textarea"
                      :rows="2"
                      :placeholder="`回复 ${reply.userName}...`"
                    />
                    <div class="reply-actions">
                      <el-button 
                        size="small"
                        @click="cancelReply"
                      >
                        取消
                      </el-button>
                      <el-button 
                        type="primary" 
                        size="small"
                        :loading="replying"
                        @click="submitReply(reply, comment)"
                      >
                        发表回复
                      </el-button>
                    </div>
                  </div>
                </div>
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
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Pointer, Location, ArrowRight, ChatLineRound } from '@element-plus/icons-vue'
import { getBlogById, likeBlog, getBlogLikes, getBlogComments, addComment } from '../api/blog'
import { getBlogShopInfo } from '../api/blog'
import { userStore } from '../store/user'
import { followUser, isFollow } from '../api/user'

export default {
  name: 'PostDetail',
  components: { 
    Pointer, 
    Location,
    ArrowRight,
    ChatLineRound
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const blog = ref({})
    const likeUsers = ref([])
    const shopInfo = ref(null)
    const comments = ref([])
    const commentContent = ref('')
    const commenting = ref(false)
    const activeReplyId = ref(null) // 当前正在回复的评论ID
    const replyContent = ref('') // 回复内容
    const replying = ref(false) // 回复提交状态

    // 格式化时间
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString()
    }

    // 取博客详情
    const loadBlogDetail = async () => {
      try {
        const data = await getBlogById(route.params.id)
        if (!data || typeof data !== 'object') {
          ElMessage.error('获取博客详情失败')
          return
        }
        blog.value = {
          id: data.id || route.params.id,
          shopId: data.shopId || null,
          userId: data.userId || null,
          icon: data.icon || '',
          name: data.name || '未知用户',
          isLike: data.isLike || false,
          title: data.title || '',
          content: data.content || '',
          images: data.images ? data.images.split(',').filter(img => img).map(img => {
            if (img.startsWith('http')) return img
            return img.startsWith('/') ? img : `/${img}`
          }) : [],
          liked: data.liked || 0,
          comments: data.comments || 0,
          createTime: data.createTime || '',
          updateTime: data.updateTime || '',
          isFollow: data.isFollow || false
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
        likeUsers.value = Array.isArray(data) ? data.map(user => ({
          id: user.id || 0,
          name: user.name || '未知用户',
          icon: user.icon ? (user.icon.startsWith('http') ? user.icon : `/${user.icon}`) : ''
        })) : []
      } catch (error) {
        console.error('获取点赞用户列表失败:', error)
        likeUsers.value = []
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

    // 获取博客关联的商铺信息
    const loadShopInfo = async () => {
      try {
        const data = await getBlogShopInfo(route.params.id)
        if (data) {
          shopInfo.value = {
            ...data,
            images: data.images ? data.images.split(',').map(img => {
              if (img.startsWith('http')) return img
              return img.startsWith('/') ? img : `/${img}`
            }) : [],
            score: Number((data.score / 10).toFixed(1))
          }
        }
      } catch (error) {
        console.error('获取商铺信息失败:', error)
      }
    }

    // 获取评论列表
    const loadComments = async () => {
      try {
        const response = await getBlogComments(route.params.id)
        console.log('评论数据:', response)
        
        // 检查响应是否为数组
        if (!Array.isArray(response)) {
          console.log('评论数据格式不正确')
          comments.value = []
          return
        }
        
        // 处理评论数据
        comments.value = response.map(comment => {
          console.log('处理评论:', comment)
          return {
            id: comment.nodeId,
            content: comment.content,
            createdTime: comment.createdTime,
            userName: comment.userName,
            avatar: comment.avatar,
            isAuthor: comment.isAuthor,
            children: comment.children ? comment.children.map(child => ({
              id: child.nodeId,
              content: child.content,
              createdTime: child.createdTime,
              userName: child.userName,
              avatar: child.avatar,
              isAuthor: child.isAuthor,
              toUserName: child.toId ? comment.userName : null // 如果有toId，说明是回复父评论的用户
            })) : []
          }
        })
        
        console.log('处理后的评论数据:', comments.value)
      } catch (error) {
        console.error('获取评论列表失败:', error)
        comments.value = []
      }
    }

    // 提交评论
    const submitComment = async () => {
      if (!userStore.isLoggedIn.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
        return
      }

      if (!commentContent.value.trim()) {
        ElMessage.warning('评论内容不能为空')
        return
      }

      try {
        commenting.value = true
        const response = await addComment(blog.value.id, commentContent.value.trim(), {
          replyType: 1, // 1表示评论
          targetId: blog.value.id  // 评论时targetId设置为博客ID
        })
        
        console.log('评论响应:', response)
        
        if (response === true) {
          ElMessage.success('评论成功')
          commentContent.value = ''
          await loadComments() // 重新加载评论列表
        } else {
          ElMessage.error('评论失败')
        }
      } catch (error) {
        console.error('发表评论失败:', error)
        ElMessage.error('发表评论失败')
      } finally {
        commenting.value = false
      }
    }

    // 点击回复按钮
    const handleReplyClick = (comment, parentComment = null) => {
      if (!userStore.isLoggedIn.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
        return
      }
      activeReplyId.value = comment.id
      replyContent.value = ''
    }

    // 取消回复
    const cancelReply = () => {
      activeReplyId.value = null
      replyContent.value = ''
    }

    // 提交回复
    const submitReply = async (comment, parentComment = null) => {
      if (!replyContent.value.trim()) {
        ElMessage.warning('回复内容不能为空')
        return
      }

      try {
        replying.value = true
        // 如果有父评论，使用父评论的ID，否则使用当前评论的ID
        const targetId = parentComment ? parentComment.id : comment.id
        const response = await addComment(blog.value.id, replyContent.value.trim(), {
          replyType: 2, // 2表示回复
          targetId     // 回复时设置为父评论的ID
        })
        
        console.log('回复响应:', response)
        
        if (response === true) {
          ElMessage.success('回复成功')
          replyContent.value = ''
          activeReplyId.value = null
          await loadComments() // 重新加载评���列表
        } else {
          ElMessage.error('回复失败')
        }
      } catch (error) {
        console.error('发表回复失败:', error)
        ElMessage.error('发表回复失败')
      } finally {
        replying.value = false
      }
    }

    // 处理关注/取消关注
    const handleFollow = async () => {
      if (!userStore.isLoggedIn.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
        return
      }

      try {
        const response = await followUser(blog.value.userId, !blog.value.isFollow)
        // 检查返回的数据是否为"不能关注自己"
        if (response === '不能关注自己') {
          ElMessage.warning('不能关注自己')
          return
        }
        
        blog.value.isFollow = !blog.value.isFollow
        ElMessage.success(blog.value.isFollow ? '关注成功' : '已取消关注')
      } catch (error) {
        console.error('关注操作失败:', error)
        ElMessage.error('操作失败，请重试')
      }
    }

    // 检查是否关注
    const checkIsFollow = async () => {
      if (!userStore.isLoggedIn.value || !blog.value.userId) return
      
      try {
        const isFollowed = await isFollow(blog.value.userId)
        blog.value.isFollow = isFollowed
      } catch (error) {
        console.error('检查关注状态失败:', error)
      }
    }

    onMounted(() => {
      loadBlogDetail()
      loadLikeUsers()
      loadShopInfo()
      loadComments()
      checkIsFollow() // 添加检查关注状态
    })

    return {
      blog,
      likeUsers,
      shopInfo,
      formatTime,
      handleLike,
      comments,
      commentContent,
      commenting,
      submitComment,
      activeReplyId,
      replyContent,
      replying,
      handleReplyClick,
      cancelReply,
      submitReply,
      handleFollow
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

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-meta h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
}

.is-following {
  background-color: #f5f7fa;
  color: #909399;
  border-color: #d3d4d6;
}

.is-following:hover {
  background-color: #f56c6c;
  color: #fff;
  border-color: #f56c6c;
}

.is-following:hover:before {
  content: '取消关注';
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #eee;
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

.shop-info-mini {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.shop-info-mini:hover {
  opacity: 0.8;
}

.shop-image-mini {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.shop-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.shop-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.shop-name .el-icon {
  font-size: 14px;
  color: #666;
}

.shop-rating-mini {
  display: flex;
  align-items: center;
  gap: 8px;
}

.shop-rating-mini :deep(.el-rate) {
  height: 20px;
  line-height: 20px;
}

.shop-rating-mini :deep(.el-rate__icon) {
  font-size: 14px;
  margin-right: 4px;
}

.shop-rating-mini .score {
  font-size: 14px;
  color: #ff9900;
  font-weight: 500;
}

.comments-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.comments-section h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.comment-input {
  margin-bottom: 30px;
}

.comment-input .el-button {
  margin-top: 16px;
  float: right;
}

.comment-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.comment-info .username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.comment-info .time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-left: 44px;
}

.reply-list {
  margin-left: 44px;
  margin-top: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
}

.reply-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.reply-item:last-child {
  border-bottom: none;
}

.reply-item .comment-user {
  margin-bottom: 4px;
}

.reply-content {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-left: 32px;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 15px;
  background-color: rgba(64, 158, 255, 0.1);
  transition: all 0.3s;
  cursor: pointer;
  margin-left: 8px;
}

.stats span:hover {
  background-color: rgba(64, 158, 255, 0.2);
  transform: scale(1.05);
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  margin-right: 16px;
}

.comment-actions .el-button {
  color: #909399;
}

.comment-actions .el-button:hover {
  color: #409EFF;
}

.reply-input {
  margin: 12px 44px 0;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 8px;
}

.reply-input.nested {
  margin: 12px 32px 0;
  background: #f9f9f9;
}

.reply-item .comment-actions {
  margin-right: 0;
  margin-left: 32px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.username .el-tag {
  margin-left: 4px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
}

.reply-to {
  color: #909399;
  margin-right: 4px;
}

.reply-to .username {
  display: inline;
  color: #409EFF;
  font-weight: 500;
}
</style>