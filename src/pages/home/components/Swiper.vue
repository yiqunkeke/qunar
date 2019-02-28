<template>
  <div class="wraper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl"/>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default{
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data: function () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    showSwiper: function () {
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.wraper >>> .swiper-pagination-bullet-active{
  background: #fff !important;
}
.wraper{
  height: 0;
  overflow: hidden;
  padding-bottom: 31.25%;
}
.swiper-img{
  width: 100%;
}

</style>
