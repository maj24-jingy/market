// 注释

// 引入vue
import Vue from 'vue'

// 引入vuex
import Vuex from 'vuex'

// 引入持久化库
import persistedState from 'vuex-persistedstate'

// 注册
Vue.use(Vuex)

// 通用的状态数据管理对象
import common from './common'

// 实例化
const store = new Vuex.Store({
    // 使用插件
    plugins: [persistedState({ storage: window.sessionStorage })],

    // 模块化管理状态
    modules: {
        // 注册通用状态数据管理器
        common,
        // 开发拆包
        // "common": {
        //     // 启用命名空间
        //     namespaced: true,
        //     state: {
        //         token: ''
        //     },
        //     getters: {
        //         getToken: state => state.token
        //     },
        //     actions: {
        //         // 定义一个设置token值的动作，第一个参数为action的形参store对象
        //         setToken({commit}, token) {
        //             commit('mutationToken', token)
        //         }
        //     },
        //     mutations: {
        //         mutationToken(state, token) {
        //             state.token = token
        //         }
        //     }
        // },
        // 产品状态管理
        "product": {

        }
    }

    // state: {
    //     token: ''
    // },
    // getters: {
    //     // getToken(state) {
    //     //     return state.token
    //     // }
    //     getToken: state => state.token
    // },
    // actions: {
    //     // 定义一个设置token值的动作，第一个参数为action的形参store对象
    //     // setToken(store, token) {
    //         // store.commit('mutationToken', token)
    //     setToken({commit}, token) {
    //         commit('mutationToken', token)
    //     }
    // },
    // mutations: {
    //     mutationToken(state, token) {
    //         state.token = token
    //     }
    // }
})

// 导出store定义
export default store