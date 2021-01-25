<template>
    <page-layout v-loading="table.loading">
        <div slot="header" >
            <el-input v-model="name" placeholder="请输入商品名或供应商名" size="small" clearable></el-input>
            <el-button type="primary" size="small" @click="queryEvt">查询</el-button>
            <el-button type="success" size="small" @click="editEvt('new')">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table
            :data="table.data"
            style="width: 100%"
            height="100%">
            <!-- :show-overflow-tooltip="true" 只能展示不能拷贝 -->
            <el-table-column v-for="it in table.columns"
                :prop="it.key"
                :align="it.align || 'center'"
                :label="it.label"
                :show-overflow-tooltip="true"
                :width="it.width"
                :key="it.key">
                <template v-slot="scope">
                    <span v-if="it.key !== 'st' && it.key !== 'et'">{{scope.row[it.key]}}</span>
                    <span v-else>{{scope.row[it.key] | dateFormat('yyyy-mm-dd')}}</span>
                </template>
                <!-- <template v-slot="scope">
                    <el-tooltip v-if="col.toolTip" popper-class="tooltip-cls" effect="dark"
                        :content="scope.row[scope.column.property]" placement="top">
                        <span class="cell-text">{{scope.row[scope.column.property]}}</span>
                    </el-tooltip>
                    <span v-else class="cell-text">{{scope.row[scope.column.property]}}</span>
                </template> -->
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column fixed="right" width="100"  label="操作">
                <template v-slot="scope">
                    <el-button type="text" size="mini" @click="editEvt('edit', scope.row)">编辑</el-button>
                    <el-button type="text" size="mini" @click="editEvt('delete', scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <slot-node>
            <template v-slot="data">
                <span>{{data.data}}33</span>
            </template>
        </slot-node> -->

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
    import { PRODUCT_LIST_COLUMNS } from '../../config/user.config'
    import {deleteProductApi, getProductApi} from '../../apis/userApi'

    // import SlotNode from './slot'

    export default {
        // components: {SlotNode},
        extends: BaseView,
        data() {
                return {
                    name: '',
                }
            },
        created() {
            this.table.columns = JSON.parse(JSON.stringify(PRODUCT_LIST_COLUMNS))

            this.getTableList()
        },
        methods: {
            
            //查询
            queryEvt() {
                this.paging.page = 1
                this.getTableList()
            },
            async getTableList() {
                this.table.loading = true
                let result = await getProductApi(this.name, this.paging.page, this.paging.size)
                if(result.code === 200){
                    console.log(result);
                    this.table.data = result.data.rows
                    this.paging.total = result.data.total
                }
                this.table.loading = false
            },
            //编辑  删除   新增用户
            async editEvt(type, row) {
                switch(type) {
                    case 'new':
                        this.$router.push({path: '/product/edit', query: {type: 'new'}})
                        break;
                    case 'edit':
                        this.$router.push({path: '/product/edit', query: {type: 'edit', id: row.id}})
                        break;
                    case 'delete':
                        let result = await this.$confirm('您确认要删除此条数据，删除后不可恢复，确认继续？', '删除确认', {
                            cancelButtonText: 'cancel',
                            type: 'error'
                        }).catch(e => {})
                        // if (!result) return
                        console.log(row.id)
                        let resultt = await deleteProductApi(row.id)
                        if(resultt.code === 200) {
                            console.log(resultt)
                            this.$message.success('删除成功')
                            this.getTableList()
                        }
                        break;
                    default:
                        break;
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        float: right;
    }
</style>