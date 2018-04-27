<template>
<div>
  <my-menu></my-menu>
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
    <img :src="item.avatar" class="image" @click="getCompanyDetail(item.id)">
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
import menu from '../components/common/menu'
export default {
  data() {
    return {
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
    getCompany(){
      fetch.getCompany().then(res =>{
        if (res.status===200){
          this.companyList = res.data.data.companyList;
        }
      })
    },
    getCompanyDetail(id) {
      localStorage.setItem("companyId", id)
      this.$router.push({name: 'companyDetail'})
    }
  },
  components: {
    "my-menu": menu
  }

};
</script>

