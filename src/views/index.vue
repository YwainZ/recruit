<template>
<div>
  <my-menu></my-menu>
  <div class="indexContain">
<div class="cardBox">
 <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
        <img :src="item.img" class="boxImg">
      </el-carousel-item>
    </el-carousel>
</div>
  </div>
  <div class="division"><h3>热门企业</h3>
                        <h3 style="color: #888;font-weight: 400">--- Hot ---</h3></div>
  <div class="cardContain">
<div class="wrapper-card">
  <div class="card" v-for="(item, key) in companyList" :key="key">
    <img :src="item.avatar" class="image" @click="getCompanyDetail(item.id)">
</div>
</div>
  </div>
  <div class="division"><h3>互联网动态</h3>
    <h3 style="color: #888;font-weight: 400">--- news ---</h3></div>
  <div class="newsContain">
    <div>
      <img src="#"/>
      <span>巴拉巴拉</span>
    </div>
    <div>
      <img src="#"/>
      <span>巴拉巴拉</span>
    </div>
    <div>
      <img src="#"/>
      <span>巴拉巴拉</span>
    </div>
  </div>
  <div class="aboutus">
    <span></span>
  </div>
  <div class="division"><h3>联系我们</h3>
    <h3 style="color: #888;font-weight: 400">--- CONTACT ---</h3></div>
  <div class="footer">
  </div>
</div>
</template>
<style>
@import "../css/index.css";
body {
  background: #ededed;
}
.indexContain {
  width: 100%;
  height: 100%;
  border:1px solid #ededed;
  background: #fff;
}
.cardContain {
  width: 100%;
  height: 100%;
  background: #fff;
}
.newsContain {
  width: 100%;
  height: 100%;
  background: #fff;
}
.footer {
  width: 100%;
  height: 100px;
  background: black;
}
.aboutus  {
  width: 100%;
  height: 500px;
  background: url("https://upload-images.jianshu.io/upload_images/9381131-26f1415d8499dc6b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240") no-repeat;
  background-size: 100% 100%;
  filter: grayscale(100%);
  opacity: 0.5;

}
.cardBox {
  position: relative;
  width: 1200px;
  margin: 50px auto 50px 140px;
  box-shadow: 0 10px 15px #888;
  border-radius: 6px;
}
.cardBox:hover {
  transform: translateY(-5px);
  transition: 0.3s;
  box-shadow: 0 15px 25px #888;
}
.wrapper-card {
  width: 1200px;
  height:1000px;
  margin: 30px auto auto 140px;
  padding-top: 30px;
}
.wrapper-card .card {
  color: #07111B;
  font-size: 16px;
  border: 1px solid #ededed;
  width: 336px;
  height: 243px;
  float: left;
  margin: 30px;
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
  height: 100%;
  margin-bottom: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
}
.boxImg {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.division {
    width: 100%;
    margin: 30px  auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
}
</style>
<script>
import fetch from '../api/fetch'
import menu from '../components/common/menu'
export default {
  data () {
    return {
      crouselImg: [
        {img: 'https://sxsimg.xiaoyuanzhao.com/97/E8/9757C6F113FF8A98769B1B627EE7FDE8.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/EE/34/EEEDE091CD9D4B62098CEFC493BA8634.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/2E/62/2E25D1313CF3C38BD2DDA49E3B310462.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/FD/0C/FDBBBD21A98136E3054ADDD432A5020C.png'}

      ],
      activeIndex2: '1',
      currentDate: '完美',
      company: '',
      companyList: []
    }
  },
  mounted () {
    this.getCompany()
  },
  methods: {
    getCompany () {
      fetch.getCompany().then(res => {
        if (res.status === 200) {
          this.companyList = res.data.data.companyList
        }
      })
    },
    getCompanyDetail (id) {
      localStorage.setItem('companyId', id)
      this.$router.push({name: 'companyDetail'})
    }
  },
  components: {
    'my-menu': menu
  }

}
</script>
