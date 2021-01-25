// 引入axios库
import Axios from 'axios'

// 引入store对象
import Store from '../store'

// 引入router对象
import Router from '../router'

// 引入提示组件库
import { Message } from 'element-ui'

const Ajax = Axios.create({
    baseURL: window.BASE_URL
})

// 使用Axios的拦截器来实现用户token注入，拦截非法请求
// (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
Ajax.interceptors.request.use(config => {
    // 注入token
    let token = Store.getters['common/getToken']
    // 如果不是登录接口，需要有token标识，否则为非法请求
    if (config.url !== "/user/login") {
        console.log(token)
        if (!token) {
            Message.error('请求非法')
            return Promise.reject({code: 900, message: 'not pass'})
        } else {
            config.headers.token = token
            return config
        }
    } else {
        return config
    }
    // console.log(token, config)

    // return config
})

// 响应拦截
// (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>
Ajax.interceptors.response.use(response => {
    // console.log(response)
    let _d = response.data
    if (!_d) {
        Message.error('请求无响应')
    } else {
        if (_d.code === 403) {
            Message.error('用户登录失效，请重新登录')
            Router.push('/login')
        }
    }
    return response
})

/**
 * 
 */
export default req => {

    // let token = sessionStorage.getItem('user_token') || ''

    return new Promise(resolve => {
        Ajax({
            url: req.url,
            method: req.method || 'GET',
            data: req.data || {},
            params: req.params || {},
            onUploadProgress: req.cb, // (callback)
            // headers: {token}
        }).then(data => {
            resolve(data.data)
        }).catch(e => {
            resolve({code: 999, message: 'front end error'})
            // cosnole.log(e)
            // // 抛出一个错误到控制台
            // throw new Error('请求失败')
        })

        // Ajax.post('/user/login', {id, password})
        //     .then(data => {
        //         resolve(data.data)
        //     })
        //     .catch(e => {
        //         resolve({code: 999, message: 'front end error'})
        //         // cosnole.log(e)
        //         // // 抛出一个错误到控制台
        //         // throw new Error('请求失败')
        //     })
    })

    
}