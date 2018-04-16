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
  <span class="lastItem"><button @click="login" class="btn">登录</button><button @click="register" class="btn">注册</button></span>
  </div>
</el-menu>
<div>
<div class="cardBox">
 <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
        <img :src="item.img" class="boxImg">
      </el-carousel-item>
    </el-carousel>
</div>
<div class="wrapper-card">
  <div class="card" v-for="(item, key) in companyList" :key="key">
    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913405010,234075526&fm=27&gp=0.jpg" class="image">
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
  border-radius: 18px;
}

.el-carousel {
  border-radius: 18px;
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
  border-radius: 8px;
}

.wrapper-card .card:hover {
  transform: translateY(-5px);
  transition: 3ms;
  box-shadow: 5px 5px 10px #888;
}

.wrapper-card .image {
  border-radius: 8px 8px 0 0;
  width: 100%;
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

.lastItem {
  float: right;
  margin: 1% 15% auto auto;
}

.lastItem .btn {
  font-size: 14px;
  width: 70px;
  height: 40px;
  color: #fff;
  margin-left: 10px;
  border: 1px solid #fff;
  background: #36bba6;
  border-radius: 10px;
}

.boxImg {
  width: 100%;
  height: 100%;
}
</style>
<script>
import axios from "axios";
import api from '../api/index'
export default {
  data() {
    return {
      crouselImg:[
        {img: "https://upload-images.jianshu.io/upload_images/9381131-11c038a74c425e92.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
        {img: "https://upload-images.jianshu.io/upload_images/9381131-c92b42388d1ff093.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
        {img: "https://upload-images.jianshu.io/upload_images/9381131-4d501116a5f8bca9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
        {img: "https://upload-images.jianshu.io/upload_images/9381131-34025d9e315a91c7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.$router.push({name: "login"});
    },
    register(){
      this.$router.push({name: "register"})
    },
    getCompany(){
      axios.get("http://47.94.248.38:6200/company").then(res =>{
        console.log(res);
        if (res.status===200){
          this.companyList = res.data.data;
          console.log("hahah",this.companyList)
        }
      })

    }
  }

};
</script>

