<template>
  <div>
    <div class="item"
         v-for="(item, index) of categoryList"
         :key="index"
    >
      <div class="iconfont detail-list-icon">&#xe626;</div>
      {{item.title}}
      <div v-if="item.children">
        <detailList :categoryList="item.children"></detailList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailList',
  props: {
    categoryList: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl";
  .item{
    margin: .2rem;
  }
  .detail-list-icon{
    color:$bgColor;
    display: inline;
    position: relative;
    top:.03rem;
  }
</style>
