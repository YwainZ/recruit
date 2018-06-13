<template>
  <div class="deliveryWrap">
    <div v-if="!show" class="nofind">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png" style="margin: 0 auto">
      <p>暂时没有记录哦</p>
    </div>
    <div v-for="(item, index) in list" :key="index" v-if="show" @click="checkDetail(item.recruitId)">
      <el-card shadow="hover" class="deliverycard">
        <div class="resumeBox">
          <p>{{item.title}}</p>
          <p>投递时间{{item.time}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style>
  .deliveryWrap {
    height: 1000px;
    overflow: scroll;
  }

  .deliveryWrap::-webkit-scrollbar {
    display: none;
  }

  .resumeBox {
    display: flex;
    justify-content: space-between;
  }

  .deliverycard {
    margin-bottom: 14px;
    width: 100%;
    height: 100px;
    border-left: 5px solid #888;
  }

  .nofind p {
    font-size: 18px;
    color: #909399;
  }

  .nofind img {
    width: 350px;
    height: 280px;
    margin: 28px 28px auto auto;
  }
</style>

<script>
  import fetch from '../api/fetch'

  export default {
    data() {
      return {
        list: [],
        show: true
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      checkDetail(id) {
        localStorage.setItem('jobId', id)
        this.$router.push({name: 'jobInfo'})
      },
      getList() {
        fetch
          .deliveryList()
          .then(res => {
            if (res.status === 200) {
              if (res.data.data === null) {
                this.show = false
              } else {
                this.list = res.data.data.sendList ? res.data.data.sendList : []
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>
