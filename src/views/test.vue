<template>
  <div>
    <swiper>
       <swiper-slide><div class="fd_slide fd_slide1">I'm Slide 1</div></swiper-slide>
            <swiper-slide><div class="fd_slide fd_slide2">I'm Slide 2</div></swiper-slide>
            <swiper-slide><div class="fd_slide fd_slide3">I'm Slide 3</div></swiper-slide>
            <swiper-slide><div class="fd_slide fd_slide4">I'm Slide 4</div></swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
 components: {
            swiper,
            swiperSlide
        },
        data(){
            return {
                swiperOption: {
                   disableOnInteraction: false,
                    initialSlide:0,//设定初始化时slide的索引
                    direction:'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
                    loop: true,  //无限滚动
                    speed:true,//滑动速度
                    autoplay:100,//自动切换的时间间隔
                    onSlideChangeEnd: swiper => { //滑动之后回调函数
                        //切换结束时，告诉我现在是第几个slide
                        console.log('onSlideChangeEnd', swiper.realIndex)
                    }
                },
            }
        },
}
</script>
<style>
@import "swiper/dist/css/swiper.css";
  .fd_slide{
        height: 888px;
        width: 100%;
        background: red;
    }
    .fd_slide1{
        background: yellow;
    }
    .fd_slide2{
        background: red;
    }
    .fd_slide3{
        background: yellowgreen;
    }
    .fd_slide4{
        background: orange;
    }
</style>


