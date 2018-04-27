<template>
<div>
  <el-collapse>
  <el-collapse-item title="修改手机号" name="1">
    <el-form :model="phoneForm" status-icon :rules="phonerules" ref="phoneForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="手机号" prop="phone">
    <el-input  v-model="phoneForm.checkphone" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item >
    <el-button class="btn" @click="changePhone('phoneForm')">确定</el-button>
  </el-form-item>
</el-form>
  </el-collapse-item>
  <el-collapse-item title="修改密码" name="2">
  <el-form :model="passForm" status-icon :rules="passwordrules" ref="passForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="passForm.checkpass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="passForm.confirmPass" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item >
    <el-button class="btn"  @click="changePass('passForm')">确定</el-button>
  </el-form-item>
</el-form>
  </el-collapse-item>
  <el-collapse-item title="修改邮箱" name="3">
  <el-form :model="emailForm" status-icon :rules="emailrules" ref="emailForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="emailForm.checkemail" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button class="btn"  @click="changeEmail('emailForm')">确定</el-button>
  </el-form-item>
</el-form>
  </el-collapse-item>
  </el-collapse>
</div>
</template>
<style>
.el-collapse-item__header{
   margin-top: 1.5rem;
   font-weight: 0;
   font-size: 14px;
   color: #909399
}
.btn {
  position: relative;
  top: -4rem;
  left: 16rem;
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  background: #36bba6;
}
</style>

<script>
import fetch from '../api/fetch'
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
     var checkpass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
     var confirmPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入正确的密码"));
      } else {
        callback();
      }
    };
    var checkemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      phoneForm:{
        phone:""
      },
      passForm:{
        pass:"",
        checkpass:''
      },
      emailForm:{
        email:""
      },
      phonerules: {
        phone: [{validator: checkphone, trigger:'blur'}],
      },
      passwordrules:{
        pass: [{validator: checkpass, trigger:'blur'}],
        checkpass: [{validator: confirmPass, trigger:'blur'}],
      },
      emailrules: {
        email: [{validator: checkemail, trigger:'blur'}]
      }
    }
  },
  methods: {
    changePhone(formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.changePhone(this.phoneForm).then(res =>{
            console.log('1',res)
          }).catch(e =>{
            console.log(e)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
       changePass(formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.changePass(this.passForm).then(res =>{
            console.log('2',res)
          }).catch(e =>{
            console.log(e)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
       changeEmail(formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.changeEmail(this.emailForm).then(res =>{
            console.log('3',res)
          }).catch(e =>{
            console.log(e)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }

};
</script>

