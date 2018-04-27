<template>
 <header>
  <div class="contain">
  <div>
  <span @click="redirect(1)" class="tab">首页</span>
  <span @click="redirect(2)" class="tab">个人中心</span>
  <span class="tab"><el-input placeholder="搜索心仪的职位" style="width:18rem" :fetch-suggestions="querySearch" v-model="content"  @blur="getJob(content)"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input></span>
  </div>
  <div>
  <span @click="redirect(3)" class="tab"><i class="el-icon-message" style="margin-right:0.3rem" @click="redirect(5)"></i>消息中心</span><span class="icon">0</span>
  <span class="tab"><el-button class="menuBtn" @click="redirect(4)">登录</el-button></span>
  <span class="tab">
  <el-dropdown @command="register">
  <el-button  class="menuBtn">
  注册
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="true">求职注册</el-dropdown-item>
    <el-dropdown-item command="false">招聘注册</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</span>
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
</style>

<script>
import fetch from "../../api/fetch";
export default {
  data() {
    return {
      content: "",
      companyList: [],
      msg: ""
    };
  },
  created() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://cdn.goeasy.io/goeasy.js";
    document.body.appendChild(s);
    this.getChannel()
  },
  mounted() {
    var icon = document.getElementsByClassName("icon")[0];
    icon.innerHTML = localStorage.getItem("count")
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
      }
    },
    register(command) {
      console.log("command", command);
      this.$router.push({ name: "register" });
      localStorage.setItem("isRegister", command);
    },
    getJob(value) {
      console.log("输入框", value);
      fetch
        .findJob("java")
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getChannel() {
      console.log("userid", localStorage.getItem("userId"))
      var goEasy = new GoEasy({
        appkey: "BC-9e32a2089e08457399dfc6032fcaa294"
      });
      goEasy.subscribe({
        channel: localStorage.getItem("userId"),
        onMessage: function(message) {
          var icon = document.getElementsByClassName("icon")[0]
          console.log('icon', icon)
          if(message instanceof Object){
               localStorage.setItem("count", message.content);
               icon.innerHTML = localStorage.getItem("count")
          }
          else {
            localStorage.setItem("count", message)
            icon.innerHTML = localStorage.getItem("count")
          }
        }
      });
    },
    querySearch(queryString, cb) {
      var companyList = this.companyList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return companyList => {
        return (
          companyList.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    }
  }
};
</script>
