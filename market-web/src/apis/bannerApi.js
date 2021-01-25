import Ajax from './ajax'

export const saveBannerApi = data => {
    return Ajax({
        url: '/banner',
        data,
        method: 'POST'
    })
}

export const updateBannerApi = data => {
    return Ajax({
        url: '/banner',
        data,
        method: 'PUT'
    })
}

export const deleteBannerApi = id => {
    return Ajax({
        url: '/banner' + '/' + id,
        method: 'DELETE'
    })
}

export const getBannerApi = () => {
    return Ajax({
        url: '/banner'
    })
}