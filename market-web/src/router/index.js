// 注释

// 引入Vue实例
import Vue from 'vue'
// 引入路由库
import Router from 'vue-router'
// 进行注册
Vue.use(Router)

// 统一捕捉我们的路由异常, this.$router.push('/login')({path: '/login'})
let pushFunc = Router.prototype.push
Router.prototype.push = function push(params) {
  // return pushFunc.call(this, params).catch(e => {console.error(e)})
  return pushFunc.call(this, params).catch(e => e)
}

// 引入状态管理器
import store from '../store'

// 引入登录组件
import Login from '../pages/home/Login'

// 引入首页组件
import Home from '../pages/home'

import NotFound from '../pages/common/NotFound'
import NotRight from '../pages/common/NotRight'



import User from './user'
import Product from './product'

// 定义所有路由配置对象
const routes = [
  // 任意一个系统都有一个默认路由，空路由重定向到默认路由
  {path: '', redirect: '/login'},
  // 任意一个路由都对应一个具体页面组件
  // 添加当前路由对应的布局，如果是主要布局，可以不写layoutName属性
  {path: '/login', component: Login, meta: {layoutName: 'blank-layout'}},
  // 动态路由，传递后的参数在route.params对象里边
  {path: '/home', component: Home, meta: {requireLogin: true}},
  // 页面不存在
  {path: '/not/found', component: NotFound, meta: {layoutName: 'blank-layout'}},
  // 用户没有权限
  {path: '/no/right', component: NotRight, meta: {layoutName: 'blank-layout'}},
  // 用户路由
  ...User,
  ...Product
]

const router = new Router({
// export default new Router({
  routes
})

// 钩子函数，有三个参数，常用于页面路由拦截，做权限控制
// 第一个参数是目的路由
// 第二个参数之前的路由
// 第三个是一个下一步函数，需要回调才能进行路由切换
router.beforeEach((to, from, next) =>  {
  // 用于判断用户是否登录的标识
  // let cache = sessionStorage.getItem('user_token')

  // let token = store.getters.getToken
  // 启用了命名空间
  console.log(store)

  // 第一个要判断路由是否存在
  let idx = routes.findIndex(oo => oo.path === to.path)
  if (idx < 0) {
    next('/not/found')
    return
  }

  // if (to.path === '/login' || to.path === '/not/found') {
  // 判断路由配置文件中是否有要求登录的标识，没有直接进入路由
  if (!to.meta.requireLogin) {
    next()
    return
  }

  let token = store.getters['common/getToken']
  // 用户登录过后，需要把token存储在vuex中
  if (!token) {
    next('/login')
    return
  }

  // 如果是首页直接进入
  if (to.path === '/home') {
    next()
    return
  }

  // 第二个要判断用户是否有权限访问这个页面
  let menuList = store.getters['common/getMenuList'],
    hasRole = false
  for (let i = 0;i < menuList.length;i ++) {
    for (let k = 0;k < menuList[i].children.length;k ++) {
        let menu = menuList[i].children[k]
        if (menu.path === to.path) {
            hasRole = menu.role !== ''
        }
    }
  }

  if (hasRole) {
    next()
  } else {
    next('/no/right')
  }
})

// 路由切换完成以后
router.afterEach((to, from) => {
  // console.log(to)
})

export default router