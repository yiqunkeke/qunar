<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg">
      <div class="banner-info">
        <div class="banner-title">{{mySightName}}</div>
        <div class="banner-number">
          <div class="iconfont banner-icon">&#xe626;</div>
          {{this.gallaryImgs.length}}
        </div>
      </div>
  </div>
    <CommonGallary
      :imgs="gallaryImgs"
      v-show="showGallary"
      @close="handleGallaryClose"
    ></CommonGallary>
    <button @click="handleLamp">跑马灯效果</button>
    <button @click="handleLampStop">停止</button>
  </div>
</template>

<script>
// 注意：在VM实例中，如果想要获取 data 上的数据，或者想要调用 methods 中的方法，必须通过 this.数据属性名  或  this.方法名  来进行访问，这里的this,就表示我们 new 出来的 VM 实例对象
import CommonGallary from 'common/gallary/Gallary'
export default {
  name: 'detailBanner',
  components: { CommonGallary },
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  data: function () {
    return {
      showGallary: false,
      // 由于 Vue中的单向数据流，所以不能直接修改props里的数据。
      // 如果必须修改，则可以在 data 里定义一个变量，把props里面的数据赋值给这个变量，那么 就可以使用data里面定义好的这个变量了
      // 缺陷：定义的这个变量，只能接受 props里的数据的初始值 ，当父组件要传递的值发生变化时，这个变量无法接收到最新值
      mySightName: this.sightName,
      intervalId: null // 在data上定义 定时器id
    }
  },
  // 解决办法是：使用变量储存prop的数据的初始值，并使用watch来观察prop的值的变化。发生变化时，更新变量的值
  watch: {
    sightName () {
      this.mySightName = this.sightName
    }
  },
  methods: {
    handleBannerClick: function () {
      this.showGallary = true
    },
    handleGallaryClose: function () {
      this.showGallary = false
    },
    handleLamp: function () {
      // 为了防止重复点击，多次调用定时器，所以需要判断下 intervalId是不是为null
      if (this.intervalId != null) return
      this.intervalId = setInterval(() => {
        // 截取到头的第一个字符
        let start = this.mySightName.substring(0, 1)
        // 截取到 后面的所有的字符
        let end = this.mySightName.substring(1)
        // 重新拼接得到新的字符串，并赋给 this.mySightName
        // 注意：VM实例，会监听自己身上 data 中所有数据的改变，只要数据一发生变化，就会自动把 最新的数据，从 data 上同步到页面中去；【好处：程序员只需要关心数据，不需要考虑如何重新渲染DOM】
        this.mySightName = end + start
      }, 400)
    },
    handleLampStop: function () {
      clearInterval(this.intervalId)
      // 每当清除了定时器之后，需要重新把 intervalId 赋值为 null
      this.intervalId = null
    }
  }
}
</script>

<style scoped lang="stylus">
  .banner{
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;
    position: relative;
  }
  .banner-img{
    width: 100%;
  }
  .banner-info{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: .6rem;
    color: #fff;
    background-image: linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.8));
  }
  .banner-title{
    flex: 1;
    font-size: .32rem;
    padding:0 .2rem;
  }
  .banner-number{
    height: .32rem;
    line-height: .32rem;
    padding:0 .4rem;
    border-radius: .2rem;
    background: rgba(0,0,0,.8);
    font-size: .24rem;
  }
  .banner-icon{
    display: inline;
    font-size: .24rem;
  }
  button{
    padding:0.2rem;
    border-radius 0.1rem;
    margin:0.1rem;
  }
</style>
