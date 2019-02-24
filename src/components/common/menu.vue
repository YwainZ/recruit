<template>
  <header>
    <div class="contain">
      <div>
        <span @click="redirect(1)" class="tab">首页</span>
        <span v-if="isHr" @click="changeStatus" class="tab">发布职位</span>
        <span v-if="isHr && !isShow" @click="redirect(6)" class="tab">个人中心</span>
        <span @click="redirect(2)" class="tab" v-if="!isHr && !isShow">个人中心</span>
        <span class="tab" v-if="!isHr"><el-input placeholder="搜索心仪的职位" style="width:18rem" v-model="content"
                                                 @change="getJob(content)"><i slot="prefix"
                                                                              class="el-input__icon el-icon-search"></i></el-input></span>
      </div>
      <div>
        <span @click="redirect(3)" class="tab" v-show="!isShow">
          <i class="el-icon-message" style="margin-right:0.3rem" @click="redirect(5)">
            </i>消息中心<span class="icon" v-show="count > 0" ref="icon">{{ count }}</span>
          </span>
        <span v-if="isShow">
          <span class="tab" @click="redirect(4)">登录</span>
          <span class="tab"  @click="toregister">注册</span>
        </span>
        <el-dialog title="发布职位" :visible.sync="publishvisible">
          <el-form :model="publishInfo" :rules="publishRules" ref='publishInfo'>
            <el-form-item label="职位名称" prop="title" class="jobinput">
              <el-input class="require" v-model="publishInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="职位介绍" prop="content" class="jobinput">
              <el-input type="textarea" rows="10" class="require" v-model="publishInfo.content"></el-input>
            </el-form-item>
            <el-form-item label="技术栈" prop="skillList">
              <el-button @click="addskill()" class="addbtn">添加</el-button>
              <div v-for="(item, key) in publishInfo.skillList" :key="key">
                <input placeholder="技术" class="requireinput" v-model="item.name"/>
                <select class="requireselect" v-model="item.weight">
                  <option label="了解" value=1></option>
                  <option label="熟悉" value=2></option>
                  <option label="掌握" value=3></option>
                  <option label="精通" value=4></option>
                </select>
                <i class="el-icon-error delete" @click="deleteItem(key)"></i>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="addjob('publishInfo')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <span v-if="!isShow" class="tab" @click="logout()" >退出登录</span>
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
    height: 60px;
    background: rgba(0,0,0,0.8);
  }
  .contain {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: auto;
    line-height: 60px;
    font-weight: 500;
  }
  .contain .tab{
    color: white;
    font-size: 16px;
    margin: 10px;
    padding: 6px;
    border-radius: 4px;
  }
  .icon {
    position: relative;
    background: red;
    font-size: 10px;
    border-radius: 50%;
    left: 0;
    top: -8px;
    padding: 0 5px;
    color: #fff;
  }

  .requireinput {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .requireselect {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .require {
    width: 80%;
  }

  .addbtn {
    position: relative;
    top: 40px;
    left: 280px;
  }

  .delete {
    color: #dcdfe6;
    position: relative;
    left: -10px;
  }

  .delete:hover {
    color: red;
  }

</style>
<script>/* eslint-disable standard/object-curly-even-spacing */

import fetch from '../../api/fetch'

export default {
  data () {
    var checktitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位名称不能为空'))
      } else {
        callback()
      }
    }
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位介绍不能为空'))
      } else {
        callback()
      }
    }
    var checkskill = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('技术要求不能为空'))
      } else {
        callback()
      }
    }
    return {
      index: 0,
      count: 0,
      amount: 0,
      websocket: null,
      publishInfo: {
        hrId: '',
        title: '',
        content: '',
        companyId: '',
        skillList: [
          {
            name: '',
            weight: 0
          }
        ]
      },
      publishvisible: false,
      isHr: false,
      content: '',
      companyList: [],
      msg: '',
      isShow: true,
      publishRules: {
        title: [{validator: checktitle, trigger: 'blur'}],
        content: [{validator: checkintroduce, trigger: 'blur'}],
        skillList: [{validator: checkskill, trigger: 'blur'}]
      }
    }
  },
  created () {
    this.initWs();
  },
  watch: {
    amount () {
      location.reload()
    }
  },
  mounted () {
    if (sessionStorage.getItem('userId')) {
      this.isShow = false
    }
    if (localStorage.getItem('role') === '1') {
      this.isHr = true
    }
  },
  methods: {
    initWs () {
      if (sessionStorage.getItem('userId') !== null) {
        if ('WebSocket' in window) {
          this.websocket = new WebSocket('ws://pf.stalary.com/push/ws/' + `${sessionStorage.getItem('userId')}`, [])
        } else {
          alert('浏览器不支持WebSocket')
        }
        this.websocket.onopen = this.openWS
        this.websocket.onmessage = this.receiveWSMessage
        this.websocket.onclose = this.closeWS
      }
    },
    openWS (e) {
      console.log('建立连接')
    },
    receiveWSMessage (e) {
      console.log('接收消息' + e.data)
      this.count = parseInt(e.data)
    },
    closeWS (e) {
      console.log('关闭连接')
    },
    redirect (num) {
      if (num === 1) {
        this.$router.push({name: 'index'})
      } else if (num === 2) {
        this.$router.push({name: 'userInfo'})
      } else if (num === 3) {
        this.$router.push({name: 'infoCenter'})
      } else if (num === 4) {
        this.$router.push({name: 'login'})
      } else if (num === 5) {
        this.$router.push({name: 'infoCenter'})
      } else if (num === 6) {
        this.$router.push({name: 'hrView'})
      }
    },
    toregister () {
        this.$router.push({name: 'register'})
    },
    getJob (value) {
      if (value !== null) {
        localStorage.setItem('content', value)
      }
      this.$router.push({name: 'search', params: {count: 1}})
    },
    logout () {
      fetch
        .logout()
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            sessionStorage.removeItem('userId')
            localStorage.removeItem('role')
            localStorage.removeItem('token')
            localStorage.removeItem('count')
            this.websocket.close()
            this.$router.push({name: 'login'})
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    addjob (formName) {
      this.publishvisible = false
      this.publishInfo.hrId = sessionStorage.getItem('userId')
      this.publishInfo.companyId = localStorage.getItem('companyId')
      this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.publishJob(this.publishInfo).then(res => {
            if (res.status === 200) {
              this.amount++
              this.$refs[formName].resetFields()
            }
          }).catch(e => {
            console.log(e)
          })
        }
      })
    },
    deleteItem (key) {
      this.publishInfo.skillList.splice(key, 1)
    },
    addskill () {
      let newskills = {
        weight: 0,
        name: ''
      }
      this.publishInfo.skillList.push(newskills)
    },
    changeStatus() {
      this.publishvisible = true
    }
  }
}
</script>
