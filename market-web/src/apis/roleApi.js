import Ajax from './ajax'

export const roleListApi = () => {
    return Ajax({
        url: '/role'
    })
}

export const addRoleApi = (data) => {
    return Ajax({
        method: 'POST',
        url: '/role',
        data
    })
}

export const updateRoleApi = (data) => {
    return Ajax({
        method: 'PUT',
        url: '/role',
        data
    })
}