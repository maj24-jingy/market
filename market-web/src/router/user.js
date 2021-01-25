// 注释

import UserList from '../pages/user/List'
import UserEdit from '../pages/user/Edit'
import UserRole from '../pages/user/Role'
import UserAddress from '../pages/user/Address'
import UserDiscount from '../pages/user/Discount'

export default [
    {path: '/user/list', component: UserList, meta: {requireLogin: true}},
    {path: '/user/edit', component: UserEdit, meta: {requireLogin: true}},
    {path: '/user/role', component: UserRole, meta: {requireLogin: true}},
    {path: '/user/address', component: UserAddress, meta: {requireLogin: true}},
    {path: '/user/discount', component: UserDiscount, meta: {requireLogin: true}},
]