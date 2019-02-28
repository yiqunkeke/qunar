<template>
  <div :class="[wrapper,wrapper02]" ref="wrapper">
    <ul class="listWrapper">
      <li v-for="item in ticketList" :key="item.id">
        <div class="listTop clearfix">
          <div class="listImgWrapper">
            <img class="listImg" :src="item.imgUrl">
            <span :class="[listTag,listTagClass(item.tag)]" v-if="item.tag">{{item.tag}}</span>
          </div>
          <div class="listDetail">
            <h3 class="sightName">{{item.title}}</h3>
            <div class="sightComments">
              <span class="sightStarLevel">
                <span class="iconfont starLevelGain" :style="{width:item.starLevel}">&#xe610;&#xe610;&#xe610;&#xe610;&#xe610;</span>
                <span class="iconfont starLevelTotal">&#xe610;&#xe610;&#xe610;&#xe610;&#xe610;</span>
              </span>
              <span class="commentsTotalNum">{{item.commentsNum}}评论</span>
            </div>
            <div class="sightPriceCon">
              <div class="sightPrice">￥<em>{{item.lowestPrice}}</em><span>起</span></div>
              <div class="sightLocation">{{item.location}}</div>
            </div>
            <div class="sightTagList">
              <span :class="[sightTag, border, sightTagClass(innerItem)]"
                    v-for="(innerItem,index) in item.sightTag"
                    :key="index"
              ><em>{{innerItem}}</em></span>
            </div>
          </div>
        </div>
        <div class="sightTicketItem border-top" v-for="(innerItem,index) in item.tickets" :key="index">
          <a href="#">
            <h4 class="ticketName">{{innerItem.ticketsName}}</h4>
            <span class="ticketPrice">￥<em>{{innerItem.ticketsPrice}}</em></span>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'List',
  data: function () {
    return {
      sightTag: 'sightTag',
      border: 'border',
      listTag: 'listTag',
      wrapper: 'wrapper',
      wrapper02: ''
    }
  },
  props: {
    ticketList: Array
  },
  methods: {
    listTagClass (itemTag) {
      return itemTag === '明日可订' ? 'listTag02' : ''
    },
    sightTagClass (innerItem) {
      if (innerItem.indexOf('排名') !== -1) {
        return 'sightTag03'
      } else if (innerItem.indexOf('赠券') !== -1) {
        return 'sightTag01'
      } else {
        return 'sightTag02'
      }
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      mouseWheel: { // 类型：Boolean | Object    // 默认值：false     // 作用：这个配置用于 PC 端的鼠标滚轮，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启鼠标滚轮
        speed: 20,
        invert: false,
        easeTime: 300
      },
      scrollbar: { // 类型：Boolean | Object  // 默认值：false   //作用：这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条
        fade: true,
        interactive: false // 1.8.0 新增
      }
    })
    this.scroll.on('scrollStart', () => {
      this.$emit('hideSearch')
      this.wrapper02 = 'wrapper02'
    })
    this.scroll.on('scroll', (obj) => {
      if (obj.y >= 0) {
        this.$emit('showSearch')
        this.wrapper02 = ''
      }
    })
    this.scroll.on('touchEnd', (obj) => {
      if (obj.y >= -90) {
        this.$emit('showSearch')
        this.wrapper02 = ''
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.wrapper {
  position: absolute;
  top: 1.72rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #f5f5f5;
}
.wrapper02 {
  top:0.86rem;
}
.listWrapper li{
  background: #fff;
  margin-bottom:.2rem;
}
.listTop {
  padding:.2rem .22rem;
}
.listImgWrapper {
  position:relative;
  float:left;
}
.listImg{
  width:2rem;
  height 2rem;
}
.listTag{
  display:block;
  position: absolute;
  left:0;
  top:0;
  width: 1.04rem;
  height: .38rem;
  color: #fff;
  font-size: .2rem;
  line-height: .38rem;
  text-indent: .08rem;
  background: url('https://img1.qunarzz.com/piao/fusion/1802/20/2ba6d10b17972e02.png');
  background-size:100%; /*注意：设置background-size时，在前面必须先定义background 背景，否则不起作用*/
  background-repeat: no-repeat;
}
.listTag02 {
  background-image: url('https://img1.qunarzz.com/piao/fusion/1802/52/b9080e45b69b4f02.png')
  background-size:100%; /*注意：设置background-size时，在前面必须先定义background 背景，否则不起作用*/
  background-repeat: no-repeat;
}
.listDetail {
  padding-left:2.2rem;
}
.sightName {
  color:#212121;
  font-size .32rem;
  height .44rem;
  line-height .44rem;
  ellipse();
}
.sightComments {
  margin-top:.14rem;
  height: .34rem;
  line-height:.34rem;
}
.sightStarLevel {
  font-size:.08rem;
  position:relative;
  width:1.18rem;
  height:.28rem;
  display:inline-block;
}
.starLevelGain,.starLevelTotal {
  position:absolute;
  left:0;
  top:0;
  overflow:hidden;
  height:.28rem;
  letter-spacing: -.04rem;
  font-size:.28rem;
}
.starLevelGain {
  color:#ffb436;
  z-index:1;
}
.starLevelTotal {
  color:#ddd;
  z-index :0;
}
.commentsTotalNum {
  color:#616161;
  font-size:.24rem;
  position:relative;
  top:-0.04rem;
}
.sightPriceCon {
  margin-top:.18rem;
  position:relative;
}
.sightPrice {
  color:#ff8300;
  font-size:.2rem;
}
.sightPrice em{
  font-size:.4rem;
}
.sightPrice span {
  color:#616161;
  font-size:.24rem;
  margin-left:.05rem;
  vertical-align:.02rem; /*向上偏移量*/
}
.sightLocation {
  position:absolute;
  bottom:0;
  right:0;
  color:#616161;
  font-size:.24rem;
}
.sightTagList {
  margin-top:.18rem;
}
.sightTag {
  height:.32rem;
}
.sightTag em {
  display:inline-block;
  height: .336rem;
  font-size: .24rem;
  line-height: .336rem;
  transform: scale(.83);
}
.sightTag:not(:last-child) {
  margin-right: .02rem
}
.sightTag01{
  color: #ff8a00;
}
.sightTag02{
  color: #00afc7;
}
.sightTag03{
  background: #f0fbfd;
  color: #00bcd4;
}
.sightTag01::before {
  border-color: #fa0;
}

.sightTag02::before {
  border-color: #a5e4ec
}

.sightTag03::before {
  border-color: #f0fbfd
}
.sightTicketItem {
  position: relative;
  height: .96rem;
  margin-left: .2rem;
}
.sightTicketItem a{
  display:block;
}
.ticketName {
  margin-right: 1.4rem;
  height: .96rem;
  line-height: .96rem;
  color: #616161;
  font-size: .28rem;
  ellipse();
}
.ticketPrice {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: .2rem;
  width: 1.2rem;
  height: .96rem;
  color: #ff8300;
  font-size: .2rem;
  line-height: .96rem;
  text-align: right;
}
.ticketPrice em {
  font-size: .32rem;
}
</style>
