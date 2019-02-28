<template>
  <div class="header border-bottom">
    <router-link class="header-left" to="/">
      <div class="iconfont back-icon">&#xe624;</div>
    </router-link>
    <input class="header-input" :value="desc" @keyup.enter="handleTest"/>
    <div class="header-right">
      搜索
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: function () {
    return {
      desc: ''
    }
  },
  methods: {
    handleTest () {
      alert('您按了回车')
    }
  },
  activated () {
    this.desc = this.$route.query.desc
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  .header{
    line-height: $headerHeight;
    display: flex;
    background:#fff;
    color: $darkTextColor;
    z-index:11;
    position:relative;
  }
  .header-left {
    width: .64rem;
    float: left;
  }
  .back-icon{
    text-align: center;
    font-size: .4rem;
    color $darkTextColor;
  }
  .header-input{
    flex: 1;
    background: #eee;
    border-radius: .3rem;
    margin-top: .12rem;
    margin-left: .2rem;
    height: 0.62rem;
    line-height: 0.62rem;
    color: $darkTextColor;
    padding-left: .2rem;
    text-align:center;
  }
  .header-right{
    min-width: 1.04rem;
    padding: 0 .1rem;
    float: right;
    text-align: center;
    color: $darkTextColor;
  }
  .arrow-icon{
    font-size: .24rem;
    margin-left: .05rem;
  }
</style>
