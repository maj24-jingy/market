
export default {
    // 启用命名空间
    namespaced: true,
    state: {
        token: '',
        userInfo: '',
        menuList: '',
        collpase: false
    },
    getters: {
        getToken: state => state.token,
        getUserInfo: state => state.userInfo,
        getMenuList: state => state.menuList,
        getcollpase: state => state.collpase
    },
    actions: {
        // 定义一个设置token值的动作，第一个参数为action的形参store对象
        setToken({commit}, token) {
            commit('mutationToken', token)
        },
        setMenuList({commit}, menus) {
            commit('mutationMenuList', menus)
        },
        setUserInfo({commit}, user) {
            commit('mutationUserInfo', user)
        },
        setcollpase({commit}, flag) {
            commit('mutationcollpase', flag)
        }
    },
    mutations: {
        mutationToken(state, token) {
            state.token = token
        },
        mutationMenuList(state, menus) {
            state.menuList = menus
        },
        mutationUserInfo(state, user) {
            state.userInfo = user
        },
        mutationcollpase(state, flag) {
            state.collpase = flag
        }
    }
}


// class Test {
//     set setTest(val) {

//     }

//     get getTest() {
//         return ''
//     }
// }

// const test = new Test()

// test.getTest