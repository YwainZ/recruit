<template>
  <div>
  <my-menu></my-menu>
  <el-card class="infocard" v-for="(item, key) in infoList" :key="key">
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
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import menu from "../components/common/menu";
import fetch from "../api/fetch";
export default {
  data() {
    return {
      infoList: [],
      dialogVisible: false,
      content: '',
      count:  localStorage.getItem("count"),
    };
  },
  components: {
    "my-menu": menu
  },
  mounted() {
    this.getMessage();
  },
  watch: {
    count() {
      location.reload()
    }
  },
  methods: {
    getMessage() {
      fetch
        .getMessage()
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.success === true) {
              this.infoList = res.data.data;
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    info(msg, num) {
      this.dialogVisible =true
      this.content = msg
      let info = {
        id: num,
        userId: localStorage.getItem('userId')
      }
      fetch.readMessage(info).then(res => {
        console.log("已读",res)
      }).catch(e => {
        console.log(e)
      })

    }

  }
};
</script>

<style>
.infocard {
  margin: 2% 15% auto 15%;
}
.infoTitle {
  text-align: center;
  line-height: 5rem;
  height: 5rem;
  margin: auto auto auto 5rem;
}
.infoTitle p {
  float: left;
  margin-top: 0.5rem;
}
.time {
  float: right;
  margin-top: -2rem;
}
.myMsg {
  margin-top: 1rem;
  font-size: 4rem;
  float: left;
  color: #5E9FA3
}
.haveRead {
  float: right;
  margin-top: -5rem;
}
</style>
