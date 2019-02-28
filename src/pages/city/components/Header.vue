<template>
  <div class="header">
    <router-link to="/">
      <div class="iconfont header-back">&#xe624;</div>
    </router-link>
    城市选择
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl";
.header {
  height: $headerHeight;
  line-height: $headerHeight;
  text-align: center;
  color: #fff;
  overflow: hidden;
  background: $bgColor;
  font-size: .32rem;
  position: relative;
}
  .header-back {
    text-align: center;
    width: .64rem;
    font-size: .4rem;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
  }
</style>
