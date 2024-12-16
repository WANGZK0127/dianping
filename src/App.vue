<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { userStore } from './store/user'

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      userStore.initUserState()
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style>
