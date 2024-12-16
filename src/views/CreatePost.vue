<template>
  <div class="create-post">
    <el-card class="post-form">
      <template #header>
        <div class="card-header">
          <h2>发布新帖子</h2>
        </div>
      </template>
      
      <el-form :model="postForm" :rules="rules" ref="postFormRef" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="postForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="postForm.category" placeholder="请选择分类">
            <el-option v-for="category in categories" 
              :key="category.value" 
              :label="category.label" 
              :value="category.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input v-model="postForm.content" type="textarea" rows="6" placeholder="请输入内容描述"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleImageChange"
            :on-remove="handleImageRemove"
            :limit="4">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">发布</el-button>
          <el-button @click="cancelCreate">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'CreatePost',
  components: {
    Plus
  },
  setup() {
    const router = useRouter()
    const postFormRef = ref(null)
    const imageList = ref([])

    const categories = [
      { value: '美食', label: '美食' },
      { value: '购物', label: '购物' },
      { value: '咖啡', label: '咖啡' },
      { value: '礼品', label: '礼品' },
      { value: '旅游', label: '旅游' },
      { value: '酒店', label: '酒店' },
      { value: '运动', label: '运动' },
      { value: '娱乐', label: '娱乐' }
    ]

    const postForm = reactive({
      title: '',
      category: '',
      content: ''
    })

    const rules = {
      title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 2, max: 50, message: '标题长度在2到50个字符之间', trigger: 'blur' }
      ],
      category: [
        { required: true, message: '请选择分类', trigger: 'change' }
      ],
      content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 10, max: 500, message: '内容长度在10到500个字符之间', trigger: 'blur' }
      ]
    }

    const handleImageChange = (file) => {
      imageList.value.push(file)
    }

    const handleImageRemove = (file) => {
      const index = imageList.value.findIndex(item => item.uid === file.uid)
      if (index !== -1) {
        imageList.value.splice(index, 1)
      }
    }

    const submitForm = async () => {
      if (!postFormRef.value) return

      await postFormRef.value.validate((valid) => {
        if (valid) {
          // TODO: 这里需要调用后端API来保存帖子
          ElMessage.success('发布成功！')
          router.push('/')
        } else {
          return false
        }
      })
    }

    const cancelCreate = () => {
      router.push('/')
    }

    return {
      postForm,
      postFormRef,
      rules,
      categories,
      imageList,
      handleImageChange,
      handleImageRemove,
      submitForm,
      cancelCreate
    }
  }
}
</script>

<style scoped>
.create-post {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.post-form {
  background-color: #fff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
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