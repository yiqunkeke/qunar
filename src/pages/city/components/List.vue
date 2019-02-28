<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{this.currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item in hotCities" :key="item.id" @click="handleCityClick(item.name)">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area"
           v-for="(alphabet, key) in cities"
           :key="key"
           :ref="key"
      >
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div class="item border-bottom" v-for="item in alphabet" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  watch: {
    letter: function () {
      // console.log(this.letter)
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        // console.log(element)
        this.scroll.scrollToElement(element) // 作用：滚动到指定的目标元素
      }
    }
  },
  methods: {
    handleCityClick: function (city) {
      // this.$store.dispatch('changeCity', city)
      // 意思是要派发一个名i字为changeCity给action，然后把city传过去
      // console.log(city)
      // 我们也可以省略中间的actions，直接去修改mutations
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      mouseWheel: { // 类型：Boolean | Object    // 默认值：false     // 作用：这个配置用于 PC 端的鼠标滚轮，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启鼠标滚轮
        speed: 20,
        invert: false,
        easeTime: 300
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl";
  .border-topbottom
    &:before
       border-color: #ccc;
    &:after
       border-color: #ccc;
  .border-bottom
    &:before
     border-color: #ccc;
    &:after
     border-color: #ccc;
  .list{
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
.title {
  line-height: .54rem;
  background: #eee;
  padding-left: .2rem;
  color: #666;
}
  .button-list{
    overflow: hidden;
    padding: .1rem .6rem .1rem .1rem;
  }
  .button-wrapper{
    width: 33.33%;
    float: left;
  }
  .button {
    padding:.1rem 0;
    margin: .1rem;
    text-align: center;
    border: .02rem solid #ccc;
    border-radius: .06rem;
  }
  .item-list{

  }
  .item {
    line-height: .76rem;
    padding-left: .2rem;
  }
</style>
