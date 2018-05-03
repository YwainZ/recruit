<template>
  <div>
    <my-menu></my-menu>
    <el-card class="nojob" v-if="!havejob">暂时没有该岗位信息</el-card>
    <el-card v-if="havejob" v-for="(item, key) in list" :key="key" class="jobcard">
     <img class="jobavatar" :src="item.company.avatar"/>
     <div class="introduce">
       <p>{{item.recruit.content}}</p>
       <p>{{item.company.address}}<span>|</span>{{item.company.scale}}<span>|</span>{{item.company.type}}</p>
     </div>
    </el-card>
  </div>
</template>
<style>
.nojob {
  margin: 2% 15% auto 15%;
}
.jobcard {
  margin: 2% 15% auto 15%;
}
.jobavatar {
  float: left;
  width: 5rem;
  height: 4.5rem;
  margin-right: 1rem
}
.introduce {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.introduce p {
  margin-bottom: 1rem
}
</style>
<script>
import menu from "../components/common/menu";
import fetch from "../api/fetch";
export default {
  data() {
    return {
      content: localStorage.getItem("content"),
      list: [],
      havejob: false
    };
  },
  mounted() {
    console.log("content", this.content)
    this.getJob()
  },
  components: {
    "my-menu": menu
  },
  methods: {
    getJob() {
      fetch
        .findJob(this.content.toLowerCase())
        .then(res => {
          console.log("职位", res);
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data.recruitList.length !== 0) {
                this.list = res.data.data.recruitList;
                this.havejob = true;
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>


