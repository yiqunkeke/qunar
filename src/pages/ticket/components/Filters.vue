<template>
  <div class="filter-wrapper">
    <div class="filters border-bottom">
      <div :class="[filterLeft,currentStyle]" @click="handleClassic">全部分类<span class="iconfont">&#xe87e;</span></div>
      <div class="filter-center">|</div>
      <div :class="[filterRight,currentStyle02]" @click="handleSort">推荐排序<span class="iconfont">&#xe87e;</span></div>
    </div>
    <div class="filter-layer">
      <div class="filter-inner-01 border-bottom" v-show="isLayerShow">
        <div class="layer-left" ref="layerLeft">
          <ul>
            <li v-for="(item, index) in AllClassic"
                :key="item.id"
                @click="handleSub(index)"
                :class="{ 'cur-bg': index == eq }">
                <img class="layer-icon" :src="item.icon" :alt="item.name"/>
                {{item.name}}
              <span class="layer-number">{{item.num}}</span>
            </li>
          </ul>
        </div>
        <div class="layer-right" ref="layerRight">
          <div>
            <ul>
              <li v-for="item in subChildren" :key="item.id" @click="handleShade">
                {{item.name}}
                <span class="layer-number">{{item.num}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="filter-inner-02 border-bottom" v-show="isLayerShow02">
        <ul>
          <li :class="[borderBottom,curBg = index == eq ? 'cur-bg': '']"
              v-for="(item, index) in sortArray"
              :key="index"
              @click="handleSortItem(index)"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="filter-shade" v-show="isLayerShow || isLayerShow02" @click="handleShade"></div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'Filters',
  props: {
    AllClassic: Array
  },
  data: function () {
    return {
      filterLeft: 'filter-left',
      filterRight: 'filter-right',
      isLayerShow: false,
      isLayerShow02: false,
      subChildren: [],
      eq: 0,
      currentStyle: '',
      currentStyle02: '',
      sortArray: ['推荐排序', '离我最近', '人气最高'],
      borderBottom: 'border-bottom',
      curBg: ''
    }
  },
  methods: {
    handleClassic () {
      // 切换显示隐藏下拉菜单，添加样式
      this.isLayerShow02 = false
      this.isLayerShow = !this.isLayerShow
      this.currentStyle02 = ''
      this.currentStyle = this.currentStyle === 'current-style' ? '' : 'current-style'
      this.$nextTick(() => { // 获取更新后的DOM
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.layerLeft, {
            mouseWheel: {
              speed: 20,
              invert: false,
              easeTime: 300
            }
          })
          this.scroll = new Bscroll(this.$refs.layerRight, {
            mouseWheel: {
              speed: 20,
              invert: false,
              easeTime: 300
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    handleSub (index) {
      // 根据不同的菜单，右侧渲染不同的子项
      this.subChildren = this.AllClassic[index].children
      this.eq = index
    },
    handleShade () {
      // 隐藏下拉菜单，恢复初始样式
      this.isLayerShow = false
      this.isLayerShow02 = false
      this.currentStyle = ''
      this.currentStyle02 = ''
      this.eq = 0
    },
    handleSort () {
      this.isLayerShow = false
      this.isLayerShow02 = !this.isLayerShow02
      this.currentStyle = ''
      this.currentStyle02 = this.currentStyle02 === 'current-style' ? '' : 'current-style'
    },
    handleSortItem (index) {
      this.handleShade()
      this.eq = index
    }
  },
  activated () {
    this.handleShade()
  }
}
</script>

<style scoped lang="stylus">
  @import '~styles/varibles.styl';
  .filter-wrapper {
    position:relative;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $headerHeight;
    line-height:$headerHeight;
    z-index:11;
    position:relative;
    background:#fff;
  }
  .filter-left{
    flex:5;
    text-align:center;
  }
  .filter-center {
    flex:1;
    text-align:center;
    color #eee;
    font-size:.4rem;
  }
  .filter-right{
    flex:5;
    text-align:center;
  }
  .filters .iconfont {
    position:relative;
    margin-left:.03rem;
    color #777;
    font-size:.12rem;
    display:inline-block;/*加上display:inline-block;*/
  }
  .filter-layer{
    z-index:11;
    position:absolute;
    left:0;
    top: $headerHeight;
    right:0;
  }
  .layer-left{
    float:left;
    width: 50%;
    height:4.8rem;
    overflow:hidden;
    background: #fff;
  }
  .layer-left li{
    height: .8rem;
    line-height:.8rem;
    border-bottom:1px solid #e6e9eb;
    padding-left:.3rem;
    padding-right:1rem;
    font-size .24rem;
    position:relative;
  }
  .layer-icon{
    width: .3 rem;
    height .3rem;
    margin-right: .05rem;
  }
  .layer-number{
    position: absolute;
    right:.2rem;
    color:#9e9e9e;
    width:.7rem;
    text-align:right;
  }
  .layer-right{
    float: right;
    width: 50%;
    background :#f1f1f1;
    height:4.8rem;
    overflow:hidden;
  }
  .layer-right li{
    height: .8rem;
    line-height:.8rem;
    border-bottom:1px solid #f1f1f1;
    padding-left:.3rem;
    padding-right:.5rem;
    font-size .24rem;
    position:relative;
  }
  .current-style{
    color: #00afc7;
  }
  .current-style .iconfont {
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
    /*加上display:inline-block;应该就可以了*/
    /*因为i现在是字体图形，而不是一张图，你可以把现在i 看成一个文字 ，你给文字加旋转样式肯定是没有效果的，可以给i外边套一层span；然后旋转span试试；或者直接把旋转属性加在a 标签上；也可以；亲测管用*/
  }
  .filter-shade {
    position: fixed;
    top: 0;
    right:0;
    left:0;
    bottom: 0;
    background: rgba(0,0,0,.45);
    z-index:10;
  }
  .filter-inner-02 li{
    height: .8rem;
    line-height:.8rem;
    text-align:center;
    background:#fff
  }
  .filter-layer .cur-bg {
    background:#f1f1f1
  }
</style>
