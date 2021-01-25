import ajax from './ajax'



export const indexBannerUpload = data => {
    let fd = new FormData()
    fd.append('fileName', data[0])
    return ajax({
        method: 'POST',
        data: fd,
        url: '/file/upload/' + 'indexBanner'
    })
}