// 引入Vue实例
import Vue from 'vue'

// 项目容器组件
import Index from './pages'

// 为了我们的样式能够顺利覆盖组件样式，所有组件样式需要在我们的样式引入之前引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入项目组件
import ModalComponent from './components'

// 注册组件
Vue.use(ModalComponent)

// 引入全局样式
import './styles/index.less'

// // 引入路由库
// import Router from 'vue-router'

// Vue.use(Router)

// // 引入登录组件
// import Login from './pages/home/Login'

// // 引入首页组件
// import Home from './pages/home'

// const router =  new Router({
//   routes: [
//     {path: '', redirect: '/login'},
//     {path: '/login', component: Login},
//     {path: '/home', component: Home}
//   ]
// })
// 引入路由配置文件
import router from './router'

// 引入状态管理器
import store from './store'

// 实例化Vue对象
new Vue({
  el: '#app',
  // router: router,
  router,
  store,
  // components: {MainLayout}, 不能全局使用
  data() {
    return {
      // 事件总线常用于：页面被渲染后，并且启动了监听才能监听广播的事件
      eventBus: new Vue()
    }
  },
  render(createElement) {
    let layoutName = this.$route.meta.layoutName || "main-layout"
    return createElement(Index, {
      // createElement方法的数据参数：组件属性对象
      props: {
        // layoutName: 'main-layout'
        layoutName
      }
    })
  }
})
Vue.config.productionTip = false