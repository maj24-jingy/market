<template>
    <page-layout>
        <div slot="header">
            <el-button type="success" size="small" @click="editEvt('new')">新增</el-button>
        </div>

        <el-table :data="bannerList"
            height="100%"
            style="width: 100%">
            <el-table-column label="banner名字" :show-overflow-tooltip="true" width="180">
                <template v-slot="scope">
                    <span v-if="scope.row.type !== 'new' && scope.row.type !== 'edit'">{{scope.row.name}}</span>
                    <el-input v-else v-model="scope.row.name" placeholder="请输入banner名字" size="mini" clearable></el-input>
                </template>
            </el-table-column>
            <el-table-column label="产品名字" :show-overflow-tooltip="true" width="200">
                <template v-slot="scope">
                    <span v-if="scope.row.type !== 'new' && scope.row.type !== 'edit'">{{scope.row.product}}</span>
                    <el-input v-else v-model="scope.row.product" placeholder="请选择产品" size="mini" readonly>
                        <el-button icon="el-icon-search" slot="append" @click="pickProduct(scope.row.id)"></el-button>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column prop="filename" label="图片名字" :show-overflow-tooltip="true" width="240">
                <template v-slot="scope">
                    <span v-if="scope.row.type !== 'new' && scope.row.type !== 'edit'">{{scope.row.filename}}</span>
                    <el-input v-else v-model="scope.row.filename" placeholder="请选择图片" size="mini">
                        <el-button icon="el-icon-upload" slot="append" @click="pickImg(scope.row)"></el-button>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label="备注" :show-overflow-tooltip="true">
                <template v-slot="scope">
                    <span v-if="scope.row.type !== 'new' && scope.row.type !== 'edit'">{{scope.row.remark}}</span>
                    <el-input v-else v-model="scope.row.remark" placeholder="请输入备注信息" size="mini" clearable></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="110">
                <template v-slot="scope">
                    <el-button v-show="scope.row.type !== 'new' && scope.row.type !== 'edit'" type="text" size="mini" @click="editEvt('edit', scope.row)">编辑</el-button>
                    <el-button v-show="scope.row.type !== 'new' && scope.row.type !== 'edit'" type="text" size="mini" @click="editEvt('delete', scope.row)">删除</el-button>
                    <el-button v-show="scope.row.type === 'new' || scope.row.type === 'edit'" type="text" size="mini" @click="editEvt('save', scope.row)">保存</el-button>
                </template>
            </el-table-column>
        </el-table>
    </page-layout>
</template>

<script>

    import BaseView from '../BaseView'
    import {fileUpload} from '../../util'
    import {indexBannerUpload} from '../../apis/fileApi'
    import { getBannerApi, updateBannerApi, deleteBannerApi, saveBannerApi} from '../../apis/bannerApi'
    import {PRODUCT_LIST_COLUMNS} from '../../config/user.config'
    import {getProductApi, userDeptApi} from '../../apis/userApi'


    export default {
        data() {
            return {
                bannerList: []
            }
        },
        created() {
            this.getBannerList()
        },
        methods: {
            editEvt(type, row) {

            },
            async getBannerList() {
                let load = this.$loading()
                let ret = await getBannerApi()
                load.close()
                if (ret.code === 200) {
                    this.bannerList = ret.data.rows
                }
            },
        },
    }
</script>