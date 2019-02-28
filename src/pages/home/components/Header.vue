<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>输入城市景点/游玩/主题
    </div>
    <router-link to="/city">
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe64a;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default{
  name: 'HomeHeader',
  computed: {
    // '...'是展开运算符
    ...mapState({
      // 下面的意思是把state里面的city,映射过来，叫city。并放在computed计算属性当中，那么我们就直接可以使用this.city来获得state里面的数据了
      city: 'city'
    }),
    ...mapGetters(['doubleCity'])
    // 可以通过{{this.doubleCity}}得到计算以后的公用数据
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
.header{
  line-height: $headerHeight;
  display: flex;
  background:$bgColor;
  color: #fff;
}
  .header-left {
    width: .64rem;
    float: left;
  }
  .back-icon{
    text-align: center;
    font-size: .4rem;
  }
  .header-input{
    flex: 1;
    background: #fff;
    border-radius: .1rem;
    margin-top: .12rem;
    margin-left: .2rem;
    height: 0.62rem;
    line-height: 0.62rem;
    color: #ccc;
    padding-left: .2rem;
  }
  .header-right{
    min-width: 1.04rem;
    padding: 0 .1rem;
    float: right;
    text-align: center;
    color: #fff;
  }
  .arrow-icon{
    font-size: .24rem;
    margin-left: .05rem;
  }
</style>
