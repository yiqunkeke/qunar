<template>
  <div class="header">
    <router-link tag="div" to="/" class="header-abs" v-show="absShow">
      <div class="iconfont back-abs-icon">&#xe624;</div>
    </router-link>
    <div class="header-fixed"
         v-show="!absShow"
         :style="opacityStyle"
    >
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data: function () {
    return {
      absShow: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll: function () {
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.absShow = false
      } else {
        this.absShow = true
      }
    }
  },
  activated () {
    // 当我们对组件使用了keep-alive之后，这个组件会多出一个activated这样一个生命周期函数，
    // 它在每一次页面展示的时候会执行
    window.addEventListener('scroll', this.handleScroll)
    // 对scroll这个全局事件进行绑定
    // 意思是当监听到scroll事件时，去执行handleScroll这个方法
    // 并把这个事件绑定到了window这个全局对象上
  },
  deactivated () {
    // 与activated对应还有一个deactivated,
    // 它在页面即将被隐藏或者页面即将被替换成新页面的时候执行
    window.removeEventListener('scroll', this.handleScroll)
    // 对scroll这个全局事件进行解绑
    // 因为scroll这个事件是绑定在window这个全局对象上，如果不进行解绑，那么会对其他页面也会造成影响
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl";
  .header-abs{
    position: absolute;
    left: .2rem;
    top: .2rem;
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: .4rem;
    background: rgba(0, 0, 0, .8);
    text-align: center;
  }
  .back-abs-icon{
    color: #fff;
    font-size: .32rem;
  }

  .header-fixed {
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    color: #fff;
    overflow: hidden;
    background: $bgColor;
    font-size: .32rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .header-fixed-back {
    text-align: center;
    width: .64rem;
    font-size: .4rem;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
  }
</style>
