<template>
<div>
  <my-menu></my-menu>
<div>
<div class="cardBox">
 <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
        <img :src="item.img" class="boxImg">
      </el-carousel-item>
    </el-carousel>
</div>
<div class="wrapper-card">
  <div class="card" v-for="(item, key) in companyList" :key="key">
    <img :src="item.avatar" class="image" @click="getCompanyDetail(item.id)">
    <p style="margin-top: 10px">{{item.name}}|互联网</p>
  </div>
</div>
</div>
</div>
</template>
<style>
@import "../css/index.css";
.cardBox {
  width: 70%;
  margin: 2% 15% auto 15%;
  box-shadow: 0 2px 5px #888;
  border-radius: 6px;
}
.el-carousel {
  border-radius: 6px;
}
.cardBox:hover {
  transform: translateY(-5px);
  transition: 0.3s;
  box-shadow: 0px 5px 10px #888;
}
.wrapper-card {
  width: 70%;
  margin: 4% 15% auto 15%;
  margin-top: 40px;
}
.wrapper-card .card {
  border: 1px solid #ebebeb;
  width: 22%;
  height: 230px;
  float: left;
  margin: 14px;
  border-radius: 6px;
}
.wrapper-card .card:hover {
  transform: translateY(-5px);
  transition: 3ms;
  box-shadow: 5px 5px 10px #888;
}
.wrapper-card .image {
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 70%;
  margin-bottom: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
}
.boxImg {
  width: 100%;
  height: 100%;
}
</style>
<script>
import fetch from '../api/fetch'
import menu from '../components/common/menu'
export default {
  data () {
    return {
      crouselImg: [
        {img: 'https://sxsimg.xiaoyuanzhao.com/97/E8/9757C6F113FF8A98769B1B627EE7FDE8.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/EE/34/EEEDE091CD9D4B62098CEFC493BA8634.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/2E/62/2E25D1313CF3C38BD2DDA49E3B310462.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/FD/0C/FDBBBD21A98136E3054ADDD432A5020C.png'}

      ],
      activeIndex2: '1',
      currentDate: '完美',
      company: '',
      companyList: []
    }
  },
  mounted () {
    this.getCompany()
  },
  methods: {
    getCompany () {
      fetch.getCompany().then(res => {
        if (res.status === 200) {
          this.companyList = res.data.data.companyList
        }
      })
    },
    getCompanyDetail (id) {
      localStorage.setItem('companyId', id)
      this.$router.push({name: 'companyDetail'})
    }
  },
  components: {
    'my-menu': menu
  }

}
</script>
