<template>
  <div>
    <CityHeader></CityHeader>
    <CitySearch :cities="cities"></CitySearch>
    <CityList :hotCities="hotCities" :cities="cities" :letter="letter"></CityList>
    <CityAlphabet :cities="cities" @change="handleLetterChange"></CityAlphabet>
  </div>
</template>

<script>
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
export default {
  name: 'City',
  components: { CityHeader, CitySearch, CityList, CityAlphabet },
  data: function () {
    return {
      hotCities: [],
      cities: {},
      letter: ''
    }
  },
  methods: {
    handleLetterChange (letter) {
      // console.log(letter)
      this.letter = letter
    },
    getCityInfo () {
      this.axios.get('/api/city.json')
        .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc (res) {
      // console.log(res)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.hotCities = data.hotCities
        this.cities = data.cities
      }
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
