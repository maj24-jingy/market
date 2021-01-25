

import ProductList from '../pages/product/list'
import ProductEdit from '../pages/product/edit'
import ProductBanner from '../pages/product/banner'
import ProductRecommend from '../pages/product/recommend'
import ProductSupplier from '../pages/product/supplier'
import ProductVideo from '../pages/product/video'


export default [
    {path: '/product/list', component: ProductList, meta: {requireLogin: true}},
    {path: '/product/edit', component: ProductEdit, meta: {requireLogin: true}},
    {path: '/product/banner', component: ProductBanner, meta: {requireLogin: true}},
    {path: '/product/recommend', component: ProductRecommend, meta: {requireLogin: true}},
    {path: '/product/supplier', component: ProductSupplier, meta: {requireLogin: true}},
    {path: '/product/video', component: ProductVideo, meta: {requireLogin: true}},
]