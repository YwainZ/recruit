<template>
 <div>
   <my-menu></my-menu>
  <el-card class="jobcard">
  <img :src="company.avatar" class="avatar">
  <div class="introduce">
  <p class="title">{{recruit.content}}</p>
  <p>{{company.introduce}}</p>
  <p>{{company.address}}<span>|</span>{{company.scale}}<span>|</span>{{company.type}}</p>
  </div>
  <el-button class="jobbtn" @click="sendResume()">投递简历</el-button>
</el-card>
<el-card class="jobcard">
  <div class="jobintroduce">职位介绍</div>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <p> 这是一个很长很长很长很长很长很长很长的职位介绍</p>
  <div class="jobintroduce">联系hr</div>
  <div class="hrinfo">
    <span><i class="el-icon-news"></i>{{hr.username}}</span>
    邮箱<span><i class="el-icon-message"></i>{{hr.email}}</span>
  </div>
</el-card>
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
  data() {
    return {
      company: [],
      hr: [],
      recruit: [],
      recruitId: 0,
      title:""
    };
  },
  mounted() {
    this.getJobDetail();
  },
  methods: {
    getJobDetail() {
      let jobId = localStorage.getItem("jobId");
      fetch
        .getJobDetail(jobId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              this.company = res.data.data.company
              this.hr = res.data.data.hr
              this.recruit = res.data.data.recruit
              console.log("详情", res)
              this.recruitId = this.recruit.id
              this.title = this.recruit.title
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    sendResume() {
      console.log('info', )
       fetch.deliveryReusme(this.recruitId, this.title).then(res => {
         console.log("投递",res)
       }).catch(e =>{
         console.log(e)
       })
    }
  },
  components: {
    "my-menu": menu
  }
};
</script>

