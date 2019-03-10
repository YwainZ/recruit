<template>
  <div>
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
            <img v-if="imageUrl"  class="avatar">
            <img v-else class="img" :src="setDefault">
          </el-upload>
          <span class="username">{{list ? list.nickname : ''}}</span>
        </div>
      </el-card>
      <el-tabs type="border-card" tabPosition="left" style="width:1000px;height: 100vh;margin: 14px auto auto auto;position: sticky">
        <el-tab-pane>
          <span slot="label">个人信息<i class="el-icon-arrow-right"></i></span>
          <user :list="list" :imageUrl="imageUrl" class="user"></user>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">我的简历<i class="el-icon-arrow-right"></i></span>
          <my-resume></my-resume>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">投递记录<i class="el-icon-arrow-right"></i></span>
          <delivery></delivery>
        </el-tab-pane>
        <el-tab-pane>
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
  .box-card {
    width: 1000px;
    margin: 14px auto auto auto;
  }
  .img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }
  .el-card .username {
    float: left;
    margin-left: 14px;
    font-size: 21px;
  }
  .avatar-uploader {
    float: left;
  }
  .avatar-uploader .el-upload {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-bottom: 14px;
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

<script>/* eslint-disable indent */

  import fetch from '../api/fetch'
  import Info from '../components/userInfo'
  import Resume from '../components/resume'
  import Delivery from '../components/delivery'
  import Setting from '../components/setting'

  export default {
    data () {
      return {
        activeIndex2: '1',
        btnText: '取消',
        list: {
          nickname: '',
          sex: '',
          address: '',
          introduce: '',
          endTime: '',
          education: '',
          school: '',
          intentionCompany: '',
          intentionJob: ''
        },
        imageUrl: '',
        head: {},
        refresh: 0
      }
    },
    computed: {
      setDefault () {
        return this.list.avatar ? this.list.avatar : 'https://upload-images.jianshu.io/upload_images/9381131-a48cdb07b37dcff1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      }
    },
    mounted () {
      this.head = {
        ContentType: 'application/json',
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
      this.getUserInfo()
      this.refresh = this.$route.params.refresh !== undefined ? this.$route.params.refresh : 0
    },
    watch: {
      refresh () {
        location.reload()
      }
    },
    components: {
      user: Info,
      myResume: Resume,
      delivery: Delivery,
      setting: Setting,
    },
    methods: {
      getUserInfo () {
        fetch
          .getUserInfo()
          .then(res => {
            this.list = res.data.data !== null ? res.data.data : this.list
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
