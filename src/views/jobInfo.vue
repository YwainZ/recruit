<template>
 <div>
   <my-menu></my-menu>
   <el-card v-if="isShow" class="jobcard">
     <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png">
     <p>啊哦，职位已经下线了</p>
   </el-card>
   <div v-if="!isShow">
  <el-card class="jobcard">
  <img :src="company.avatar" class="avatar">
  <div class="introduce">
  <p class="title">{{recruit.title}}</p>
  <p>{{company.introduce}}</p>
  <p>{{company.address}}<span>|</span>{{company.scale}}<span>|</span>{{company.type}}</p>
  </div>
  <el-button class="jobbtn" @click="sendResume()" v-if="!isHr">投递简历</el-button>
</el-card>
<el-card class="jobcard">
  <div class="jobintroduce">职位介绍</div>
  <p style="height: 6rem;">{{recruit.content}}</p>
  <div class="jobintroduce">联系hr</div>
  <div class="hrinfo">
    <span><i class="el-icon-news"></i>{{hr.username}}</span>
    <span><i class="el-icon-message"></i>{{hr.email}}</span>
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
.jobcard {
  margin: 2% 15% auto 15%;
}
.avatar {
  float: left;
  width: 9rem;
  height: 7.8rem;
}
.title {
  font-size: 1.5rem;
}
.introduce {
  height: 7.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8rem;
}
.introduce p {
  margin: 0.5rem;
}
p span {
  margin: 1rem;
}
.jobintroduce {
  border-left: 5px solid #36bba6;
  text-align: left;
  padding-left: 0.5rem;
}
.hravatar {
  float: left;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-top: 1rem
}
.hrinfo {
  margin:1rem auto 3rem auto;
  float: left;
}
.hrinfo span{
    margin-right: 1rem
}
.jobbtn {
  float: right;
  margin-bottom: 1rem;
}
</style>

<script>
import menu from "../components/common/menu";
import fetch from "../api/fetch";
export default {
  data () {
    return {
      company: [],
      hr: [],
      recruit: [],
      recruitId: 0,
      title: '',
      isHr: false,
      isShow: false
    }
  },
  mounted () {
    if (localStorage.getItem('role') === '1') {
      this.isHr = true
    }
    this.getJobDetail()
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
  components: {
    'my-menu': menu
  }
}
</script>
