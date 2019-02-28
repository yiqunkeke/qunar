import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: resolve => {
      require(['@/pages/home/Home'], resolve)
    },
    meta: {title: '首页'}
  },
  {
    path: '/city', // 将从这个路由跳转过去
    name: 'City', // 这里是路由的名字，建议大家每个路由都加一个名字，这样跳转的时候比较方便
    component: resolve => {
      require(['@/pages/city/City'], resolve)
    },
    meta: {title: '选择城市'}
  },
  {
    path: '/detail',
    name: 'Detail',
    component: resolve => {
      require(['@/pages/detail/Detail'], resolve)
    },
    meta: {title: '周末推荐详情页'}
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: resolve => {
      require(['@/pages/ticket/Ticket'], resolve)
    },
    meta: {title: '景点门票'}
  }
]

export default new Router({
  routes: constantRouterMap,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
