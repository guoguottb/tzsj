<template>
  <div class="header">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in items" :key="index">
        <div class="swiper_item" @click="checkTitle(item.subs)">{{item.title}}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  props:{
    items:{
      type:Array,
      default:()=>{return []}
    }
  },
  name: "headerRouter",
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
    }
  },
  methods: {
    checkTitle(item){
      this.$emit('listItem',item)
    }
  },
  components: {swiper,swiperSlide}
};
</script>

<style lang="scss" scoped>
.swiper_item{
  flex: 1;
  line-height: 50px;
  font-size: 18px;
  color:#fff;
  box-sizing: border-box;
  padding:0 20px;
  cursor: pointer;
}
</style>