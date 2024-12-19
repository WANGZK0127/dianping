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
            :on-remove="handleRemove"
            name="file"
            accept="image/*"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <!-- 关联商铺 -->
        <el-form-item label="商铺">
          <div class="shop-select-container">
            <!-- 商铺类型选择 -->
            <el-select 
              v-model="selectedShopType" 
              placeholder="选择商铺类型"
              @change="handleShopTypeChange"
              style="width: 150px; margin-right: 10px;"
            >
              <el-option
                v-for="type in shopTypes"
                :key="type.id"
                :label="type.name"
                :value="type.id"
              />
            </el-select>

            <!-- 具体商铺选择 -->
            <el-select 
              v-model="blogForm.shopId" 
              placeholder="选择具体商铺"
              :disabled="!selectedShopType"
              :loading="loading"
              style="width: 250px;"
            >
              <el-option
                v-for="shop in shops"
                :key="shop.id"
                :label="shop.name"
                :value="shop.id"
              />
            </el-select>
          </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { createBlog, deleteImage } from '../api/blog'
import { getShopTypes, getShopsByType } from '../api/shop'
import { userStore } from '../store/user'

export default {
  name: 'CreatePost',
  components: { Plus },
  setup() {
    const router = useRouter()
    const fileList = ref([])
    const submitting = ref(false)
    const shopTypes = ref([])
    const shops = ref([])
    const selectedShopType = ref(null)
    const loading = ref(false)

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
        // 添加预览URL
        uploadFile.url = `http://localhost${response.data}`
        console.log('设置的图片URL:', uploadFile.url)
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

    // 删除图片处理
    const handleRemove = async (uploadFile) => {
      try {
        // 从URL中提取图片路径
        const imagePath = uploadFile.url.replace('http://localhost', '')
        console.log('删除图片路径:', imagePath)
        
        const response = await deleteImage(imagePath)
        console.log('删除图片响应:', response)
        
        // 检查响应的success字段
        if (response && response.success) {
          ElMessage.success('图片删除成功')
          // 从fileList中移除图片
          const index = fileList.value.indexOf(uploadFile)
          if (index !== -1) {
            fileList.value.splice(index, 1)
          }
          return true
        } else {
          ElMessage.error('图片删除失败')
          return false
        }
      } catch (error) {
        console.error('删除图片失败:', error)
        ElMessage.error('删除图片失败，请重试')
        return false
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
      if (fileList.value.length === 0) {
        ElMessage.warning('请上传图片')
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
        console.log('发布博客响应:', response)
        
        // 如果response是数字，说明发布成功
        if (typeof response === 'number' || response?.success) {
          ElMessage.success('发布成功')
          router.push('/')
        } else {
          ElMessage.error((response?.message) || '发布失败，请重试')
        }
      } catch (error) {
        console.error('发布博客失败:', error)
        ElMessage.error(error?.message || '发布失败，请重试')
      } finally {
        submitting.value = false
      }
    }

    // 获取商铺类型列表
    const loadShopTypes = async () => {
      try {
        const data = await getShopTypes()
        shopTypes.value = data || []
      } catch (error) {
        console.error('获取商铺类型失败:', error)
        ElMessage.error('获取商铺类型失败')
      }
    }

    // 获取指定类型的商铺列表
    const loadShopsByType = async (typeId) => {
      if (!typeId) return
      
      try {
        loading.value = true
        const data = await getShopsByType(typeId)
        shops.value = data || []
      } catch (error) {
        console.error('获取商铺列表失败:', error)
        ElMessage.error('获取商铺列表失败')
        shops.value = []
      } finally {
        loading.value = false
      }
    }

    // 处理商铺类型变化
    const handleShopTypeChange = async () => {
      blogForm.value.shopId = null // 清空已选择的商铺
      if (selectedShopType.value) {
        await loadShopsByType(selectedShopType.value)
      }
    }

    onMounted(() => {
      loadShopTypes() // 加载商铺类型数据
    })

    return {
      userStore,
      blogForm,
      fileList,
      submitting,
      uploadHeaders,
      beforeUpload,
      handleUploadSuccess,
      handleUploadError,
      handleRemove,
      submitBlog,
      shopTypes,
      selectedShopType,
      shops,
      handleShopTypeChange,
      loading
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

.shop-select-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.el-select) {
  width: auto;
}
</style> 