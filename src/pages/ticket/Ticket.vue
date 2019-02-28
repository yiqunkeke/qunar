<template>
    <div class="wrapper">
      <Search v-show="isSearchShow"></Search>
      <Filters :AllClassic="AllClassic"></Filters>
      <List :ticketList="ticketList" @hideSearch="hideSearch" @showSearch="showSearch"></List>
    </div>
</template>

<script>
import Search from './components/Search'
import Filters from './components/Filters'
import List from './components/List'
export default {
  name: 'Ticket',
  data: function () {
    return {
      AllClassic: [],
      ticketList: [],
      isSearchShow: true
    }
  },
  components: { Search, Filters, List },
  methods: {
    getTicketInfo () {
      this.axios.get('/api/ticket.json')
        .then(this.getTicketInfoSucc)
    },
    getTicketInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.AllClassic = data.AllClassic
        this.ticketList = data.ticketList
      }
    },
    hideSearch () {
      this.isSearchShow = false
    },
    showSearch () {
      this.isSearchShow = true
    }
  },
  mounted () {
    this.getTicketInfo()
  }
}
</script>

<style scoped>
</style>
