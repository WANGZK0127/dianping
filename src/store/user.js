import { ref } from 'vue'
import { getUserMe } from '../api/user'

// 创建用户状态
export const userStore = {
  isLoggedIn: ref(false),
  userInfo: ref(null),

  // 登录
  async login(token) {
    try {
      // 保存token
      localStorage.setItem('token', token)
      
      // 获取用户信息
      const userInfo = await getUserMe()
      this.userInfo.value = {
        id: userInfo.id,
        username: userInfo.name,
        avatar: userInfo.icon || 'https://via.placeholder.com/40'
      }
      
      this.isLoggedIn.value = true
      
      // 保存到本地存储
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo.value))
      localStorage.setItem('isLoggedIn', 'true')
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 清除token和登录状态
      this.logout()
      throw error
    }
  },

  // 退出登录
  logout() {
    this.isLoggedIn.value = false
    this.userInfo.value = null
    // 清除本地存储
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
  },

  // 初始化用户状态
  async initUserState() {
    const token = localStorage.getItem('token')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (token && isLoggedIn) {
      try {
        // 获取最新的用户信息
        const userInfo = await getUserMe()
        this.userInfo.value = {
          id: userInfo.id,
          username: userInfo.name,
          avatar: userInfo.icon || 'https://via.placeholder.com/40'
        }
        this.isLoggedIn.value = true
      } catch (error) {
        console.error('初始化用户状态失败:', error)
        this.logout()
      }
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