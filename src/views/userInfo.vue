<template>
<div>
<my-menu></my-menu>
 <div class="wrapper">
<el-card class="box-card">
  <div>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524249513799&di=a5b524befcd72c0b088bffbb1673806c&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-8%2F201708281546438994444.png">
    <span class="username">{{username}}</span>
  </div>
</el-card>
<el-tabs type="border-card" tabPosition="left" style="height: 700px;">
  <el-tab-pane >
    <span slot="label">个人信息<i class="el-icon-arrow-right"></i></span>
    <user :username="username" :sex="sex" :address='address' :introduce='introduce' :endTime='endTime'  :education="this.education" :school='school' :intentionCompany='intentionCompany' :intentionJob='intentionJob' :isEdit="isEdit"></user>
    <el-button class='editor' @click="changeEdit">{{btnText}}</el-button>
  </el-tab-pane>
  <el-tab-pane >
    <span slot="label">我的简历<i class="el-icon-arrow-right"></i></span>
    <my-resume :user-id="this.userId"></my-resume>
  </el-tab-pane>
   <el-tab-pane >
    <span slot="label">投递记录<i class="el-icon-arrow-right"></i></span>
   <delivery></delivery>
  </el-tab-pane>
   <el-tab-pane >
    <span slot="label">设置<i class="el-icon-arrow-right"></i></span>
   <setting></setting>
  </el-tab-pane>
</el-tabs>
 </div>
 </div>
</template>
<style>
html * {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.text {
  font-size: 14px;
}

.item {
  padding: 1.2rem 0;
}

.box-card {
  width: 70%;
  margin: 1rem 15% auto 15%;
}

.box-card img {
  border-radius: 50%;
  width: 8%;
  float: left;
  margin-bottom: 1rem;
}

.button {
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  background: #36bba6;
  float: right;
  margin: 0.5rem 5rem auto auto;
}
.editor {
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  background: #36bba6;
  float: right;
  margin: 1rem 5rem auto auto;
}

.el-card .username {
  float: left;
  margin-left: 1rem;
  font-size: 1.3rem;
}
.el-tabs {
  width: 70%;
  margin: 1rem 15% auto 15%;
  height: 100%;
}

.editor {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<script>
import fetch from "../api/fetch";
import Info from "../components/userInfo";
import Resume from "../components/resume";
import Delivery from "../components/delivery";
import Setting from "../components/setting";
import menu from "../components/common/menu";
import userInfoVue from '../components/userInfo.vue';
export default {
  data() {
    return {
      userId:1,
      activeIndex2: "1",
      username: "",
      nickname: "",
      sex: "",
      address: "",
      introduce: "",
      endTime: "",
      education: "",
      school: "",
      intentionCompany: "",
      intentionJob: "",
      isEdit: false,
      btnText: "编辑"
    };
  },
  mounted() {
    this.getUserInfo();
  },
  components: {
    user: Info,
    myResume: Resume,
    delivery: Delivery,
    setting: Setting,
    "my-menu": menu
  },
  methods: {
    getUserInfo() {
      fetch
        .getUserInfo()
        .then(res => {
          console.log("用户信息", res.data.data);
          let arr = res.data.data;
          this.username = arr.username;
          this.nickname = arr.nickname;
          this.sex = arr.man;
          this.address = arr.address;
          this.introduce = arr.introduce;
          this.endTime = arr.endTime;
          this.education = arr.education;
          this.school = arr.school;
          this.intentionCompany = arr.intentionCompany;
          this.intentionJob = arr.intentionJob;
          this.userId = arr.userId;
          localStorage.setItem("userId", this.userId)
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout() {
      fetch
        .logout()
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeEdit() {
      this.isEdit = !this.isEdit;
      if (this.isEdit === false) {
        this.btnText = "编辑";
      } else {
        this.btnText = "取消";
      }
    }
  }
};
</script>

