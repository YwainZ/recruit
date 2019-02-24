<template>
 <div>
   <el-card v-if="isShow" class="jobcard">
     <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png">
     <p>啊哦，职位已经下线了</p>
   </el-card>
   <div v-if="!isShow">
  <el-card class="jobcard" style="height: 200px;">
  <img :src="company.avatar" class="avatar">
  <div class="introduce">
  <p class="title">{{recruit.title}}</p>
  <p>{{company.introduce}}</p>
  <p>{{company.address}}<span>|</span>{{company.scale}}<span>|</span>{{company.type}}</p>
  </div>
  <el-button class="jobbtn" @click="sendResume()" v-if="!isHr && isLogin">投递简历</el-button>
</el-card>
<el-card class="jobcard">
  <div class="jobintroduce">职位介绍</div>
  <div class="jobcontent">
  <p>{{recruit.content}}</p>
  </div>
  <div class="jobintroduce">联系hr</div>
  <div class="hrinfo">
    <span><i class="el-icon-news"></i>{{hr.username}}</span>
    <a :href= "`mailto:${hr.email}`"><span><i class="el-icon-message"></i>{{hr.email}}</span></a>
  </div>
</el-card>
   </div>
</div>
</template>
<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
div .jobcard {
  width: 1000px;
  margin: 20px auto auto auto;
}
.avatar {
  float: left;
  width: 126px;
  height: 110px;
}
.title {
  font-size: 21px;
}
.introduce {
  margin-left: 140px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.introduce p {
  margin: 8px;
}
p span {
  margin: 14px;
}
.jobintroduce {
  border-left: 5px solid #888;
  text-align: left;
  padding-left: 8px;
}
.jobcontent {
  height: 100px;
  margin: 15px auto 15px auto;
  text-align: left;
}
.hrinfo {
  margin:14px auto 42px auto;
  float: left;
}
.hrinfo span{
    margin-right: 14px
}
.jobbtn {
  float: right;
  margin-bottom: 20px;
}
</style>

<script>
import fetch from '../api/fetch'
export default {
  data () {
    return {
      company: [],
      hr: [],
      recruit: [],
      recruitId: 0,
      title: '',
      isShow: false,
    }
  },
  mounted () {
    this.getJobDetail()
  },
  computed: {
    isHr() {
      if(localStorage.getItem('role') === '1') {
      return true
     }
     return false
    },
    isLogin() {
      return localStorage.getItem('token') ? true : false
    }
  },
  methods: {
    getJobDetail () {
      let jobId = localStorage.getItem('jobId')
      fetch
        .getJobDetail(jobId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.data === null) {
              this.isShow = true
            }
            if (res.data.success === true) {
              this.company = res.data.data.company
              this.hr = res.data.data.hr
              this.recruit = res.data.data.recruit
              this.recruitId = this.recruit.id
              this.title = this.recruit.title
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    sendResume () {
      let body = {
        recruitId: this.recruitId,
        title: this.title
      }
      fetch.deliveryReusme(body).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
}
</script>
