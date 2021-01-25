

export const ROLE_COLUMNS = [
    {key: 'name', label: '角色名称', width: 220},
    {key: 'menu', label: '菜单', width: 220, toolTip: true},
    {key: 'remark', label: '角色备注'}
]

export const USER_COLUMNS = [
    {key: 'name', label: '用户姓名', width: 180},
    {key: 'sex', label: '用户性别', width: 90},
    {key: 'birthday', label: '用户生日', width: 220},
    {key: 'dept', label: '所属部门', width: 180},
    {key: 'address', label: '地址', toolTip: true}
]
//供应商
export const SUPPLIER_LIST_COLUMNS = [
    {label: '供应商编码', key: 'id', width: 200},
    {label: '供应商名称', key: 'name', width: 150},
    {label: '联系人', key: 'contact', width: 150},
    {label: '联系电话', key: 'phone', width: 150},
    {label: '地址', key: 'address'},
]


export const PRODUCT_LIST_COLUMNS = [
    {label: '商品名称', key: 'name', width: 150},
    {label: '商品价格', key: 'price', width: 130},
    {label: '优惠价格', key: 'discount', width: 130},
    {label: '开始预售时间', key: 'st', width: 150},
    {label: '销售结束时间', key: 'et', width: 150},
    {label: '供应商', key: 'supplier', width: 150},
    {label: '产地', key: 'place', width: 50},
    {label: '备注', key: 'remark', width: 150},
]
//youhui
export const DISCOUNT_LIST_COLUMNS = [
    {label: '编码', key: 'id', width: 200},
    {label: '用户编码', key: 'userId', width: 120},
    {label: '适用产品类型', key: 'productType'},
    {label: '结束日期', key: 'endDate'},
    {label: '金额', key: 'amount', width: 120},
    {label: '是否使用', key: 'hasUsed', width: 90}
]

//用户地址
export const ADDRESS_LIST = [
    {label: '地址编码', key: 'id', width: 150},
    {label: '用户编码', key: 'userId', width: 150},
    {label: '地市', key: 'city', width: 200},
    {label: '区县', key: 'county', width: 200},
    {label: '详情', key: 'detail'},
    {label: '操作', key: 'play', width: 200},
]

export const MUNE_LIST = [
    {
        index: 'index',
        name: '首页',
        icon: 'el-icon-s-home',
        children: [
            {index: 'index-01', path: '/home', name: '首页'}
        ]
    },
    {
        index: 'product',
        name: '商品管理',
        icon: 'el-icon-s-marketing',
        children: [
            {index: 'product-01', path: '/product/list', name: '商品列表', role: 'CRUD'},
            {index: 'product-02', path: '/product/edit', name: '商品编辑', role: 'CRUD'},
            {index: 'product-03', path: '/product/supplier', name: '供应商', role: 'CRUD'},
            {index: 'product-04', path: '/product/banner', name: '首页banner', role: 'CRUD'},
            {index: 'product-05', path: '/product/recommend', name: '商品推荐', role: 'CRUD'},
            {index: 'product-06', path: '/product/video', name: '商品视频', role: 'CRUD'}
        ]
    },
    {
        index: 'order',
        name: '订单管理',
        icon: 'el-icon-s-claim',
        children: [
            {index: 'order-01', path: '/order/list', name: '订单列表', role: 'CRUD'}
        ]
    },
    {
        index: 'user',
        name: '用户管理',
        icon: 'el-icon-s-custom',
        children: [
            {index: 'user-01', path: '/user/list', name: '用户列表', role: 'CRUD'},
            {index: 'user-02', path: '/user/edit', name: '用户编辑', role: 'RU'},
            {index: 'user-03', path: '/user/role', name: '用户角色', role: 'CRU'},
            {index: 'user-04', path: '/user/address', name: '用户地址', role: 'CRUD'},
            {index: 'user-05', path: '/user/discount', name: '用户优惠', role: 'CRUD'}
        ]
    }
]