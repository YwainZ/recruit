<template>
  <div class="container">
    <div class="registerForm">
      <h3>登录leader招聘</h3>
      <el-form :model="loginInfo" status-icon :rules="rules2" ref="loginInfo" label-width="100px" class="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginInfo.username" auto-complete="off" class="loginInput"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginInfo.password" auto-complete="off" class="loginInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: -2rem;" class="loginBtn" @click="submitForm('loginInfo')">登录</el-button>
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
    height: 60rem;
    border: 1px solid #ededed;
    background: url("../assets/bgimg.jpg") no-repeat;
    background-size: 100% 200%;
  }

  .registerForm {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #ededed;
    width: 30rem;
    height: 20rem;
    margin: 10% 35% 25% 35%;
    box-shadow: 0px 5px 8px #888;
    border-radius: 8px;
  }

  .registerForm h3 {
    margin-top: 25px;
    color: #36bba6;
  }

  .loginForm {
    position: relative;
    top: 1rem;
    left: -1rem;
    padding: 1rem
  }

  .el-input__inner:hover {
    border: 1px solid #36bba6;
  }

  .toRegister {
    color: #888;
    font-size: 14px;
    position: relative;
    left: 10rem;
  }

  .toRegister span {
    color: #36bba6;
    cursor: pointer;
  }

  .loginInput {
    width: 17rem
  }
</style>

<script>/* eslint-disable indent */

  import api from "../api/index";
  import axios from "axios";
  import fetch from "../api/fetch";

  export default {
    data () {
      var validUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }

      return {
        loginInfo: {
          password: '',
          username: ''
        },
        rules2: {
          username: [{validator: validUsername, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}]
        }
      }
    },
    methods: {
      toRegister () {
        this.$router.push({name: 'register'})
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            fetch
              .userLogin(this.loginInfo)
              .then(res => {
                if (res.status === 200) {
                  if (res.data.success === true) {
                    localStorage.setItem('token', res.data.data.token)
                    localStorage.setItem('companyId', res.data.data.companyId)
                    localStorage.setItem('role', res.data.data.role)
                    sessionStorage.setItem('userId', res.data.data.userId)
                    if (res.data.data.role === 2) {
                      this.$router.push({name: 'userInfo'})
                    } else {
                      this.$router.push({name: 'hrView'})
                    }
                  } else {
                    this.$message({
                      message: '用户名或密码错误',
                      type: 'warning'
                    })
                  }
                }
              })
              .catch(e => {
                console.log(e)
              })
          }
        })
      }
    }
  }
</script>
