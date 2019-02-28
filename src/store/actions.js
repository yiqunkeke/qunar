const actions = {
  changeCity (ctx, city) {
    // 接受两个参数，第一个参数是上下文，第二个参数是传过来的数据
    // console.log(city)
    // 接受到了传递过来的数据以后，actions需要调用Mutations改变公用的数据
    // 我想action执行的时候去调用mutations，那么如何调用呢
    // actions要调用mutations，必须执行一个方法叫commit
    // 之所以actions里面的第一个参数是ctx，作用就是我们可以通过ctx帮助我们拿到commit这个方法
    ctx.commit('changeCity', city)
  }
}
export default actions
