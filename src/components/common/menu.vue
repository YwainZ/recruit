<template>
 <header>
  <div class="contain">
  <div>
  <span @click="redirect(1)" class="tab">首页</span>
  <span v-if="isHr" @click="publishvisible = true">发布职位</span>
  <span v-if="isHr" @click="redirect(6)">个人中心</span>
  <span @click="redirect(2)" class="tab"  v-if="!isHr">个人中心</span>
  <span class="tab" v-if="!isHr"><el-input placeholder="搜索心仪的职位" style="width:18rem"  v-model="content"  @change="getJob(content)"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input></span>
  </div>
  <div>
  <span @click="redirect(3)" class="tab"><i class="el-icon-message" style="margin-right:0.3rem" @click="redirect(5)"></i>消息中心</span><span class="icon">0</span>
  <span v-if="isShow">
  <span class="tab"><el-button class="menuBtn" @click="redirect(4)">登录</el-button></span>
  <span class="tab">
  <el-dropdown @command="register">
  <el-button  class="menuBtn">
  注册
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command=true>求职注册</el-dropdown-item>
    <el-dropdown-item command=false>招聘注册</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</span>
</span>
<el-dialog :visible.sync="publishvisible" title="发布职位">
  <el-form :model="publishInfo" :rules="publishRules" ref='publishInfo'>
   <el-form-item label="职位名称" prop="title" class="jobinput">
    <el-input class="require" v-model="publishInfo.title"></el-input>
   </el-form-item>
   <el-form-item label="职位介绍" prop="content" class="jobinput">
     <el-input type="textarea" rows="10" class="require" v-model="publishInfo.content"></el-input>
   </el-form-item>
    <el-form-item label="技术栈" prop="skillList">
       <el-button @click="addskill()" class="addbtn">添加</el-button>
        <div  v-for="(item, key) in publishInfo.skillList" :key="key">
      <input placeholder="技术" class="requireinput" v-model="item.name"/>
      <select  class="requireselect" v-model="item.weight">
      <option label="了解" value=1></option>
      <option label="熟悉" value=2></option>
      <option label="掌握" value=3></option>
      <option label="精通" value=4></option>
  </select>
    <i class="el-icon-error"  @click="deleteItem(key)"></i>
      </div>
  </el-form-item>
   <el-form-item>
     <el-button @click="addjob('publishInfo')">确定</el-button>
   </el-form-item>
  </el-form>
</el-dialog>
<span v-if="!isShow" class="tab"><el-button class="menuBtn" @click="logout()">退出登录</el-button></span>
   </div>
  </div>
 </header>
</template>
<style>
html * {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
header {
  width: 100%;
  height: 3.5rem;
  background: #36bba6;
}
.contain {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 0 15% auto 15%;
  text-align: center;
  line-height: 3.5rem;
  color: white;
}
.contain .tab {
  margin: 0.5rem;
}
.menuBtn {
  border-radius: 8px;
  color: white;
  background: #36bba6;
}
.icon {
  position: relative;
  background: red;
  font-size: 6px;
  border-radius: 50%;
  left: -0.8rem;
  top: -0.5rem;
  padding: 0 5px;
}
 .requireinput {
  width: 35%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: 0;
  background: #fff;
  padding: 0 15px;
  margin: auto 0.8rem 1rem auto;
}
.requireselect {
  width: 35%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: 0;
  background: #fff;
  padding: 0 15px;
  margin: auto 0.8rem 1rem auto;
}
.require {
  width: 80%;
}
.addbtn {
  position: relative;
  top: 2.5rem;
  left: 17.5rem;
}
.el-icon-error {
  color: red;
  position: relative;
}

</style>

<script>
import fetch from "../../api/fetch";
export default {
  data() {
    var checktitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("职位名称不能为空"));
      } else {
        callback();
      }
    };
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("职位介绍不能为空"));
      } else {
        callback();
      }
    };
    var checkskill = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("技术要求不能为空"));
      } else {
        callback();
      }
    };
    return {
      index: 0,
      publishInfo: {
        hrId: "",
        title: "",
        content: "",
        companyId: "",
        skillList: [
          {
            name: "",
            weight: 0
          }
        ]
      },
      publishvisible: false,
      isHr: false,
      content: "",
      companyList: [],
      msg: "",
      isShow: true,
      publishRules: {
        title: [{ validator: checktitle, trigger: "blur" }],
        content: [{ validator: checkintroduce, trigger: "blur" }],
        skillList: [{ validator: checkskill, trigger: "blur" }]
      }
    };
  },
  created() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://cdn.goeasy.io/goeasy.js";
    document.body.appendChild(s);
    this.getChannel();
  },
  mounted() {
    var icon = document.getElementsByClassName("icon")[0];
    icon.innerHTML = localStorage.getItem("count");
    console.log('menu userId', localStorage.getItem('userId'))
    if (localStorage.getItem("userId")) {
      this.isShow = false;
    }
    if (localStorage.getItem("role") === 1) {
      this.isHr = !this.isHr;
    }
     if(icon.innerHTML == 0) {
        icon.style.display = 'none'
    }
  },
  methods: {
    redirect(num, flag) {
      if (num === 1) {
        this.$router.push({ name: "index" });
      } else if (num === 2) {
        this.$router.push({ name: "userInfo" });
      } else if (num === 3) {
        this.$router.push({ name: "infoCenter" });
      } else if (num === 4) {
        this.$router.push({ name: "login" });
      } else if (num === 5) {
        this.$router.push({ name: "infoCenter" });
      } else if (num === 6) {
        this.$router.push({ name: 'hrView'})
      }
    },
    register(command) {
      console.log("command", command);
      this.$router.push({ name: "register" });
      localStorage.setItem("isRegister", command);
    },
    getJob(value) {
      console.log("输入框", value);
      if (value !== null) {
        localStorage.setItem("content", value);
      }
      this.$router.push({ name: "test" });
    },
    getChannel() {
      console.log("userid", localStorage.getItem("userId"));
      var goEasy = new GoEasy({
        appkey: "BC-9e32a2089e08457399dfc6032fcaa294"
      });
      goEasy.subscribe({
        channel: localStorage.getItem("userId"),
        onMessage: function(message) {
          var icon = document.getElementsByClassName("icon")[0];
          console.log("icon", icon);
          if (message instanceof Object) {
            localStorage.setItem("count", message.content);
            icon.innerHTML = localStorage.getItem("count");
          } else {
            localStorage.setItem("count", message);
            icon.innerHTML = localStorage.getItem("count");
          }
        }
      });
    },
    logout() {
      fetch
        .logout()
        .then(res => {
          console.log("退出登录", res);
          if (res.status === 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            localStorage.setItem('userId', "")
            localStorage.setItem('role', "")
            this.$router.push({ name: "login" });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    addjob(formName) {
      this.publishvisible = false;
      this.publishInfo.hrId = localStorage.getItem("userId");
      this.publishInfo.companyId = localStorage.getItem("companyId");
      console.log("jobinfo", this.publishInfo);
      this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.publishJob(this.publishInfo).then(res => {
            console.log(res)
            if(res.status === 200){
               this.$message({
                 message: "发布成功",
                 type: "success"
               })
               this.publishvisible = false
               this.$refs[formName].resetFields();
            }
          }).catch(e => {
            console.log(e)
          })
        }
      });
    },
    deleteItem(key){
      this.publishInfo.skillList.splice(key,1)
    },
    addskill() {
       let newskills = {
        weight: 0,
        name: "",
      }
      this.publishInfo.skillList.push(newskills)
    }
  }
};
</script>
