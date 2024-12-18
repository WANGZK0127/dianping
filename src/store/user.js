import { ref } from 'vue'

// 创建用户状态
export const userStore = {
  isLoggedIn: ref(false),
  userInfo: ref(null),

  // 登录
  login(username) {
    this.isLoggedIn.value = true
    this.userInfo.value = {
      username,
      avatar: 'https://via.placeholder.com/40'
    }
    // 保存到本地存储
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo.value))
    localStorage.setItem('isLoggedIn', 'true')
  },

  // 退出登录
  async logout() {
    try {
      await logout() // 调用后端登出接口
      this.isLoggedIn.value = false
      this.userInfo.value = null
      // 清除本地存储
      localStorage.removeItem('userInfo')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('token')
    } catch (error) {
      console.error('退出登录失败:', error)
      // 即使后端请求失败，也要清除本地状态
      this.isLoggedIn.value = false
      this.userInfo.value = null
      localStorage.removeItem('userInfo')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('token')
    }
  },

  // 初始化用户状态
  initUserState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    if (isLoggedIn && userInfo) {
      this.isLoggedIn.value = true
      this.userInfo.value = userInfo
    }
  },

  // 更新用户信息
  updateUserInfo(newInfo) {
    this.userInfo.value = {
      ...this.userInfo.value,
      ...newInfo
    }
    // 更新本地存储
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo.value))
  }
} 