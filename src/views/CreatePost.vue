<template>
  <div class="create-post">
    <div class="container">
      <div class="post-form">
        <h2>发布博客</h2>
        
        <!-- 标题输入 -->
        <el-form-item label="标题">
          <el-input v-model="blogForm.title" placeholder="请输入标题" />
        </el-form-item>

        <!-- 内容输入 -->
        <el-form-item label="内容">
          <el-input
            v-model="blogForm.content"
            type="textarea"
            :rows="6"
            placeholder="写点什么..."
          />
        </el-form-item>

        <!-- 图片上传 -->
        <el-form-item label="图片">
          <el-upload
            v-model:file-list="fileList"
            :action="`/api/upload/blog`"
            list-type="picture-card"
            :headers="uploadHeaders"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :on-error="handleUploadError"
            name="file"
            accept="image/*"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <!-- 关联商铺 -->
        <el-form-item label="关联商铺">
          <el-select v-model="blogForm.shopId" placeholder="选择关联的商铺">
            <el-option
              v-for="shop in shops"
              :key="shop.id"
              :label="shop.name"
              :value="shop.id"
            />
          </el-select>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="submitBlog">
            发布
          </el-button>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { createBlog } from '../api/blog'
import { userStore } from '../store/user'

export default {
  name: 'CreatePost',
  components: { Plus },
  setup() {
    const router = useRouter()
    const fileList = ref([])
    const submitting = ref(false)
    
    // 计算上传请求头
    const uploadHeaders = computed(() => ({
      authorization: userStore.token || ''
    }))

    const blogForm = ref({
      title: '',
      content: '',
      images: '',
      shopId: null
    })

    // 上传前检查
    const beforeUpload = (file) => {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        ElMessage.error('只能上传图片文件!')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB!')
        return false
      }
      return true
    }

    // 上传成功处理
    const handleUploadSuccess = (response, uploadFile) => {
      console.log('上传成功响应:', response)
      if (response.success) {
        // 保存完整的图片URL
        uploadFile.url = response.data
        ElMessage.success('图片上传成功')
      } else {
        ElMessage.error('图片上传失败')
        const index = fileList.value.indexOf(uploadFile)
        if (index !== -1) {
          fileList.value.splice(index, 1)
        }
      }
    }

    // 上传失败处理
    const handleUploadError = (error, uploadFile) => {
      console.error('上传失败:', error)
      ElMessage.error('图片上传失败，请检查网络连接')
      const index = fileList.value.indexOf(uploadFile)
      if (index !== -1) {
        fileList.value.splice(index, 1)
      }
    }

    // 提交博客
    const submitBlog = async () => {
      if (!blogForm.value.title.trim()) {
        ElMessage.warning('请输入标题')
        return
      }
      if (!blogForm.value.content.trim()) {
        ElMessage.warning('请输入内容')
        return
      }

      try {
        submitting.value = true
        // 处理图片路径
        blogForm.value.images = fileList.value
          .map(file => file.url)
          .filter(url => url)
          .join(',')

        const response = await createBlog(blogForm.value)
        if (response.success) {
          ElMessage.success('发布成功')
          router.push('/')
        } else {
          ElMessage.error(response.message || '发布失败')
        }
      } catch (error) {
        console.error('发布博客失败:', error)
        ElMessage.error('发布失败')
      } finally {
        submitting.value = false
      }
    }

    return {
      userStore,
      blogForm,
      fileList,
      submitting,
      uploadHeaders,
      beforeUpload,
      handleUploadSuccess,
      handleUploadError,
      submitBlog
    }
  }
}
</script>

<style scoped>
.create-post {
  padding: 20px 0;
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-form {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.post-form h2 {
  margin-bottom: 24px;
  color: #333;
  font-size: 24px;
}

.el-form-item {
  margin-bottom: 24px;
}

:deep(.el-upload--picture-card) {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 120px;
  height: 120px;
}
</style> 