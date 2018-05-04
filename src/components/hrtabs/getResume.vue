<template>
<div>
  <div v-if="!show" class="nofind">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png">
    <p>暂时没有记录哦</p>
  </div>
  <div v-for="(item, index) in list" :key="index" v-if="show" >
    <el-card shadow="hover" class="receiveBox">
      <div class="flex">
      <el-progress  :width="80" type="circle" :percentage="item.rate" color="#A6F6AF" class="circle" ></el-progress>
      <span class="pipei">简历匹配度</span>
      <p class="receiveInfo">收到{{item.name}}的{{item.title}}求职信息</p>
      <el-button  @click="getTableList(item.userId)" class="clickbtn">查看</el-button>
      </div>
      <p class="receive">{{item.time}}</p>
    </el-card>
    <el-dialog :title="getResumeList.name+'的简历'"   :visible.sync="getResumev">
    <table border="1" cellspacing="0"  style="border-color:#ededed" class="mytable">
    <tr> <td>姓名：</td><td>{{getResumeList.name}}</td> </tr>
    <tr> <td>年龄：</td><td>{{getResumeList.age}}</td> </tr>
    <tr> <td>性别：</td><td>{{getResumeList.sex}}</td> </tr>
    <tr> <td>电话：</td><td>{{getResumeList.phone}}</td> </tr>
    <tr> <td>邮箱：</td><td>{{getResumeList.email}}</td> </tr>
    <tr> <td>地址：</td><td>{{getResumeList.address}}</td> </tr>
    <tr> <td>学校：</td><td>{{getResumeList.school}}</td> </tr>
    <tr> <td>毕业时间：</td><td>{{getResumeList.endTime}}</td> </tr>
    <tr><td>技术栈：</td><td>
     <tr v-for="(item, key) in getResumeList.skills" :key="key">
    <td class="progress2">{{item.name}}</td><td class="progress2">熟悉程度：<el-progress :text-inside="true" :stroke-width="15"  :percentage="item.level*25"></el-progress></td>
     </tr></td>
     </tr>
    <tr> <td>实习（工作）经历：</td><td>{{getResumeList.experience}}</td> </tr>
    <tr> <td>自我介绍：</td><td>{{getResumeList.introduce}}</td> </tr>
    <tr> <td>获奖经历：</td><td>{{getResumeList.awards}}</td> </tr>
  </table>
    </el-dialog>
  </div>
</div>
</template>
<style>
.progress2{
  width: 13rem;
  border: 0;
}
.mytable {
  width: 100%;
  height: 50rem;
}
.clickbtn {
  height: 2.5rem;
  margin-top: 1rem
}
.pipei {
  position: relative;
  top: 5.5rem;
  left: -4.8rem;
}
.flex {
  display: flex;
  justify-content: flex-start;
}
.receiveInfo {
  margin: 2rem auto auto 1rem
}
.receive {
   position: relative;
   left: 20.5rem;
}
.receiveBox {
  margin-bottom: 1rem;
  width: 100%;
}
.nofind p{
  font-size: 18px;
  color: #909399;
}
.nofind img {
  width: 25rem;
  height: 20rem;
  margin: 2rem 2rem auto auto;
}
</style>

<script>
import fetch from '../../api/fetch'
export default {
  data() {
    return {
      getResumeList: {
        name: "",
        sex: "",
        age: "",
        skills: [
         {
         id: 1,
         name: "",
         level: "",
         resumeId: 1
       }
      ],
      school: "",
      address: "",
      endTime: 2019,
      phone: "",
      email: "",
      introduce: "",
      experience: "",
      awards: "",
      avatar: ""
      },
      list: [],
      show: true,
      getResumev: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetch.receiveResume().then(res => {
        console.log('he', res.data.data.receiveList)
        this.list = res.data.data.receiveList
      }).catch(e => {
        console.log(e)
      })
    },
    getTableList(id){
      this.getResumev = true;
       fetch
        .getResume(id)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data !== null) {
                 console.log("shuju", res.data.data)
                 this.getResumeList = res.data.data;
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
}
</script>
