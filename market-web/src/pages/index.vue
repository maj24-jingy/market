/*************************************************************
 * created by deming.su on 2020-10-14 for application entry
 *************************************************************/
<template>
    <component :is="layoutName"></component>
</template>

<script>

    export default {
        // 接收从父组件传递过来的参数
        props: {
            layoutName: {
                type: String
            }
        },
        // 在属性中定义过的参数不能被重复定义
        // data() {
        //     return {
        //         layoutName: ''
        //     }
        // },
        created() {
            
        }
    }
</script>