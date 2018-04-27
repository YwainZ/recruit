<template>
<div>
 <table v-if="!isEdit">
   <th> 个人信息</th>
   <tr>
     <td>昵称：</td>
     <td>{{username}}</td>
   </tr>
   <tr>
     <td>性别：</td>
     <td v-if="sex">男</td>
     <td v-else>女</td>
   </tr>
    <tr>
     <td>地址：</td>
     <td>{{address}}</td>
   </tr>
    <tr>
     <td>我的简介：</td>
     <td>{{introduce}}</td>
   </tr>
   <tr>
     <td>毕业年份：</td>
     <td>{{endTime}}</td>
   </tr>
   <tr>
     <td>学历：</td>
     <td>{{education}}</td>
   </tr>
   <tr>
     <td>学校：</td>
     <td>{{school}}</td>
   </tr>
   <tr>
     <td>我想去的公司：</td>
     <td>{{intentionCompany}}</td>
   </tr>
   <tr>
     <td> 我感兴趣的工作：</td>
     <td>{{intentionJob}}</td>
   </tr>
 </table>
 <el-form :model="userInfo" status-icon :rules="rules2" ref="userInfo" label-width="100px" class="demo-ruleForm" v-if="isEdit">
  <el-form-item label="昵称" prop="nickname">
    <el-input  v-model="userInfo.nickname" auto-complete="off" ></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="man">
      <el-select v-model="userInfo.man" placeholder="请选择性别">
      <el-option label="男" value="true"></el-option>
      <el-option label="女" value="false"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="地址" prop="address">
    <el-input v-model="userInfo.address" :placeholder="address"></el-input>
  </el-form-item>
  <el-form-item label="我的简介" prop="introduce">
    <el-input v-model="userInfo.introduce" :placeholder="introduce"></el-input>
  </el-form-item>
  <el-form-item label="毕业年份" prop="endTime">
     <el-select v-model="userInfo.endTime" placeholder="请选择毕业年份">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="学历" prop="education">
    <el-input v-model="userInfo.education" :placeholder="education"></el-input>
  </el-form-item>
  <el-form-item label="学校" prop="school">
    <el-input v-model="userInfo.school" :placeholder="school"></el-input>
  </el-form-item>
  <el-form-item label="我想去的公司" prop="intentionCompany">
    <el-input v-model="userInfo.intentionCompany" :placeholder="intentionCompany"></el-input>
  </el-form-item>
  <el-form-item label="感兴趣的工作" prop="job">
    <el-input v-model="userInfo.intentionJob" :placeholder="intentionJob"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
  </el-form-item>
</el-form>
 </div>
</template>
<style>
table{
  margin-left: 3rem
}
table th {
  padding: 0.8rem;
  text-align: left;
}
table tr td {
  padding: 0.8rem;
  text-align: left;
}
.el-form {
  width: 60%;
}
.el-form-item {
  text-align: center;
}
</style>

<script>
import fetch from "../api/fetch";
export default {
  props: [
    "username",
    "sex",
    "address",
    "introduce",
    "endTime",
    "education",
    "school",
    "intentionCompany",
    "intentionJob",
    "isEdit"
  ],
  data() {
    var checknickname = (rule, value, callback) => {
      if (!value) {
        console.log("check", value);
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    var checksex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("性别不能为空"));
      } else {
        callback();
      }
    };
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("简介不能为空"));
      } else {
        callback();
      }
    };
    var checkendTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("毕业年份不能为空"));
      } else {
        callback();
      }
    };
    var checkschool = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学校不能为空"));
      } else {
        callback();
      }
    };
    var checkcompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("公司不能为空"));
      } else {
        callback();
      }
    };
    var checkaddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地址不能为空"));
      } else {
        callback();
      }
    };
    var checkjob = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("工作不能为空"));
      } else {
        callback();
      }
    };
    var checkeducation = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(" 学历不能为空"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        nickname: "",
        man: "",
        address: "",
        introduce: "",
        endTime: "",
        education: "",
        school: "",
        intentionCompany: "",
        intentionJob: ""
      },
      rules2: {
        nickname: [{ validator: checknickname, trigger: "blur" }],
        man: [{ validator: checksex, trigger: "blur" }],
        address: [{ validator: checkaddress, trigger: "blur" }],
        introduce: [{ validator: checkintroduce, trigger: "blur" }],
        endTime: [{ validator: checkendTime, trigger: "blur" }],
        education: [{ validator: checkeducation, trigger: "blur" }],
        school: [{ validator: checkschool, trigger: "blur" }],
        intentionCompany: [{ validator: checkcompany, trigger: "blur" }],
        intentionJob: [{ validator: checkjob, trigger: "blur" }]
      },
      options: [
        {
          value: "2018",
          label: "2018"
        },
        {
          value: "2019",
          label: "2019"
        },
        {
          value: "2020",
          label: "2020"
        },
        {
          value: "2021",
          label: "2021"
        },
        {
          value: "2022",
          label: "2022"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        Object.assign(this.userInfo, {
          avatar:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524249513799&di=a5b524befcd72c0b088bffbb1673806c&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-8%2F201708281546438994444.png"
        });
        if (valid) {
          fetch
            .putUserInfo(this.userInfo)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

