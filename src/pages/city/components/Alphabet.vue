<template>
  <ul class="list">
    <li class="item"
        v-for="item in letters"
        :key="item"
        :ref="item"
        @click="handleLetterClick"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters: function () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
      // [ "A", "B", "C" ]  for…in遍历对象循环出的是键名(key)
    }
  },
  data: function () {
    return {
      touchStatus: false,
      startY: 0, // 定义 startY 的初始值
      timer: null
    }
  },
  updated () {
    // updated 讲解：
    // 当页面刚加载的时候，cities 是一个空对象，所以 Alphabet 子组件里面什么东西都不会显示出来，
    // 当 ajax 获取到数据之后， cities 的值才发生变化，Alphabet 才被渲染出来。
    // 当你往 Alphabet 传的数据发生变化的时候，Alphabet 就会重新渲染，当 Alphabet 重新渲染之后， updated() 生命周期钩子就会被执行
    // 这个时候，页面上已经展示出了城市字母列表里所有的内容，这个时候，我们去获取字母 'A' 所在的 DOM 的 offsetTop 值，就没有任何问题
    this.startY = this.$refs['A'][0].offsetTop
    // 这里 startY 是字母 A 相对于父元素 ul 的垂直距离
    // this.$refs['A'] 获取到的是一个数组，加上 [0] 获取到的才是 DOM 元素
    // HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。
  },
  methods: {
    handleLetterClick: function (e) { // e 为事件对象
      // console.log(e.target.innerText)
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart: function () {
      this.touchStatus = true
    },
    handleTouchMove: function (e) {
      // console.log(e)
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // 为什么这里只能用箭头函数，用普通函数则会报错：原因是箭头函数中的this与上下文无关，而是取决于定义时的上下文
          // 原理是：获取当前移动手指所在字母，触发 change 事件，并把当前手指所在字母作为参数传递给父组件
          // clientY 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（客户区）的垂直坐标。 客户区指的是当前窗口。
          // touchY 是手指的当前字母相对于浏览器窗口距离 再减去顶部内容（ CityHeader 组件和 CitySearch 组件）的距离
          const touchY = e.touches[0].clientY - 84
          const index = Math.floor((touchY - this.startY) / 20) // index 为当前字母对应的下标，其中 20 是每个字母的高度
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd: function () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl";
  .list{
    position: absolute;
    right: 0;
    top: 1.58rem;
    bottom: 0;
    width: .4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item{
    line-height: .44rem;
    color: $bgColor;
  }
</style>
