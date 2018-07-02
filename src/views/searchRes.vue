<template>
  <div>
    <el-card class="nojob" v-if="!havejob">暂时没有该岗位信息</el-card>
    <el-card v-if="havejob" v-for="(item, key) in list" :key="key" class="jobcard">
      <div  @click="findDetail(item.recruit.id)">
     <img class="jobavatar" :src="item.company.avatar"/>
     <div class="introduce">
       <p>{{item.recruit.title}}</p>
       <p>{{item.company.address}}<span>|</span>{{item.company.scale}}<span>|</span>{{item.company.type}}</p>
     </div>
      </div>
    </el-card>
  </div>
</template>
<style>
.nojob {
  margin: 20px auto auto auto;
}
.jobcard {
  width: 1000px;
  margin: 20px auto auto auto;
}
.jobavatar {
  float: left;
  width: 126px;
  height: 110px;
  margin: auto 14px 20px auto;
}
.introduce {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.introduce p {
  font-size: 18px;
  margin-bottom: 14px;
}
</style>
<script>
import fetch from '../api/fetch'
export default {
  data () {
    return {
      content: localStorage.getItem('content'),
      list: [],
      havejob: false
    }
  },
  mounted () {
    this.getJob()
  },
  methods: {
    findDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },
    getJob () {
      fetch
        .findJob(this.content.toLowerCase())
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data.recruitList.length !== 0) {
                this.list = res.data.data.recruitList
                this.havejob = true
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
