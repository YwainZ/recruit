<template>
  <div>
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#36bba6"
  text-color="#fff"
  active-text-color="#fff">
  <el-menu-item index="1">职位信息</el-menu-item>
  <el-submenu index="2">
    <template slot="title" >简历评估</template>
    <el-menu-item index="2-1">创建简历</el-menu-item>
    <el-menu-item index="2-2">简历筛选</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">消息中心</el-menu-item>
  <div>
  </div>
</el-menu>
  </div>
</template>
<script>
export default {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
}
</script>
