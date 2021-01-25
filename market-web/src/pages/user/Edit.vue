<template>
    <page-layout>
        <div slot="header">
            <el-button type="primary" size="small" @click="submitEvt">{{type === 'new' ? '保存' : '提交'}}</el-button>
            <el-button type="info" size="small" @click="$router.push('/user/list')">返回</el-button>
        </div>
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="small">
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-form-item label="用户编码" prop="id">
                        <el-input v-model.number="form.id"></el-input>
                    </el-form-item>  
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户名字" prop="name">
                        <el-input v-model.number="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户密码" prop="password" v-if="!isModify">
                        <el-input v-model.number="form.password"></el-input>
                    </el-form-item>           
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户性别">
                        <el-select v-model="form.sex" value-key="" placeholder="">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>       
                </el-col>
                <el-col :span="16">
                    <el-form-item label="用户地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户生日">
                        <el-date-picker v-model="form.birthday"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门">
                        <el-select v-model="form.dept" placeholder="" clearable filterable>
                            <el-option v-for="item in deptList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="职位">
                        <el-select v-model="form.position" placeholder="" clearable filterable>
                            <el-option v-for="item in positionList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户电话">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="用户权限">
                        <el-checkbox-group v-model="form.role">
                            <el-checkbox v-for="r in roles"
                                :label="r.id"
                                :key="r.id">{{r.name}}</el-checkbox>
                        </el-checkbox-group>
                        
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="4" resize="none" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>           
        </el-form>    
    </page-layout>
</template>
<script>
    import {saveUserApi, updateUserApi, userInfoApi, userDeptApi, userCityApi} from '../../apis/userApi'
    import {roleListApi} from '../../apis/roleApi'

    export default {
        data() {
            return {
                query: {type: 'add'},
                roles: '',
                type: 'edit',
                id: '',
                form: {
                    id: '',
                    name:'',
                    password: '',
                    sex: '',
                    address: '',
                    dept: '',
                    position: '',

                    province: '',
                    city: '',
                    county: '',

                    phone: '',
                    email: '',
                    role: '',
                    remark: '',

                },
                rules: {
                    id: [
                        {required: true, message: '必须输入', trigger: 'blur'},
                        {type: 'number', message: '必须数字', trigger: 'blur'}
                        ],
                    name: [{required: true, message: '请输入用户姓名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入用户密码', trigger: 'blur'}]
                },
                deptList: [],
                positionList: [],

                provinceList: [],
                cityList: [],
                countyList: []
            }
        },
        watch: {
            'form.dept'(val) {
                if(val === ''){
                    this.positionList = []
                } else {
                    let item = this.deptList.find(oo => oo.name === val)
                    if(!!item) {
                        this.positionList = item.list
                    }
                }
                this.form.position = ''
            }
        },
        async created() {
            let load = this.$loading()
            let result = await userDeptApi()
            if(result.code === 200) {
                this.deptList = result.data
            }
            load.close()

            this.query = this.$route.query
            console.log(this.query.type);
            if(this.query.type === 'edit') {
                this.type = 'new'
                let result = await userInfoApi(this.query.id)
                if(result.code ===200) {
                    console.log(result)
                    console.log(this.form)
                    for(let name in this.form) {
                        this.form[name] = result.data[name]
                    }
                    setTimeout(() => {
                        this.form.dept = result.data.dept
                    }, 200);
                } else {
                    this.$message.error('用户信息有错误')
                    this.$router.go(-1)
                }
            }
            let res = await roleListApi()
            if(res.code === 200) {
                this.roles = res.data.rows
            }
            console.log(res)
        },
        computed: {
            isModify() {
                return this.$route.query.type === 'edit'
            }
        },
        
        methods: {
            submitEvt() {
                this.$refs.form.validata(flag => {
                    if(flag) {
                        if(this.query.type === 'edit') {
                            this.updateFunc()
                        }else {
                            this.saveFunc()
                        }
                    }
                })
            },
            async saveFunc() {
                let load = this.$loading()
                let result = await saveUserApi(this.form)
                
                if (result.code === 200) {
                    this.$message.success('保存成功')
                    this.$router.push('/user/list')
                } else {
                    this.$message.error('保存失败，请重试')
                }
                load.close()
            },
            async updateFunc() {
                let load = this.$loading()
                let result = await updateUserApi(this.form)
                if (result.code === 200) {
                    this.$message.success('修改成功')
                    this.$router.push('/user/list')
                } else {
                    this.$message.error('修改失败，请重试')
                }
                load.close()
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-input--suffix .el-input__inner {
    width: 328px!important;
}
</style>