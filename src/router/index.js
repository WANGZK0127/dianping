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
import ShopList from '../views/ShopList.vue'

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
  },
  {
    path: '/category/:type',
    name: 'ShopList',
    component: ShopList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router 