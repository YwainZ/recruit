<template>
<div>
<el-button class="checkBtn" @click="checkDetail()">查看简历</el-button>
<div v-if="showDetail">
 <resume-detail :resume-list="this.resumeList"></resume-detail>
</div>
  <div v-if="!showDetail">
    <div class="resumeHead" v-if="edit">
      <span>创建简历让更多的人发现你</span>
      <el-button  @click="()=>{edit = false}" class="createResume">新建简历</el-button></div>
    <div>
    <el-card v-if="edit" class="resumeInfo" >
      <p v-if="haveResume" >个人简历-{{resumeList.name}}</p>
      <p class="noresume" v-if="!haveResume">暂时没有简历</p>
    </el-card>
    </div>
    <el-form v-if="!edit"  :model="resumeInfo" status-icon :rules="resumerules" ref="resumeInfo" label-width="100px" class="demo-ruleForm">
      <el-button @click="()=>{edit=true}" class="back">返回</el-button>
  <el-form-item label="姓名" prop="username">
    <el-input  v-model="resumeInfo.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="man">
      <el-select v-model="resumeInfo.man" placeholder="请选择性别">
      <el-option label="男" value="true"></el-option>
      <el-option label="女" value="false"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="年龄" prop="age">
    <el-input v-model="resumeInfo.age" ></el-input>
  </el-form-item>
  <el-form-item label="地址" prop="address">
    <el-input v-model="resumeInfo.address"></el-input>
  </el-form-item>
  <el-form-item label="我的简介" prop="introduce">
    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeInfo.introduce"></el-input>
  </el-form-item>
  <el-form-item label="毕业年份" prop="endTime">
    <el-input v-model.number="resumeInfo.endTime"></el-input>
  </el-form-item>
  <el-form-item label="学校" prop="school">
    <el-input v-model="resumeInfo.school"></el-input>
  </el-form-item>
    <el-form-item label="手机号" prop="phone">
    <el-input v-model="resumeInfo.phone"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="resumeInfo.email"></el-input>
  </el-form-item>
    <el-form-item label="技术栈" prop="skill">
    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"  v-model="resumeInfo.skill"></el-input>
  </el-form-item>
  <el-form-item label="工作(实习)经历" prop="experience">
    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"  v-model="resumeInfo.experience "></el-input>
  </el-form-item>
    <el-form-item label="获奖经历" prop="awards">
    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeInfo.awards"></el-input>
  </el-form-item>
  <el-form>
    <el-button @click="postResume('resumeInfo')">确定</el-button>
  </el-form>
</el-form>
  </div>
</div>
</template>
<style>
.el-form {
  width: 60%;
}
.el-form-item {
  text-align: center;
}
.el-button .el-submit {
  margin-left: 1rem;
}
.el-select {
  width: 100%;
}
.noresume {
  font-size: 18px;
  color: #909399;
}
.resumeInfo {
  text-align: left;
  height: 5rem;
  border-left: 5px solid #36bba6;
}
.back {
  position: relative;
  left: 20rem;
  top: 2.5rem
}
.createResume {
  position: relative;
  left: 16rem;
}
.resumeHead {
  width: 100%;
  border: 1px solid #ededed;
  background: #f4f4f4;
  padding: 1.5rem;
}
.checkBtn {
  position: relative;
  top: 9.5rem;
  left: 22rem;
}
</style>

<script>
import fetch from "../api/fetch"
import resumeDetail from "../components/resumeDetai.vue"
export default {
  props: ["userId"],
  data() {
    var checkusername = (rule, value, callback) => {
      if (!value) {
        console.log("username", value)
        return callback(new Error("昵称不能为空"))
      } else {
        callback()
      }
    }
    var checksex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("性别不能为空"))
      } else {
        callback()
      }
    }
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("简介不能为空"))
      } else {
        callback()
      }
    }
    var checkendTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("毕业年份不能为空"))
      } else {
        callback()
      }
    }
    var checkschool = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学校不能为空"))
      } else {
        callback()
      }
    }
    var checkexperience = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("经历不能为空"))
      } else {
        callback()
      }
    }
    var checkaddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地址不能为空"))
      } else {
        callback()
      }
    }
    var checkage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"))
      } else {
        callback()
      }
    }
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"))
      } else {
        callback()
      }
    }
    var checkemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"))
      } else {
        callback()
      }
    }
    var checkskill = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("技能不能为空"))
      } else {
        callback()
      }
    }
    var checkaward = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("获奖不能为空"))
      } else {
        callback()
      }
    }
    return {
      resumeList:[],
      edit: true,
      haveResume: false,
      showDetail: false,
      value: "",
      resumeInfo: {
        address: "",
        username: "",
        man: "",
        introduce: "",
        age: "",
        avatar: "",
        awards: "",
        email: "",
        endTime: "",
        experience: "",
        phone: "",
        school: "",
        skills: [
          {
            id: 0,
            level: 0,
            name: "",
            resumeId: 0
          }
        ]
      },
      resumerules: {
        username: [{ validator: checkusername, trigger: "blur" }],
        man: [{ validator: checksex, trigger: "blur" }],
        address: [{ validator: checkaddress, trigger: "blur" }],
        introduce: [{ validator: checkintroduce, trigger: "blur" }],
        endTime: [{ validator: checkendTime, trigger: "blur" }],
        phone: [{ validator: checkphone, trigger: "blur" }],
        school: [{ validator: checkschool, trigger: "blur" }],
        age: [{ validator: checkage, trigger: "blur" }],
        email: [{ validator: checkemail, trigger: "blur" }],
        experience: [{ validator: checkexperience, trigger: "blur" }],
        awards: [{ validator: checkaward, trigger: "blur" }]
      }
    }
  },
  mounted() {
    console.log('userid', this.userId)
    if(!this.userId){
        this.userId = 1;
    }
    this.getResume(this.userId)
  },
  methods: {
    postResume(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          fetch(this.resumeInfo)
            .then(res => {
              console.log("上传成功", res)
            })
            .catch(e => {
              console.log(e)
            });
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    getResume(userId) {
      fetch
        .getResume(userId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data !== null) {
                this.haveResume = true
                this.resumeList = res.data.data
                console.log('res',res.data.data)
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        });
    },
    checkDetail() {
      console.log('showDetail');
      this.showDetail = !this.showDetail
    }
  },
  components: {
    resumeDetail
  }
};
</script>

