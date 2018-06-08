<template>
<div>
  <my-menu class="myMenu"></my-menu>
  <router-view></router-view>
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
