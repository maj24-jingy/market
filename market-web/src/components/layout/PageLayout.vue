<template>
    <div class="page-layout-container">
        <header v-if="hasHeader">
            <slot name="header"></slot>
        </header>
        <article :style="contentHei">
            <slot/>
        </article>
        <footer v-if="hasFooter">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    export default {
        computed: {
            hasHeader() {
                return !!this.$slots.header
            },
            hasFooter() {
                return !!this.$slots.footer
            },
            contentHei() {
                let hei = this.hasHeader && this.hasFooter ? `calc(100% - 90px)`
                    : this.hasHeader ? `calc(100% - 42px)` 
                    : this.hasFooter ? `calc(100% - 48px)` : `100%`
                return {height: hei}
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-layout-container {
        display: block;
        position: relative;
        height: 100%;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        >article,
        >footer,
        >header {
            display: block;
            position: relative;
            height: 48px;
            padding: 8px 12px;
        }
        >header {
            text-align: right;
            border-bottom: solid 1px #ebeef5;
        }
        >footer {
            height: 42px;
            padding: 6px 12px;
            border-top: solid 1px #ebeef5;
        }
        >article {
            overflow-x: hidden;
        }
    }
    .el-input {
        width: 220px!important;
        margin-right: 10px;
    }
</style>