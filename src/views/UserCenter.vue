<template>
  <div class="user-center" v-if="userStore.userInfo.value">
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-info">
        <div class="avatar-container">
          <el-avatar :size="100" :src="userStore.userInfo.value.avatar" />
          <el-button class="edit-avatar" circle size="small">
            <el-icon><Camera /></el-icon>
          </el-button>
        </div>
        <div class="user-info">
          <h2>{{ userStore.userInfo.value.username }}</h2>
          <p class="bio">{{ userInfo.bio || '这个人很懒，还没有写简介' }}</p>
          <div class="stats">
            <div class="stat-item">
              <span class="number">{{ userInfo.posts }}</span>
              <span class="label">发布</span>
            </div>
            <div class="stat-item">
              <span class="number">{{ userInfo.comments }}</span>
              <span class="label">评论</span>
            </div>
            <div class="stat-item">
              <span class="number">{{ userInfo.likes }}</span>
              <span class="label">获赞</span>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <el-button type="primary" @click="showEditProfile">
            <el-icon><Edit /></el-icon>编辑资料
          </el-button>
          <el-button type="danger" @click="confirmLogout">
            <el-icon><SwitchButton /></el-icon>退出登录
          </el-button>
        </div>
      </div>
    </div>

    <div class="content-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="发布的帖子" name="posts">
          <div class="posts-grid" v-if="userPosts.length">
            <div v-for="post in userPosts" :key="post.id" class="post-card" @click="goToPostDetail(post.id)">
              <div class="post-image">
                <el-image :src="post.images[0]" fit="cover" />
              </div>
              <div class="post-info">
                <h3>{{ post.title }}</h3>
                <p>{{ post.content }}</p>
                <div class="post-meta">
                  <span><el-icon><Timer /></el-icon>{{ post.createTime }}</span>
                  <div class="post-stats">
                    <span><el-icon><ChatDotRound /></el-icon>{{ post.comments }}</span>
                    <span><el-icon><Star /></el-icon>{{ post.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-empty v-else description="还没有发布过帖子" />
        </el-tab-pane>

        <el-tab-pane label="评论" name="comments">
          <div class="comments-list" v-if="userComments.length">
            <div v-for="comment in userComments" :key="comment.id" class="comment-card">
              <p class="comment-content">{{ comment.content }}</p>
              <div class="comment-meta">
                <span class="post-title" @click="goToPostDetail(comment.postId)">评论于：{{ comment.postTitle }}</span>
                <span class="comment-time"><el-icon><Timer /></el-icon>{{ comment.createTime }}</span>
              </div>
            </div>
          </div>
          <el-empty v-else description="还没有评论" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 编辑个人资料对话框 -->
    <el-dialog
      v-model="editProfileVisible"
      title="编辑个人资料"
      width="500px"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            v-model="editForm.bio"
            type="textarea"
            :rows="4"
            placeholder="写点什么来介绍自己吧"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editProfileVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProfile">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '../store/user'
import { Edit, Camera, Timer, Star, ChatDotRound, SwitchButton } from '@element-plus/icons-vue'

export default {
  name: 'UserCenter',
  components: {
    Edit,
    Camera,
    Timer,
    Star,
    ChatDotRound,
    SwitchButton
  },
  setup() {
    const router = useRouter()
    const activeTab = ref('posts')
    const editProfileVisible = ref(false)

    // 用户信息
    const userInfo = reactive({
      bio: '热爱美食和旅行的探索者',
      posts: 8,
      comments: 23,
      likes: 156
    })

    // 编辑表单
    const editForm = reactive({
      username: userStore.userInfo.value?.username || '',
      bio: userInfo.bio
    })

    // 用户帖子
    const userPosts = ref([
      {
        id: 1,
        title: '这家火锅太好吃了',
        content: '今天和朋友一起去吃了这家火锅，味道真的很不错！服务态度也很好，环境很干净。',
        images: ['https://via.placeholder.com/300x200'],
        comments: 32,
        likes: 245,
        createTime: '2023-12-12'
      }
    ])

    // 用户评论
    const userComments = ref([
      {
        id: 1,
        content: '这家店我也去过，确实很不错！推荐他们家的特色菜。',
        postId: 1,
        postTitle: '这家火锅太好吃了',
        createTime: '2023-12-12'
      }
    ])

    // 显示编辑资料对话框
    const showEditProfile = () => {
      editForm.username = userStore.userInfo.value?.username || ''
      editForm.bio = userInfo.bio
      editProfileVisible.value = true
    }

    // 保存个人资料
    const saveProfile = () => {
      if (!editForm.username.trim()) {
        ElMessage.warning('用户名不能为空')
        return
      }
      userStore.updateUserInfo({
        ...userStore.userInfo.value,
        username: editForm.username
      })
      userInfo.bio = editForm.bio
      ElMessage.success('保存成功')
      editProfileVisible.value = false
    }

    // 确认退出登录
    const confirmLogout = () => {
      ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        handleLogout()
      }).catch(() => {})
    }

    // 退出登录
    const handleLogout = () => {
      userStore.logout()
      ElMessage.success('已退出登录')
      router.push('/login')
    }

    // 跳转到帖子详情
    const goToPostDetail = (postId) => {
      router.push(`/post/${postId}`)
    }

    return {
      userStore,
      userInfo,
      activeTab,
      editProfileVisible,
      editForm,
      userPosts,
      userComments,
      showEditProfile,
      saveProfile,
      confirmLogout,
      handleLogout,
      goToPostDetail
    }
  }
}
</script>

<style scoped>
.user-center {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.profile-header {
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.profile-cover {
  height: 200px;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.profile-info {
  padding: 0 40px 40px;
  position: relative;
}

.avatar-container {
  position: relative;
  margin-top: -50px;
  display: inline-block;
}

.edit-avatar {
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
}

.user-info {
  margin-top: 20px;
}

.user-info h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.bio {
  margin: 10px 0;
  color: #666;
  font-size: 14px;
}

.stats {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item .number {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.stat-item .label {
  font-size: 14px;
  color: #666;
}

.action-buttons {
  position: absolute;
  right: 40px;
  top: 20px;
  display: flex;
  gap: 10px;
}

.content-tabs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-info {
  padding: 16px;
}

.post-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
}

.post-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #999;
}

.post-stats {
  display: flex;
  gap: 16px;
}

.post-stats span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.comments-list {
  margin-top: 20px;
}

.comment-card {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.comment-content {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #333;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.post-title {
  color: #409EFF;
  cursor: pointer;
}

.post-title:hover {
  text-decoration: underline;
}

.comment-time {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style> 