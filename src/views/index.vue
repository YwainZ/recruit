<template>
<div>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
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
 <el-menu-item index="4" @click="login">登录</el-menu-item>
    <el-submenu index="5">
    <template slot="title">注册</template>
    <el-menu-item index="5-1" @click="register(!isHrRegister)">求职注册</el-menu-item>
    <el-menu-item index="5-2" @click="register(isHrRegister)">hr注册</el-menu-item>
  </el-submenu>
</el-menu>
<div>
<div class="cardBox">
 <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
        <img :src="item.img" class="boxImg">
      </el-carousel-item>
    </el-carousel>
</div>
<div class="wrapper-card">
  <div class="card" v-for="(item, key) in companyList" :key="key">
    <img :src="item.avatar" class="image">
    <p>{{item.name}}|互联网</p>
  </div>
</div>
</div>
</div>
</template>
<style>
@import "../css/index.css";
.cardBox {
  width: 70%;
  margin: 2% 15% auto 15%;
  box-shadow: 0 2px 5px #888;
  border-radius: 6px;
}

.el-carousel {
  border-radius: 6px;
}

.cardBox:hover {
  transform: translateY(-5px);
  transition: 0.3s;
  box-shadow: 0px 5px 10px #888;
}
.wrapper-card {
  width: 70%;
  margin: 4% 15% auto 15%;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}

.wrapper-card .card {
  border: 1px solid #ebebeb;
  width: 22%;
  height: 16rem;
  border-radius: 6px;
}

.wrapper-card .card:hover {
  transform: translateY(-5px);
  transition: 3ms;
  box-shadow: 5px 5px 10px #888;
}

.wrapper-card .image {
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 65%;
  margin-bottom: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.boxImg {
  width: 100%;
  height: 100%;
}
</style>
<script>
import fetch from '../api/fetch'
export default {
  data() {
    return {
      isHrRegister: true,
      isHrLogin: true,
      crouselImg:[
        {img: "https://upload-images.jianshu.io/upload_images/9381131-174e85f64219dd6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
        {img: "https://upload-images.jianshu.io/upload_images/9381131-174e85f64219dd6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
        {img: "https://upload-images.jianshu.io/upload_images/9381131-174e85f64219dd6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
        {img: "https://upload-images.jianshu.io/upload_images/9381131-174e85f64219dd6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}

      ],
      activeIndex2: "1",
      currentDate: "完美",
      company:"",
      companyList:[]
    };
  },
   mounted(){
    this.getCompany();
  },
  methods: {
    register(flag){
      this.$router.push({name: 'register'});
      localStorage.setItem("isRegister", flag)
    },
    login(){
      this.$router.push({name: 'login'});
    },
    getCompany(){
      fetch.getCompany().then(res =>{
        console.log(res);
        if (res.status===200){
          this.companyList = res.data.data.companyList;
          console.log("hahah",this.companyList)
        }
      })

    }
  }

};
</script>

