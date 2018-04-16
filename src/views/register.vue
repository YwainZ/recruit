<template>
<div class="container">
  <div class="registerForm">
     <h3>注册leader招聘</h3>
    <el-form :model="registerInfo" status-icon :rules="rules2" ref="registerInfo" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
    <el-input type="text" v-model="registerInfo.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="registerInfo.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="registerInfo.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phone">
    <el-input v-model.number="registerInfo.phone"><template slot="append">发送验证码</template></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="registerInfo.email"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="hrSubmit('registerInfo')">hr注册</el-button>
    <el-button @click="finderSubmit('registerInfo')">求职注册</el-button>
  </el-form-item>
</el-form>
<span class="toLogin">已有账号?<span @click="toLogin">直接登录</span></span>
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
.container {
  border: 1px solid #ededed;
  width: 100%;
  height: 100%;
  background: url("../assets/bgimg.jpg") no-repeat;
  background-size: 100% 100%;
}

.registerForm {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ededed;
  width: 30%;
  height: 30%;
  margin: 10% 35% 25% 35%;
  box-shadow: 0px 5px 8px #888;
  border-radius: 8px;
}

.registerForm h3 {
  color: #36bba6;
  margin-top: 25px;
}

.el-form {
  margin: 10% 10% 20% auto;
}

.el-button {
  border: 1px solid #36bba6;
  border-radius: 8px;
  color: #36bba6;
}

.el-form-item__label {
  color: #36bba6;
}

.el-input-group__append {
  color: #36bba6;
}

.el-input__inner:hover {
  border: 1px solid #36bba6;
}

.toLogin {
  color: #888;
  font-size: 14px;
  float: right;
  margin: -40px 45px auto auto;
}

.toLogin span {
  color: #36bba6;
  cursor: pointer;
}
</style>

<script>
import axios from "axios";
import api from "../api/index";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerInfo.checkPass !== "") {
          this.$refs.registerInfo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerInfo: {
        password: "",
        checkPass: "",
        phone: "",
        username: "",
        email: ""
      },
      rules2: {
        username: [{ validator: validUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    hrSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

        }
      });
    },
    finderSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(JSON.stringify(this.registerInfo));
          axios
            .post(api.getUser(), JSON.stringify(this.registerInfo), {
              headers: {
                "Content-type": "application/json"
              }
            })
            .then(res => {
              if (res.status === "200") {
                if (res.data.success === true) {
                  localStorage.setItem({ token: res.data.data.data });
                  console.log("token", localStorage.getItem(token));
                  this.$router.push({ name: "login" });
                } else {
                  this.$message({
                    message: res.data.data.msg,
                    type: "warning"
                  });
                }
              }
              return true;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

