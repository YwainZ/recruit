<template>
  <div class="wrapper">
    <el-card  v-for="(item, key) in joblist" :key="key" class="mycard">
      <p class="myflex">{{item.title}}</p>
      <el-button class="delbtn" @click="deletejob(item.id)">删除职位</el-button>
    </el-card>
  </div>
</template>
<script>
import fetch from "../../api/fetch"
export default {
  data(){
    return {
      joblist: [],
      count: 0
    }
  },
  mounted() {
    this.checkJob()
  },
  watch: {
    count() {
      location.reload();
    }
  },
  methods: {
    checkJob() {
      fetch.checkJob().then(res => {
        if(res.status === 200) {
             this.joblist = res.data.data
             console.log('joblist', this.joblist)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    deletejob (id) {
      fetch.deletejob(id).then(res => {
        if(res.status === 200){
          if(res.data.success){
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.count++;
          }
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

.mycard {
  border-left: 5px solid #36bba6;
  height: 5rem;
  margin-bottom: 1rem;
}
.myflex {
  float: left;
}
.delbtn {
  float: right;
}
</style>
