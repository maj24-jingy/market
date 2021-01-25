/*************************************************************
 * created by deming.su on 2020-10-14 for login page
 *************************************************************/
<template>
    <div class="app-container">
        <div class="login-container">
            <p>商场后台系统</p>
            <p>
                <input v-focus v-model="id" type="text">
            </p>
            <p>
                <input v-model="password" type="password">
            </p>
            <p>
                <button @click="loginEvt">登录</button>
            </p>
        </div>
    </div>
</template>

<script>
    import crypto from 'crypto-js'
    import { loginApi, userInfoApi, menuApi } from '../../apis/userApi'

    export default {
        props: {
            pageName: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                id: '',
                password: ''
            }
        },
        methods: {
            async loginEvt() {
                // debugger;
                // console.log(this.$router)
                // 思考过程
                // console.log(this.$store)
                // this.$store.dispatch('setToken', 'fldsjlfkjdslkfjds')
                // console.log(this.$store.getters.getToken)

                let pwd = crypto.MD5(this.password).toString()
                let result = await loginApi(this.id, pwd)
                if (result.code === 200) {
                    sessionStorage.setItem('user_token', result.data.token)
                    // 在调用带命名空间的action的时候，需要把命名空间的名字带上
                    // dispatch 指派，调用
                    this.$store.dispatch('common/setToken', result.data.token)

                    // TODO 获取菜单数据，然后缓存，主布局获取数据
                    this.getUserInfo(result.data.id)
                } else {
                    this.$message.error(result.message)
                }
            },
            async getUserInfo(id) {
                let result = await userInfoApi(id)

                // 如果不为200的请求，直接提示并返回
                if (result.code !== 200) {
                    this.$message.error('获取用户信息失败，原因：' + result.message)
                    return
                }

                this.$store.dispatch('common/setUserInfo', result.data)
                // this.$emit('update:pageName', 'home')
                
                // 获取用户的菜单
                this.getUserMenu()
            },
            async getUserMenu() {
                let result = await menuApi()

                if (result.code !== 200) {
                    this.$message.error('获取菜单信息失败')
                    return
                }

                this.$store.dispatch('common/setMenuList', result.data)
                this.$router.push({
                    // path: '/home/ORDER-0013/001',
                    path: '/home',
                    query: {id: 'ORDER-0012'}
                })
            }
        },
        // 用户编辑页面后，提示用户是否放弃数据编辑
        beforeRouteLeave (to, from, next) {
            // ...
            next()
        }
    }
</script>

// scoped 是声明此样式是本页面使用，lang 声明使用的预处器
<style lang="less" scoped>
    .login-container {
        display: block;
        width: 600px;
        padding: 20px;
        margin: 8vh auto;
        background: #fff;
    }
</style>