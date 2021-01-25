
import Ajax from './ajax'


export const saveSupplierApi = data => {
    return Ajax({
        method: 'POST',
        data,
        url: '/supplier/save'
    })
}

export const updateSupplierApi = data => {
    return Ajax({
        method: 'PUT',
        data,
        url: '/supplier/update'
    })
}

export const getSupplierApi = (name, page, size) => {
    return Ajax({
        params: {name, page, size},
        url: '/supplier/list'
    })
}

export const delSupplierApi = id => {
    return Ajax({
        method: 'DELETE',
        url: '/supplier/info/' + id
    })
}