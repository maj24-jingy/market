// 注释

// 引入axios库
// import Axios from 'axios'

// const Ajax = Axios.create({
//     baseURL: window.BASE_URL
// })

// 引入封装后的ajax请求方法
import Ajax from './ajax'

// 登录方法
export const loginApi = (id, password) => {
    return Ajax({
        url: '/user/login',
        method: 'POST',
        data: {id, password}
    })
}

// 文件上传接口
export const uploadApi = (file, cb) => {
    let form = new FormData()
    form.append('fileName', file)
    return Ajax({
        url: '/file/upload/testFile',
        method: 'POST',
        data: form,
        cb
    })
}



// 获取用户菜单接口
export const menuApi = () => {
    return Ajax({
        url: '/user/menu/list'
    })
}
export const getHotApi = () => {
    return Ajax({
        url: '/product/hot/top3'
    })
}

// 获取用户信息接口
export const userInfoApi = id => {
    return Ajax({
        url: '/user/' + id
    })
}
//用户接口
export const saveUserApi = data => {
    return Ajax({
        method: 'POST',
        data,
        url: '/user/save'
    })
}
export const getSalesApi = () => {
    return Ajax({
        url: '/product/sales/top7'
    })
}

export const updateUserApi = data => {
    return Ajax({
        method: 'PUT',
        data,
        url: '/user/' + data.id
    })
}

export const deleteUserApi = id => {
    return Ajax({
        method: 'DELETE',
        url: '/user/' + id
    })
}

export const userListApi = (name, page, size) => {
    return Ajax({
        url: '/user/info/list',
        params: {id: name, name, page, size}
    })
}
//部门接口
export const userDeptApi = () => {
    return Ajax({
        url: '/user/dept/info'
    })
}


//discount 优惠接口
export const getDiscountList = (userId, page, size) => {
    return Ajax({
        url: '/discount',
        params: {userId, page, size, type: 'vague'}
    })
}

//城市接口
export const userCityApi = id => {
    return Ajax({
        url: '/user/city/' + id
    })
}


//商品列表接口
export const getProductApi = (name, page, size) => {
    return Ajax({
        url: '/product/list',
        params: {name, page, size}
    })
}
export const deleteProductApi = id => {
    return Ajax({
        url: '/product/delete/' + id,
        method: 'DELETE'
    })
}