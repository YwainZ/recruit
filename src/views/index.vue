<template>
<div>
  <div class="indexContain">
<div class="cardBox">
 <el-carousel trigger="click" height="400px" style="position: sticky;">
      <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
        <img :src="item.img" class="boxImg" >
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
    <div class="temp">
    <div class="newsItem"  v-for = "(item, key) in jobList" :key = "key" @click="jobDetail(item.recruit.id)">
      <div class="picContain" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">
      <span class="itemPic">{{item.company.name}}</span>
      <span class="back">{{item.company.createTime}}</span>
        </div>
    </div>
    <div>
      <p>{{item.recruit.title}}</p>
      <p style="margin-top:25px">{{item.recruit.content}}</p>
      </div>
    </div>
    </div>
  </div>
  <div class="aboutus">
    <div id="aboutusInfo">
    <h2>关于我们</h2>
    <p>面向互联网求职招聘，提供更多的实习和工作机会</p>
    <p>即刻起，点赞你的生活，从这一份工作开始。</p>
    </div>
  </div>
  <div class="division"><h3>联系我们</h3>
    <h3 style="color: #888;font-weight: 400">--- CONTACT ---</h3></div>
  <div class="footer">
    <a href="https://github.com/Clairezyw"><img src="../assets/github4.png"><span>https://github.com/Clairezyw</span></a>
    <a href="https://github.com/stalary"><img src="../assets/github4.png"><span>https://github.com/stalary</span></a>
  </div>
  <test @getmess='get' :mess="mess"></test>
</div>
</template>
<style>
@import "../css/index.css";
@import "../assets/Animate/animate.min.css";
body {
  background: #ededed;
}
.myMenu {
  position: sticky;
  top: 0;
  z-index: 1;
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
  padding-top: 1px;
  width: 100%;
  height: 100%;
  background: #fff;
}
.picContain {
  margin-right: 10px;
  perspective: 1000px;
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
  margin: auto;
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
  padding-top:20px
}
.footer a {
  color: white;
  text-decoration: none;
}
.aboutus  {
  width: 100%;
  height: 500px;
  background: url("https://upload-images.jianshu.io/upload_images/9381131-fd2872c9d933b2de.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240") no-repeat;
  background-size: 100% 100%;
  filter: grayscale(70%);
  opacity: 0.7;
  color: white;
  font-weight: 600;
  padding-top: 60px;
}
.aboutus p{
  margin-top: 30px;
  font-size: 18px;
}
#aboutusInfo {
  margin-top: 80px;
  animation-delay: 1s
}
.cardBox {
  position: relative;
  width: 1200px;
  margin: 20px auto 30px auto;
  box-shadow: 0 10px 15px #888;
  border-radius: 6px;
}
.wrapper-card {
  width: 1200px;
  height:1000px;
  margin: 30px auto auto auto;
  padding-top: 30px;
}
.wrapper-card .card {
  color: #07111B;
  font-size: 16px;
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
  border-radius: 6px;
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
.footer img{
  width:25px;
  height: 25px;
  margin-right: 10px
}
.footer span {
  margin-right: 20px;
}

</style>
<script>
import fetch from '../api/fetch'
import test from './test'
export default {
  data () {
    return {
      mess: '',
      crouselImg: [
        {img: 'https://sxsimg.xiaoyuanzhao.com/3C/09/3C4A275077015CBF398443CC21774709.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/C3/55/C35273E2AAA17DBA580304E05DF22155.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/C6/FC/C60F54D6D175ABAF3E9A33F0FDE867FC.png'},
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
    window.addEventListener('scroll', this.handler)
    this.getCompany()
    this.getJob()
  },
  methods: {
    get(mess) {
      this.mess = mess;
      alert(this.mess);
    },
    handler() {
      let info = document.getElementById('aboutusInfo') || null
      let card = document.getElementsByClassName('temp')[0] || null
      if (info === null || card === null) {
          return;
      }
      else if (document.documentElement.scrollTop > 1000) {
         card.classList.add('animated')
         card.classList.add('bounceInLeft')
         info.classList.add('animated')
         info.classList.add('bounceInLeft')
      } else {
        info.classList.remove('animated')
        info.classList.remove('bounceInLeft')
        card.classList.remove('animated')
        card.classList.remove('bounceInLeft')
      }
    },
    jobDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },
    getJob () {
      fetch.findJob().then(res => {
        if (res.status === 200) {
          if (res.data.success === true) {
            this.jobList = res.data.data.recruitList
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
          console.log('res', res)
        }
      })
    },
    getCompanyDetail (id) {
      localStorage.setItem('companyId', id)
      this.$router.push({name: 'companyDetail'})
    }
  },
  components: {
    test: test
  }

}
</script>
