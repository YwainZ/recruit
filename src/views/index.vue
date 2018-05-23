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
  <div class="division"><h3>热门职位</h3>
    <h3 style="color: #888;font-weight: 400">--- JOBS ---</h3></div>
  <div class="newsContain">
    <div class="newsItem"  v-for = "(item, key) in jobList" :key = "key">
      <div class="picContain" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">
      <span class="itemPic">{{item.company.name}}</span>
      <span class="back">{{item.company.createTime}}</span>
        </div>
    </div>
      <span>{{item.recruit.title}}</span>
      <p>{{item.recruit.content}}</p>
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
.picContain {
  margin-right: 10px;
  perspective: 1000;
}
.picContain:hover .flipper, .picContain.hover .flipper{
  transform: rotateY(180deg);
}
.picContain, .itemPic, .back{
  width: 80px;
  height: 80px;
}
.flipper {
  transition: 0.6s;
  transform-style:preserve-3d;
  position: relative;
}
.newsItem {
  display: flex;
  justify-content: flex-start;
  width: 1200px;
  margin: 50px auto 50px 140px;
  height: 114px;
  text-align: left;
  color: #5a5a5a;
  font-weight: 500;
  padding-top: 15px;
  border-bottom: 1px solid #ededed;
}
.itemPic, .back {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  background: #cc0000;
  text-align: center;
  color: white;
  font-weight: 500;
  line-height: 80px;
  white-space: nowrap;
}
.itemPic {
  z-index: 2;
}
.back {
  transform: rotateY(180deg);
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
      companyList: [],
      jobList: []
    }
  },
  mounted () {
    this.getCompany()
    this.getJob()
  },
  methods: {
    getJob () {
      fetch.findJob().then(res => {
        if (res.status === 200) {
          if (res.data.success === true) {
            this.jobList = res.data.data.recruitList
            console.log(this.jobList)
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
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
