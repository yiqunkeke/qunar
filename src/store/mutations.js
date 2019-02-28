const mutations = {
  changeCity (state, city) {
    // 每一个mutations对应的参数也会有两个，第一个为state,第二个是外部传过来的city
    state.city = city
    // 改变本地存储
    try {
      localStorage.city = city
    } catch (e) {}
  }
}

export default mutations
