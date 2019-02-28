<template>
  <div>
    <detailBanner
      :sightName="sightName"
      :bannerImg="bannerImg"
      :gallaryImgs="gallaryImgs"
    >
    </detailBanner>
    <detailHeader></detailHeader>
    <div class="content">
      <detailList :categoryList="categoryList"></detailList>
    </div>
  </div>
</template>

<script>
import detailBanner from './components/Banner'
import detailHeader from './components/Header'
import detailList from './components/List'
export default {
  name: 'Detail',
  components: { detailBanner, detailHeader, detailList },
  data: function () {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      categoryList: []
    }
  },
  methods: {
    getDetailInfo () {
      // 在发送ajax请求数据的时候，把url中的id传递给后台，来获取对应的ajax请求。在network中可以查看请求是否发送成功
      // axios.get('/api/detail.json?id=' + this.$route.params.id)
      // 上面这种字符串拼接的方式比较麻烦，我们可以换一种写法：
      this.axios.get('/api/detail.json', {// 前面只写接口名，后面加一个对象
        params: {
          id: this.$route.params.id
        }
      })
        .then(this.getDetailInfoSucc)
    },
    getDetailInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        // console.log(data)
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.categoryList = data.categoryList
      }
    }
  },
  mounted () {
    this.getDetailInfo()
  }
//  activated () {
//    this.getDetailInfo()
//  }
}
</script>

<style lang="stylus" scoped>
  .content {
    height: 80rem;
  }
</style>
