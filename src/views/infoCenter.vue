<template>
  <div>
  <my-menu></my-menu>
  <el-card class="infocard" v-for="(item, key) in infoList" :key="key">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524249513799&di=a5b524befcd72c0b088bffbb1673806c&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-8%2F201708281546438994444.png" class="infoavatar">
    <div class="introduce">
      <p>系统通知</p>
      <p>{{item.title}}...</p>
    </div>
      <p class="time">{{item.createTime}}</p>
  </el-card>
  </div>
</template>

<script>
import menu from "../components/common/menu";
import fetch from "../api/fetch";
export default {
  data() {
    return {
      infoList: []
    };
  },
  components: {
    "my-menu": menu
  },
  mounted() {
    this.getMessage();
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
    }
  }
};
</script>

<style>
.infocard {
  margin: 2% 15% auto 15%;
}
.introduce {
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto auto auto 5rem;
}
.time {
  float: right;
  margin-top: -3rem
}
.infoavatar {
  float: left;
  width: 3.8rem;
  height: 4rem;
}
</style>
