<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="手机号">
            <template #prefix>
              <el-icon><Phone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%" :loading="loading">登录</el-button>
        </el-form-item>
        <div class="register-link">
          还没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Lock, Phone } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userStore } from '../store/user'
import { login } from '../api/user'

export default {
  name: 'LoginPage',
  components: { Lock, Phone },
  setup() {
    const router = useRouter()
    const loginFormRef = ref(null)
    const loading = ref(false)
    const loginForm = reactive({
      phone: '',
      password: ''
    })

    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    const rules = {
      phone: [
        { required: true, validator: validatePhone, trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' }
      ]
    }

    const handleLogin = async () => {
      if (!loginFormRef.value) return
      
      await loginFormRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          try {
            const token = await login(loginForm)
            await userStore.login(token)
            ElMessage.success('登录成功')
            router.push('/')
          } catch (error) {
            console.error('登录错误:', error)
            ElMessage.error(error?.message || '登录失败，请重试')
          } finally {
            loading.value = false
          }
        }
      })
    }

    return {
      loginForm,
      loginFormRef,
      loading,
      rules,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
  padding: 20px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.register-link a {
  color: #409EFF;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style> 