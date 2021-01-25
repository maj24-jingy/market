<template>
    <page-layout>
        <div slot="header">
            <el-input v-model="userId" placeholder="请输入用户编码" size="small" clearable></el-input>
            <el-button type="primary" size="small" @click="queryEvt">查询</el-button>
        </div>
        <el-table :data="table.data"
            height="100%"
            style="width: 100%">
            <el-table-column v-for="it in table.column"
                :prop="it.key"
                :align="it.align || 'center'"
                :label="it.label"
                :show-overflow-tooltip="true"
                :width="it.width"
                :key="it.key"></el-table-column>
        </el-table>
        <div slot="footer">
            <el-pagination
                @size-change="handlePaging('size', $event)"
                @current-change="handlePaging('page', $event)"
                :current-page="paging.page"
                :page-sizes="paging.sizes"
                :page-size="paging.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paging.total">
            </el-pagination>
        </div>
    </page-layout>
</template>
<script>
    import BaseView from '../BaseView'
    import {getDiscountList} from '../../apis/userApi'
    import {DISCOUNT_LIST_COLUMNS} from '../../config/user.config'
    export default {
        extends: BaseView,
        data() {
            return {
                userId: '',

            }
        },
        created() {
            this.table.column = JSON.parse(JSON.stringify(DISCOUNT_LIST_COLUMNS))
            this.getTableList()
        },
        methods: {
            async getTableList() {
                let load = this.$loading()
                let result = await getDiscountList(this.userId, this.table.page, this.table.size)
                if (result.code === 200) {
                    console.log(result);
                    this.table.data = result.data.rows
                    this.table.total = result.data.total
                }
                load.close()
            },
            queryEvt() {
                this.table.page = 1
                this.getTableList()
            }
        },
    }
</script>