/***************************************************
 * created by deming.su on 2020-10-15 for components plugin file
 */

import BlankLayout from './layout/BlankLayout'
import MainLayout from './layout/MainLayout'
import PageLayout from './layout/PageLayout'
import {dateFormat} from '../util'

export default {
    install(Vue) {
        // 注册空白布局组件
        Vue.component('BlankLayout', BlankLayout)

        // 注册主要布局组件
        Vue.component('MainLayout', MainLayout)

        // 注册页面内容布局组件
        Vue.component('PageLayout', PageLayout)

        // 注册过滤器
        Vue.filter('dateFormat', function(val, arg1) {
            // console.log(arguments)
            // console.log('+++++++++++++++++++++++++++++')
            return dateFormat(arg1, val)
        })

        Vue.directive('dateFormat', {
            inserted(el, binding, vnode, oldVnode) {
                let format = ''
                if (binding.arg === 'df') format = 'MM月dd日'
                if (binding.arg === 'ydf') format = 'yyyy年MM月dd日'
                el.innerText = dateFormat(format, binding.value)
                // console.log(binding)
                // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            },
            bind: function() {
            },
            update(el, binding, vnode, oldVnode) {

            }
        })

        Vue.directive('focus', {
            inserted(el) {
                el.focus()
            }
        })
    }
}