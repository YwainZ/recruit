<template>
  <div>
    <div class="resumeHead" v-if="!haveResume">
      <span>创建简历让更多的人发现你</span>
      <el-button class="createResume" @click="dialogFormVisible = true">新建简历</el-button>
    </div>
    <el-card v-if="haveResume" class="resumeCard">
      <p>个人简历-{{resumeList.name}}</p>
      <el-button class="checkBtn" @click="resumeFormVisible = true">查看简历</el-button>
    </el-card>
    <el-dialog title="我的简历" :visible.sync="resumeFormVisible" class="myDialog">
      <div v-if="!isChange">
        <table border="1" cellspacing="0" style="border-color:#ededed" class="mytable">
          <tr>
            <td>姓名：</td>
            <td>{{this.tableList.name}}</td>
          </tr>
          <tr>
            <td>年龄：</td>
            <td>{{this.tableList.age}}</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{this.tableList.sex}}</td>
          </tr>
          <tr>
            <td>电话：</td>
            <td>{{this.tableList.phone}}</td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>{{this.tableList.email}}</td>
          </tr>
          <tr>
            <td>地址：</td>
            <td>{{this.tableList.address}}</td>
          </tr>
          <tr>
            <td>学校：</td>
            <td>{{this.tableList.school}}</td>
          </tr>
          <tr>
            <td>毕业时间：</td>
            <td>{{this.tableList.endTime}}</td>
          </tr>
          <tr>
            <td>技术栈：</td>
            <td>
          <tr v-for="(item, key) in this.tableList.skills" :key="key">
            <td class="progress">{{item.name}}</td>
            <td class="progress">熟悉程度：
              <el-progress :text-inside="true" :stroke-width="15" :percentage="item.level*25"></el-progress>
            </td>
          </tr>
          </td>
          </tr>
          <tr>
            <td>实习（工作）经历：</td>
            <td>{{this.tableList.experience}}</td>
          </tr>
          <tr>
            <td>自我介绍：</td>
            <td>{{this.tableList.introduce}}</td>
          </tr>
          <tr>
            <td>获奖经历：</td>
            <td>{{this.tableList.awards}}</td>
          </tr>
        </table>
        <el-button class="modBtn" @click="()=>{isChange = !isChange}">修改简历</el-button>
      </div>
      <el-form :model="resumeList" status-icon :rules="resumerules" ref="resumeInfo" label-width="100px"
               class="resumeInfoForm" v-if="isChange">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="resumeList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="resumeList.sex" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="resumeList.age"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="resumeList.address"></el-input>
        </el-form-item>
        <el-form-item label="我的简介" prop="introduce">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.introduce"></el-input>
        </el-form-item>
        <el-form-item label="毕业年份" prop="endTime" >
          <el-input v-model.number="resumeList.endTime"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="resumeList.school"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="resumeList.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resumeList.email"></el-input>
        </el-form-item>
        <el-form-item label="技术栈" prop="skills">
          <el-button @click="addSkill()" class="addbtn">添加</el-button>
          <div class="skillContain">
            <div v-for="(item, key) in resumeList.skills" :key="key">
              <input placeholder="技术" class="input" v-model="item.name"/>
              <select class="select" v-model="item.level">
                <option label="了解" value=1></option>
                <option label="熟悉" value=2></option>
                <option label="掌握" value=3></option>
                <option label="精通" value=4></option>
              </select>
              <i class="el-icon-error deleteIt" @click="deleteItem(key)"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="工作(实习)经历" prop="experience">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.experience "></el-input>
        </el-form-item>
        <el-form-item label="获奖经历" prop="awards">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.awards"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelChange">取消</el-button>
          <el-button type="primary" @click="changeResume('resumeInfo')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新建简历" :visible.sync="dialogFormVisible" class="myDialog">
      <el-form :model="resumeList" status-icon :rules="resumerules" ref="resumeInfo" label-width="100px"
               class="resumeInfoForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="resumeList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="resumeList.sex" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="resumeList.age"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="resumeList.address"></el-input>
        </el-form-item>
        <el-form-item label="我的简介" prop="introduce">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.introduce"></el-input>
        </el-form-item>
        <el-form-item label="毕业年份" prop="endTime">
          <el-select v-model="resumeList.endTime" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="resumeList.school"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="resumeList.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resumeList.email"></el-input>
        </el-form-item>
        <el-form-item label="技术栈" prop="skills">
          <el-button @click="addSkill()" class="addbtn">添加</el-button>
          <div class="skillContain">
            <div v-for="(item, key) in resumeList.skills" :key="key">
              <input placeholder="技术" class="input" v-model="item.name"/>
              <select class="select" v-model="item.level">
                <option label="了解" value=1></option>
                <option label="熟悉" value=2></option>
                <option label="掌握" value=3></option>
                <option label="精通" value=4></option>
              </select>
              <i class="el-icon-error deleteIt" @click="deleteItem(key)"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="工作(实习)经历" prop="experience">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.experience "></el-input>
        </el-form-item>
        <el-form-item label="获奖经历" prop="awards">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.awards"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelSubmit">取消</el-button>
          <el-button type="primary" @click="changeResume('resumeInfo')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
  .input {
    width: 45%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }
  .deleteIt {
    color: #dcdfe6;
    position: relative;
  }
  .deleteIt:hover {
    color: red;
  }
  .select {
    width: 45%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .mytable {
    width: 100%;
    margin: 0;
  }

  .progress {
    width: 182px;
    border: 0;
  }

  .modBtn {
    margin: 14px;
  }

  .resumeCard {
    width: 830px;
    text-align: left;
    height: 100px;
    border-left: 5px solid #888;
  }

  .createResume {
    position: relative;
    left: 224px;
  }

  .resumeHead {
    width: 100%;
    border: 1px solid #ededed;
    background: #f4f4f4;
    padding: 21px;
  }

  .checkBtn {
    position: relative;
    top: -22.4px;
    left: 680px;
  }

  .addbtn {
    position: relative;
    top: 40px;
    left: 280px;
  }

  .resumeInfoForm {
    width: 80%;
  }
  .myDialog {
    width: 1500px;
  }
</style>

<script>/* eslint-disable indent */

import fetch from '../api/fetch'

export default {
  data () {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'))
      } else {
        callback()
      }
    }
    var checksex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('性别不能为空'))
      } else {
        callback()
      }
    }
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('简介不能为空'))
      } else {
        callback()
      }
    }
    var checkendTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('毕业年份不能为空'))
      } else {
        callback()
      }
    }
    var checkschool = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学校不能为空'))
      } else {
        callback()
      }
    }
    var checkexperience = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('经历不能为空'))
      } else {
        callback()
      }
    }
    var checkaddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('地址不能为空'))
      } else {
        callback()
      }
    }
    var checkage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      } else {
        callback()
      }
    }
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    var checkemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        callback()
      }
    }
    var checkaward = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('获奖不能为空'))
      } else {
        callback()
      }
    }
    return {
      len: 0,
      tip: 0,
      isChange: false,
      dialogFormVisible: false,
      resumeFormVisible: false,
      resumeList: {
        userId: sessionStorage.getItem('userId'),
        address: '',
        name: '',
        sex: '',
        introduce: '',
        age: '',
        avatar: '',
        awards: '',
        email: '',
        endTime: '',
        experience: '',
        phone: '',
        school: '',
        skills: [
          {
            level: 0,
            name: ''
          }
        ]
      },
      tableList: [],
      haveResume: false,
      value: '',
      options: [
        {
          value: '2018',
          label: '2018'
        },
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        },
        {
          value: '2022',
          label: '2022'
        }
      ],
      resumerules: {
        name: [{validator: checkname, trigger: 'blur'}],
        sex: [{validator: checksex, trigger: 'blur'}],
        address: [{validator: checkaddress, trigger: 'blur'}],
        introduce: [{validator: checkintroduce, trigger: 'blur'}],
        endTime: [{validator: checkendTime, trigger: 'blur'}],
        phone: [{validator: checkphone, trigger: 'blur'}],
        school: [{validator: checkschool, trigger: 'blur'}],
        age: [{validator: checkage, trigger: 'blur'}],
        email: [{validator: checkemail, trigger: 'blur'}],
        experience: [{validator: checkexperience, trigger: 'blur'}],
        awards: [{validator: checkaward, trigger: 'blur'}]
      }
    }
  },
  mounted () {
    let userId = sessionStorage.getItem('userId')
    this.getResume(userId)
  },
  watch: {
    tip() {
      location.reload()
    }
  },
  methods: {
    cancelChange () {
      this.isChange = !this.isChange
    },
    cancelSubmit () {
      this.dialogFormVisible = false
    },
    deleteItem (key) {
      this.resumeList.skills.splice(key, 1)
    },
    changeResume (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.sendResume(this.resumeList).then(res => {
            if (res.status === 200) {
              if (res.data.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.tip++
                this.resumeFormVisible = false
                this.dialogFormVisible = false
                this.isChange = false
              }
            }
          }).catch(e => {
            console.log(e)
          })
        }
      })
    },
    getResume (userId) {
      fetch
        .getResume(userId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data !== null) {
                this.haveResume = true
                this.resumeList = res.data.data
                this.tableList = res.data.data
                this.len = res.data.data.skills.length
              } else {
                this.haveResume = false
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    addSkill () {
      let newskills = {
        id: 0,
        level: 0,
        name: '',
        resumeId: 0
      }
      this.resumeList.skills.push(newskills)
    }
  }
}
</script>
