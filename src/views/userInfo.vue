<template>
<div>
<my-menu></my-menu>
 <div class="wrapper">
<el-card class="box-card">
  <div>
<el-upload
  class="avatar-uploader"
  action="http://personfilter.clairezyw.com/user/avatar"
  name="avatar"
  :headers="head"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <img v-else  class="img" :src="list.avatar">
</el-upload>
    <span class="username">{{list.username}}</span>
  </div>
</el-card>
<el-tabs type="border-card" tabPosition="left" style="height: 1000px;">
  <el-tab-pane >
    <span slot="label">个人信息<i class="el-icon-arrow-right"></i></span>
    <user :list="list" :isEdit="isEdit"></user>
    <el-button class='editor' @click="changeEdit">{{btnText}}</el-button>
  </el-tab-pane>
  <el-tab-pane >
    <span slot="label">我的简历<i class="el-icon-arrow-right"></i></span>
    <my-resume></my-resume>
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

.img {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
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
.avatar-uploader {
  float: left;
}
.avatar-uploader .el-upload {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>

<script>
import fetch from "../api/fetch";
import Info from "../components/userInfo";
import Resume from "../components/resume";
import Delivery from "../components/delivery";
import Setting from "../components/setting";
import menu from "../components/common/menu";
import userInfoVue from "../components/userInfo.vue";
export default {
  data() {
    return {
      activeIndex2: "1",
      isEdit: false,
      btnText: "编辑",
      list: [],
      imageUrl: "",
      head: {}
    };
  },
  mounted() {
    this.head = {
      ContentType: "application/json",
      Authorization: "Basic " + localStorage.getItem("token")
    };
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
          this.list = res.data.data;
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

