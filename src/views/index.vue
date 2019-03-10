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
  <!--推荐-->
  <div class="division" v-if="isLogin">
    <h3>{{isHr ? '推荐候选人': '推荐职位'}}</h3>
    <h3 style="color: #888;font-weight: 400">---- Hot ----</h3>
  </div>
  <!--推荐候选人--->
  <div class="recommand" v-if="isLogin">
    <!---简历弹窗-->
   <el-dialog :title="getResumeList.name+'的简历'" :visible.sync="isShow">
        <table border="1" cellspacing="0" style="border-color:#ededed" class="mytable">
          <tr>
            <td>姓名：</td>
            <td>{{getResumeList.name}}</td>
          </tr>
          <tr>
            <td>年龄：</td>
            <td>{{getResumeList.age}}</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{getResumeList.sex}}</td>
          </tr>
          <tr>
            <td>电话：</td>
            <td>{{getResumeList.phone}}</td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>{{getResumeList.email}}</td>
          </tr>
          <tr>
            <td>地址：</td>
            <td>{{getResumeList.address}}</td>
          </tr>
          <tr>
            <td>学校：</td>
            <td>{{getResumeList.school}}</td>
          </tr>
          <tr>
            <td>毕业时间：</td>
            <td>{{getResumeList.endTime}}</td>
          </tr>
          <tr>
            <td>技术栈：</td>
            <td>
          <tr v-for="(item, key) in getResumeList.skills" :key="key">
            <td class="progress2">{{item.name}}</td>
            <td class="progress2">熟悉程度：
              <el-progress :text-inside="true" :stroke-width="15" :percentage="item.level*25"></el-progress>
            </td>
          </tr>
          </td>
          </tr>
          <tr>
            <td>实习（工作）经历：</td>
            <td>{{getResumeList.experience}}</td>
          </tr>
          <tr>
            <td>自我介绍：</td>
            <td>{{getResumeList.introduce}}</td>
          </tr>
          <tr>
            <td>获奖经历：</td>
            <td>{{getResumeList.awards}}</td>
          </tr>
        </table>
      </el-dialog>

  <el-carousel height="180px" v-if="isHr">
    <el-carousel-item v-for="(recommand, key) in recommandList" :key="key" class="el-carousel-item">
        <div v-for="(candidate, key) in recommand.candidateList" :key="key" class="recommandList" @click="getTableList(candidate.userId)">
        <el-progress type="circle" :percentage="candidate.rate" :width=100 :stroke-width="8"></el-progress>
        <div class="recommandInfo">
          <p>{{recommand.title}}</p>
          <p>{{candidate.name}}</p>
          <p>{{candidate.school}}</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>


  <!--推荐职位-->
    <el-carousel height="180px" v-else>
    <el-carousel-item  class="el-carousel-item">
        <div class="recommandJob" v-for="(recommand, key) in recommandList" :key="key" @click="jobDetail(recommand.recruitId)">
          <p>{{recommand.companyName}}</p>
          <p>{{recommand.title}}</p>
        </div>
    </el-carousel-item>
  </el-carousel>
  </div>

  <!--热门职位-->
  <div class="division">
    <h3>热门职位</h3>
    <h3 style="color: #888;font-weight: 400">--- JOBS ---</h3>
  </div>
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
  z-index: 100;
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

.recommand {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 36px 0;
  font-size: 18px;
}

.recommandList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #5a5a5a;
  font-weight: 500;
}

.recommandInfo {
  margin-left: 16px;
}

.recommandInfo p {
  margin-bottom: 6px;
}

.el-progress__text {
  font-size: 16px !important;
  text-align: center !important;
}

.el-carousel-item {
  display: flex;
  justify-content: space-around;
}

.el-carousel {
  width: 1200px;
  margin: 0 auto;
}

.recommandJob {
  border: 1px solid #ebebeb;
  text-align: left;
  color: #fff;
  line-height: 30px;
  background: linear-gradient(#948E99, #2E1437);
  border-radius: 4px;
  width: 150px;
  height: 180px;
  padding: 20px 10px 10px;
  font-weight: bold;
}

.mytable {
  width: 100%;
  height: 700px;
}

.progress2 {
  width: 182px;
  border: 0;
}

</style>
<script>
import fetch from '../api/fetch'
export default {
  data () {
    return {
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
      jobList: [],
      recommandList: [],
      isHr: localStorage.getItem('role') === '1',
      isLogin: localStorage.getItem('token') ? true : false,
      isShow:  false,
      getResumeList: {
          name: '',
          sex: '',
          age: '',
          skills: [{
            id: 1,
            name: '',
            level: '',
            resumeId: 1
          }],
          school: '',
          address: '',
          endTime: 2019,
          phone: '',
          email: '',
          introduce: '',
          experience: '',
          awards: '',
          avatar: ''
        },
    }
  },

  mounted () {
    window.addEventListener('scroll', this.handler)
    this.getCompany()
    this.getJob()
    this.getRecommand()
  },
  methods: {
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
    },
    // 获取推荐列表
    getRecommand () {
      if (this.isLogin) {
        if (this.isHr) {
        fetch.recommendCandidate().then(res => {
          if (res.status === 200) {
            this.recommandList = res.data.data
          }
        })
      } else {
        fetch.recommendJob().then(res => {
        if (res.status === 200) {
          this.recommandList = res.data.data
        }
      })
      }
    }
  },
  // 查看推荐候选人
  getTableList(id) {
      this.isShow = true
        fetch
          .getResume(id)
          .then(res => {
            if (res.status === 200) {
              if (res.data.success === true) {
                if (res.data.data !== null) {
                  this.getResumeList = res.data.data
                }
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
},

}
</script>
