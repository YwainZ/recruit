<template>
<div class="container">
  <div class="registerForm">
    <h3>登录leader招聘</h3>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button  @click="submitForm('ruleForm2')">hr登录</el-button>
    <el-button  @click="submitForm('ruleForm2')">求职登录</el-button>
  </el-form-item>
</el-form>
<span class="toRegister">没有账号？<span @click="toRegister">直接注册</span></span>
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
  width: 100%;
  height: 100%;
  border:1px solid #ededed;
  background: url('../assets/bgimg.jpg') no-repeat;
  background-size: 100% 100%;
}

.registerForm {
  background: rgba(255,255,255,0.8);
  border: 1px solid #ededed;
  width: 30%;
  height: 50%;
  margin: 10% 35% 25% 35%;
  box-shadow: 0px 5px 8px #888;
  border-radius: 8px;
}

.registerForm h3 {
  margin-top:25px;
  color: #36bba6;
}

.el-form {
  margin: 10% 10% 23% auto;
}

.el-button {
  border: 1px solid #36bba6;
  border-radius: 8px;
  color: #36bba6;
  margin-left: -50px;
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

.toRegister {
  color: #888;
  float: right;
  font-size: 14px;
  margin: -45px 35px auto auto;
}

.toRegister span {
  color:#36bba6;
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    var validUsername = (rule, value, callback) => {
      if (value === ""){
        callback(new Error("请输入用户名"));
      }else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm2: {
        pass: "",
        username:""
      },
      rules2: {
        username:[{validator: validUsername,trigger:'blur'}],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    toRegister() {
      this.$router.push({name: 'register'})
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

