<template>
  <div>
    <el-card class="infocard" v-if="isShow">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png"/>
      <p>暂时没有消息哦</p>
    </el-card>
  <el-card class="infocard" v-for="(item, key) in infoList" :key="key" v-show="!isShow">
    <i class="el-icon-message myMsg" ></i>
    <div class="infoTitle" @click="info(item.content, item.id)">
      <p>{{item.title}}</p>
    </div>
   <p class="time">{{item.createTime}}</p>
     <el-tag v-if="item.readState" class="haveRead">已读</el-tag>
      <el-tag v-else type="warning" class="haveRead" >未读</el-tag>
  </el-card>
  <el-dialog  title="系统通知" :visible.sync="dialogVisible" width="30%" >
  <span>{{content}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirmClick">确定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import fetch from '../api/fetch'
import ElCard from '../../node_modules/element-ui/packages/card/src/main.vue'
export default {
  data () {
    return {
      num: 0,
      infoList: [],
      dialogVisible: false,
      content: '',
      isShow: true,
      count: localStorage.getItem('count')
    }
  },
  components: {
    ElCard,
  },
  mounted () {
    this.getMessage()
  },
  watch: {
    num () {
      location.reload()
    },
    count () {
      location.reload()
    }
  },
  methods: {
    confirmClick () {
      this.dialogVisible = false
      this.num++
    },
    getMessage () {
      fetch
        .getMessage()
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              this.infoList = res.data.data
              if (this.infoList.length !== 0) {
                this.isShow = false
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    info (msg, num) {
      this.dialogVisible = true
      this.content = msg
      let info = {
        id: num,
        userId: sessionStorage.getItem('userId')
      }
      fetch.readMessage(info).then(res => {
        console.log('已读', res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>
.infocard {
  width: 1000px;
  margin: 20px auto auto auto;
}
.infoTitle {
  text-align: center;
  line-height: 90px;
  height: 90px;
  margin: auto auto auto 70px;
}
.infoTitle p {
  float: left;
  margin-top: 8px;
}
.time {
  float: right;
  margin-top: -28px;
}
.myMsg {
  margin-top: 14px;
  font-size: 65px;
  float: left;
  color: #5E9FA3
}
.haveRead {
  float: right;
  margin-top: -70px;
}
</style>
