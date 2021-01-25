<template>
    <page-layout>
        <div slot="header" >
            <el-input v-model="name" placeholder="输入供应商名进行查询" size="small" clearable></el-input>
            <el-button type="primary" size="small" @click="queryEvt">查询</el-button>
            <el-button type="success" size="small" @click="editEvt('new')">新增</el-button>
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
            <el-table-column label="操作" width="100">
                <template v-slot="scope">
                    <el-button type="text" size="mini" @click="editEvt('edit', scope.row)">编辑</el-button>
                    <el-button type="text" size="mini" @click="editEvt('delete', scope.row)">删除</el-button>
                </template>
            </el-table-column>
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
        <el-dialog title="编辑地址信息" 
            width="960px"
            :append-to-body="true"
            :close-on-click-modal="false"
            :visible.sync="dialog.show">
            <el-form :model="form" ref="form" :rules="rules" label-width="95px" :inline="false" size="small">
                <el-row :gutter="12">
                    <el-col :span="8">
                        <el-form-item label="供应商编码">
                            <el-input v-model="form.id" readonly placeholder="编码由后端自动生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="供应商名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入供应商名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="省" prop="province">
                            <el-select v-model="form.province" placeholder="请选择省" clearable>
                                <el-option v-for="item in province"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地市" prop="city">
                            <el-select v-model="form.city" placeholder="请选择地市" clearable>
                                <el-option v-for="item in city"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="区县" prop="county">
                            <el-select v-model="form.county" placeholder="请选择区县" clearable>
                                <el-option v-for="item in county"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人" prop="contact">
                            <el-input v-model="form.contact" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" resize="none" type="textarea" :rows="3" placeholder="请输入备注信息"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
            
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="saveEvt">保存</el-button>
            </div>
        </el-dialog>
    </page-layout>
</template>

<script>
    import BaseView from '../BaseView'
    import { SUPPLIER_LIST_COLUMNS} from '../../config/user.config'
    import {userCityApi} from '../../apis/userApi'
    import {saveSupplierApi, getSupplierApi, updateSupplierApi, delSupplierApi} from '../../apis/supplier'
    const formData = {id: '', name: '', province: '', city: '', county: '', address: '', contact: '', phone: '', remark: ''}
    export default {
        extends: BaseView,
        data() {
            return {
                name: '',
                dialog: {
                    show: false,
                    type: 'new'
                },
                form: JSON.parse(JSON.stringify(formData)),
                rules: {
                    name: [{required: true, message: '请输入供应商名称', trigger: 'blur'}],
                    province: [{required: true, message: '请选择省', trigger: 'change'}],
                    city: [{required: true, message: '请选择地市', trigger: 'change'}],
                    county: [{required: true, message: '请选择区县', trigger: 'change'}],
                    address: [{required: true, message: '请输入详细地址', trigger: 'blur'}],
                    contact: [{required: true, message: '请输入联系人', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入联系电话', trigger: 'blur'}]
                },
                province: [],
                city: [],
                county: []

            }
        },
        watch: {
            'form.province': async function(val) {
                if(val === '') {
                    this.city = []
                    this.county = []
                } else {
                    let result = await userCityApi(val)
                    if (result.code === 200) {
                        this.city = result.data
                    }
                }
            },
            'form.city': async function(val) {
                if(val === '') {
                    this.county = []
                } else {
                    let result = await userCityApi(val)
                    if (result.code === 200) {
                        this.county = result.data
                    }
                }
            }
        },
        async created() {
            this.table.column = JSON.parse(JSON.stringify(SUPPLIER_LIST_COLUMNS))
            let result = await userCityApi(0)
            console.log(result)
            if(result.code === 200) {
                this.province = result.data
            }
            this.getTableList()
        },
        methods: {
            queryEvt() {
                this.table.page = 1
                this.getTableList()
            },
            async getTableList() {
                let load = this.$loading()
                let result = await getSupplierApi(this.name, this.table.page, this.table.size)
                if (result.code === 200) {
                    console.log(result);
                    this.table.data = result.data.rows
                    this.paging.total = result.data.total
                }
                load.close()
            },
            
            saveEvt() {
                //表单验证
                this.$refs.form.validate(flag => {
                    if(!!flag) {
                        this.submitEvt()
                    }
                })
            },
            async submitEvt() {
                let result = null,
                    isNew = this.dialog.type === 'new'
                if (isNew) {
                    result = await saveSupplierApi(this.form)
                } else {
                    result = await updateSupplierApi(this.form)
                }

                if (result.code === 200) {
                    this.$message.success(`${isNew ? '新增' : '修改'}成功`)
                    this.getTableList()
                    this.dialog.show = false
                } else {
                    this.$message.error(`${isNew ? '新增' : '修改'}失败`)
                }
            },
            async editEvt(type, row) {
                switch (type) {
                    case 'new':
                        this.dialog.show = true
                        break;
                    case 'edit':
                        this.dialog.show = true
                        for (let name in this.form) {
                            this.form[name] = row[name] || ''
                        }
                        setTimeout(() => {
                            this.form.city = row.city
                            setTimeout(() => {
                                this.form.county = row.county
                            })
                        }, 300)
                        break;
                    case 'delete':
                        // console.log(this.$cow)
                        let result = await delSupplierApi(row.id)
                        if(result.code === 200) {
                            this.$message.success('删除成功')
                        } else {
                            this.$message.error('error')
                        }
                        this.getTableList()
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