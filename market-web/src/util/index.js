
// yyyy年MM月dd日 hh小时mm分ss秒 2020.09
/**
 * 
 * @param {*} format 
 * @param {*} value 
 */
export const dateFormat = (format, value) => {
    let _d = !!value ? new Date(value) : new Date(),
        yyyy = _d.getFullYear(),
        MM = _d.getMonth() + 1,
        dd = _d.getDate(),
        hh = _d.getHours(),
        mm = _d.getMinutes(),
        ss = _d.getSeconds()
    
    MM = MM > 9 ? MM : `0${MM}`
    dd = dd > 9 ? dd : `0${dd}`
    hh = hh > 9 ? hh : `0${hh}`
    mm = mm > 9 ? mm : `0${mm}`
    ss = ss > 9 ? ss : `0${ss}`

    let res = {yyyy, MM, dd, hh, mm, ss}
    return format.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, a => res[a])
    // return format.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, function(a) {
    //     return res[a]
    // })
}




export const fileUpload = isMulti => {
    return new Promise(resolve => {
        let node = document.createElement('input')
        node.setAttribute('type', 'file')
        if (isMulti) node.setAttribute('multiple', 'multiple')
        node.setAttribute('style', 'display: block;width: 0;height: 0;overflow: hidden;')
        node.setAttribute('id', 'uploadFormNode')
        document.body.appendChild(node)
        node.addEventListener('change', () => {
            resolve(node.files)
            setTimeout(() => {
                document.body.removeChild(node)
            })
        })

        node.click()
    })
}