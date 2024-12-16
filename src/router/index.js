import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PostDetail from '../views/PostDetail.vue'
import CategoryPage from '../views/CategoryPage.vue'
import CreatePost from '../views/CreatePost.vue'
import ShopDetail from '../views/ShopDetail.vue'
import UserCenter from '../views/UserCenter.vue'
import { userStore } from '../store/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/shop/:id',
    name: 'ShopDetail',
    component: ShopDetail
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail
  },
  {
    path: '/category/:category',
    name: 'CategoryPage',
    component: CategoryPage
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiresAuth: true }
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: UserCenter,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 检查该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    if (!userStore.isLoggedIn.value) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 