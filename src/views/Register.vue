<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2>注册</h2>
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef">
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" placeholder="手机号">
            <template #prefix>
              <el-icon><Phone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister" style="width: 100%">注册</el-button>
        </el-form-item>
        <div class="login-link">
          已有账号？<router-link to="/login">立即登录</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { User, Lock, Phone } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userStore } from '../store/user'

export default {
  name: 'RegisterPage',
  components: { User, Lock, Phone },
  setup() {
    const router = useRouter()
    const registerFormRef = ref(null)
    const registerForm = reactive({
      phone: '',
      password: '',
      confirmPassword: ''
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

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度在6到20个字符之间'))
      } else {
        if (registerForm.confirmPassword !== '') {
          if (registerForm.password !== registerForm.confirmPassword) {
            callback(new Error('两次输入密码不一致'))
          }
        }
        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    const rules = {
      phone: [
        { required: true, validator: validatePhone, trigger: 'blur' }
      ],
      password: [{ validator: validatePass, trigger: 'blur' }],
      confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
    }

    const handleRegister = async () => {
      if (!registerFormRef.value) return

      await registerFormRef.value.validate((valid) => {
        if (valid) {
          // 模拟注册成功
          // 生成随机用户名
          const randomUsername = 'user_' + Math.random().toString(36).substr(2, 8)
          userStore.login(randomUsername)
          ElMessage.success('注册成功')
          router.push('/')
        }
      })
    }

    return {
      registerForm,
      registerFormRef,
      rules,
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.register-card {
  width: 400px;
  padding: 20px;
}

.register-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.login-link a {
  color: #409EFF;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style> 