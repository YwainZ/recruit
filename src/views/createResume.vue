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
<div>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide><img class= "img" src="http://img.mp.sohu.com/upload/20170622/90596dce7be2443c94ba43467e7aed85_th.png"></swiper-slide>
    <swiper-slide><img  class= "img" src="http://img.mp.sohu.com/upload/20170616/f200daf8faff4251833e95e991a52ead_th.png"></swiper-slide>
    <swiper-slide><img class= "img" src="http://pic.962.net/up/2017-7/14998276192338514.jpg"></swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
  </div>
</template>
<style>
@import "swiper/dist/css/swiper.css";
.img {
  width: 100%;
  height: 187px;
}
</style>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      swiperOption: {
        pagination:{
          el:'.swiper-pagination',
          type: 'fraction'
        },
        navigation:{
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
        },
        initialSlide: 0, //设定初始化时slide的索引
        direction: "horizontal", //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        loop: true, //无限滚动
        speed: 300, //滑动速度
        autoplay: true, //自动切换的时间间
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
