<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) in pages" :key="index">
        <router-link class="icon" v-for="item in page" :key="item.id" :to="{path:'/ticket',query:{id:item.id,desc:item.desc}}">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl" />
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  props: {
    icons: Array
  },
  data: function () {
    return {
      swiperOption: {
        autoplay: false
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.icons.forEach(function (item, index) {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixins.styl'
  .icons >>> .swiper-container {
    width: 100%;
    height:0;
    padding-bottom: 50%;
  }
.icons{
  margin-top: .1rem;
}
  .icon{
    overflow: hidden;
    width: 25%;
    height: 0;
    float: left;
    padding-bottom: 25%;
    position: relative;
  }
  .icon-img{
    position: absolute;
    top: 0;
    left: 0;
    right:0;
    bottom: .44rem;
    box-sizing: border-box;
    padding: .1rem;
  }
  .icon-img-content{
    height:100% ;
    display: block;
    margin: 0 auto;
  }
  .icon-desc{
    position:absolute;
    left:0;
    right: 0;
    bottom: 0;
    height: .44rem;
    line-height: .44rem;
    color: $darkTextColor;
    text-align: center;
    ellipse()
  }
</style>
