<template>
    <page-layout>
        <div slot="header">
            <el-button type="primary" size="small" @click="submitEvt">{{type === 'new' ? '保存' : '提交'}}</el-button>
            <el-button type="info" size="small" @click="$router.push('/product/list')">返回</el-button>
        </div>
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-form-item label="用户编码">
                        <el-input v-model.number="form.id"></el-input>
                    </el-form-item>  
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户名字" prop="name">
                        <el-input v-model.number="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户类型" prop="type">
                        <el-select v-model="form.type" placeholder="请选择产品类型" clearable>
                            <el-option v-for="it in types"
                                :key="it"
                                :label="it"
                                :value="it"></el-option>
                        </el-select>
                    </el-form-item>           
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品价格">
                        <el-input v-model.number="form.id"></el-input>
                    </el-form-item>  
                </el-col>
                <el-col :span="8">
                    <el-form-item label="优惠价格" prop="name">
                        <el-input v-model.number="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </page-layout>
</template>

<script>

    
    export default {
        data() {
            return {
                number: '',
                type: 'new',
                types: [],
                form: {
                    id: '',
                    name: '',
                    type: '',
                    price: '',
                    discount: '',
                    st: '',
                    et: '',
                    supplierId: '',
                    supplier: '',
                    address: '',
                    specs: '',
                    visit: '',
                    banner: [],
                    recommend: '',
                    creation: '',
                    period: '',
                    descMsg: '',
                    descImg:  [],
                    remark: ''
                },
                rules: {
                    name: [{required: true, message: '产品名字必须输入', trigger: 'blur'}],
                    type: [{required: true, message: '请选择产品类型', trigger: 'change'}]
                },
            }
        },
        computed: {
            isModify() {
               return this.$route.query.type === 'edit'
            }
        },
        methods: {
            submitEvt() {

            },

        },
    }
</script>