<template>
<div>
  <my-menu class="myMenu"></my-menu>
  <router-view class="container"></router-view>
</div>
</template>

<script>
import menu from './menu'
export default {
  components: {
    'my-menu': menu
  }
}
</script>

<style>
body {
  background: #ededed;
}
.myMenu {
  position: sticky;
  top: 0;
  z-index: 1;
}
.container {
  width: 100%;
  height: 100%;
  border:1px solid #ededed;
  background: #fff;
}
</style>