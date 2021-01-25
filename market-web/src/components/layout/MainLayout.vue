// 主要布局组件，导航、菜单、内容展示区域
<template>
    <div :class="['app-container', 'main', collpase ? 'collpase' : '']">
        <!-- 导航内容 -->
        <nav>
            <!-- do something -->
            <i @click="collpase = !collpase" :class="['expand', collpase ? 'dis' : '']"></i>
            <span>当前位置：{{breadStr}}</span>
            <el-dropdown style="float: right;padding-top: 6px;" trigger="click">
                <span class="el-dropdown-link">
                    {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>
                        <span @click="menuEvt('logout')">退出系统</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </nav>
        <!-- 菜单内容 -->
        <aside>
            <div class="title"><i></i>玛克特系统</div>
            <!-- do something -->
            <div class="content">
                <el-menu :default-active="defaultMenu"
                    class="el-menu-vertical-demo"
                    :collapse="collpase"
                    background-color="#303133"
                    text-color="#fff"
                    @select="menuSelect"
                    active-text-color="#ffd04b">
                    <!-- 分析结果：index决定了我们的菜单打开或收起的UI值；当点击的时候返回值：为当前点击项的index值；default-active是指页面展开时默认的菜单index -->
                    <el-submenu v-for="pm in menuList" :index="pm.index" :key="pm.index">
                        <template slot="title">
                            <i :class="[pm.icon]"></i>
                            <span slot="title">{{pm.name}}</span>
                        </template>
                        <el-menu-item v-for="cm in pm.children"
                            :index="cm.index"
                            :key="cm.index">{{cm.name}}</el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item index="1-4-2">选项1</el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </div>
        </aside>
        <!-- 主要内容区域，主要通过菜单的路由控制 -->
        <article>
            <router-view></router-view>
        </article>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                collpase: false,
                defaultMenu: '',
                breadStr: ''
            }
        },
        computed: {
            menuList() {
                return this.$store.getters['common/getMenuList']
            },
            userInfo() {
                return this.$store.getters['common/getUserInfo']
            }
            // defaultMenu() {
            //     let menus = this.$store.getters['common/getMenuList']
            //     if (menus.length > 0) {
            //         return menus[0].children[0].index
            //     } else {
            //         return ''
            //     }
            // }
        },
        // 监听一个数据，watch属性
        watch: {
            collpase(val) {
                this.$store.dispatch('common/setcollpase', val)
            },
            // 入参为：第一个为新值，为之前的值
            "$route.path": {
                immediate: true,
                handler(newVal, oldVal) {
                    for (let i = 0;i < this.menuList.length;i ++) {
                        for (let k = 0;k < this.menuList[i].children.length;k ++) {
                            let menu = this.menuList[i].children[k]
                            if (menu.path === newVal) {
                                this.breadStr = this.menuList[i].name + ' > ' + menu.name
                                break;
                            }
                        }
                    }
                }
            }
            // "$route.path"(newVal, oldVal) {
            //     for (let i = 0;i < this.menuList.length;i ++) {
            //         for (let k = 0;k < this.menuList[i].children.length;k ++) {
            //             let menu = this.menuList[i].children[k]
            //             if (menu.path === newVal) {
            //                 this.breadStr = this.menuList[i].name + ' > ' + menu.name
            //                 break;
            //             }
            //         }
            //     }
            // }
        },
        created() {
            console.log(this.$route.path)
            for (let i = 0;i < this.menuList.length;i ++) {
                for (let k = 0;k < this.menuList[i].children.length;k ++) {
                    let menu = this.menuList[i].children[k]
                    if (menu.path === this.$route.path) {
                        this.defaultMenu = menu.index
                        break;
                    }
                }
            }
        },
        methods: {
            // 菜单展开收起事件
            menuEvt(type) {
                console.log(arguments)
                if (type === 'logout') {
                    this.$router.push('/login')
                }
            },
            // 菜单选中事件
            menuSelect(index, indexPath) {

                // this.menuList.map(it => {

                // })

                for (let i = 0;i < this.menuList.length;i ++) {
                    for (let k = 0;k < this.menuList[i].children.length;k ++) {
                        let menu = this.menuList[i].children[k]
                        if (menu.index === index) {
                            this.$router.push(menu.path)
                            break;
                        }
                    }
                }
                console.log(index, indexPath)
            }
        }
    }
</script>