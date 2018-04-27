<template>
 <div>
<my-menu></my-menu>
<el-card>
  <img :src="detail.avatar" class="avatar">
  <div class="introduce">
  <p class="title">{{detail.name}}</p>
  <p>{{detail.introduce}}</p>
  <p>{{detail.address}}<span>|</span>{{detail.scale}}<span>|</span>{{detail.type}}</p>
  </div>
</el-card>
<el-card>
  <div class="job">招聘信息</div>
  <p v-if="!isShow" class="nojob">暂时没有招聘信息哦</p>
  <div class="jobcard" v-if="isShow" >
    <el-card v-for="(item, key) in recruit" :key="key" shadow="hover">
      <div class="jobinfo" @click="getJobDetail(item.id)">
      <p class="jobname">{{item.content}}</p>
      <p><i class="el-icon-location"></i>{{detail.address}}<span>|</span>{{detail.scale}}<span>|</span>{{detail.type}}</p>
      </div>
    </el-card>
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

.el-card .job {
  border-left: 5px solid #36bba6;
  text-align: left;
  padding-left: 0.5rem;
}

.el-card {
  width: 70%;
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
}

.introduce p {
  margin: 0.5rem;
}

p span {
  margin: 1rem;
}
.jobinfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.jobinfo p {
  margin: 0.2rem;
}
.jobname {
  font-size: 18px;
}
.jobcard .el-card {
  width: 100%;
  margin-left: 0.06rem;
}
.nojob {
  font-size: 18px;
  color: #909399;
}
</style>

<script>
import fetch from "../api/fetch";
import menu from "../components/common/menu";
export default {
  data() {
    return {
      companyId: localStorage.getItem("companyId"),
      detail: [],
      recruit: [],
      isShow: true
    };
  },
  mounted() {
    this.getCompanyInfo();
  },
  methods: {
    getCompanyInfo() {
      fetch
        .getCompanyDetail(this.companyId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              this.detail = res.data.data.company
              this.recruit = res.data.data.recruitList
              if (this.recruit.length === 0) {
                this.isShow = false;
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getJobDetail(id) {
      localStorage.setItem("jobId", id)
      this.$router.push({name: "jobInfo"})
    }
  },
  components: {
    "my-menu": menu
  }
};
</script>
