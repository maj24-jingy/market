<template>
    <page-layout>
        <div slot="header">
            <el-input v-model="name" placeholder="请输入角色名称" size="small" clearable></el-input>
            <el-button type="primary" size="small" @click="queryEvt">查询</el-button>
            <el-button type="success" size="small" @click="editEvt('new')">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table
            :data="table.data"
            style="width: 100%"
            height="100%">
            <!-- :show-overflow-tooltip="true" 只能展示不能拷贝 -->
            <el-table-column v-for="col in table.columns"
                :prop="col.key"
                :label="col.label"
                :width="col.width"
                :key="col.key">
                <template v-slot="scope">
                    <el-tooltip v-if="col.toolTip" popper-class="tooltip-cls" effect="dark"
                        :content="scope.row[scope.column.property].join(',')" placement="top">
                        <span class="cell-text">{{scope.row[scope.column.property]}}</span>
                    </el-tooltip>
                    <span v-else class="cell-text">{{scope.row[scope.column.property]}}</span>
                </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="text" size="mini" @click="editEvt('edit', scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑/新增弹出框 -->
        <el-dialog :title="type === 'new' ? '新增角色' : '编辑角色'"
            :visible.sync="show"
            :append-to-body="true"
            :close-on-click-modal="false"
            width="600px">
            <!-- 权限表单 -->
            <el-form :model="form" ref="form" :rules="rules" label-width="86px" :inline="false" size="small">
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item label="权限ID">
                            <el-input v-model="form.id" placeholder="权限ID由后端自动生成" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限名字" prop="name">
                            <el-input v-model="form.name" placeholder="权限ID由后端自动生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="菜单">
                            <ul class="role-list">
                                <!-- 遍历菜单数据 -->
                                <li v-for="m in menuList" :key="m.index">
                                    <span>{{m.name}}:</span>
                                    <!-- 与每个菜单的数据绑定 -->
                                    <el-checkbox-group v-model="m.cr">
                                        <!-- 遍历权限数据 -->
                                        <el-checkbox v-for="n in m.rl"
                                            :label="n"
                                            :key="`${m.index}-${n}`">
                                            {{n === 'C' ? '新增' : n === 'R' ? '读' : n === 'U' ? '修改' : '删除'}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" type="textarea" resize="none" placeholder="权限ID由后端自动生成"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 弹出框的底部插槽 -->
            <footer slot="footer">
                <el-button type="primary" size="mini" @click="saveEvt">保存</el-button>
            </footer>
        </el-dialog>
    </page-layout>
</template>
<script>
    import BaseView from '../BaseView'
    import {ROLE_COLUMNS, MUNE_LIST} from '../../config/user.config'
    import {roleListApi, addRoleApi, updateRoleApi} from '../../apis/roleApi'

    export default {
        extends: BaseView,
        data() {
            return {
                name: '',// 查询条件
                show: false,// 弹出框标识
                type: 'new',// 当前编辑类型
                pageData: [],// 用于缓存页面请求的数据
                menuList: [],// 菜单数据
                form: {// 表单数据
                    id: '',
                    name: '',
                    menu: [],
                    remark: ''
                },
                rules: {
                    // 校验规则的编写，必须在form数据中有这个key，接收一个数组
                    name: [{required: true, message: '角色名称必须填写', trigger: 'blur'}]
                },
                checkList: []
            }
        },
        created() {
            // 初始化表格列数据
            this.table.columns = ROLE_COLUMNS
            
            // 获取数据列表
            this.getTableList()

            
        },
        methods: {
            // 处理菜单数据
            setMenuList(row) {
                let temp = [],
                    roleList = []
                if (!!row) {
                    // 把当前行中的菜单权限遍历成一个完整的数据
                    row.menu.map(it => {
                        let r = it.split('>>>')
                        // id 为每个菜单的index，role为菜单中的所有权限
                        if (r.length === 2) roleList.push({id: r[0], role: r[1].split('')})
                    })
                }
                console.log(roleList)
                MUNE_LIST.map(it => {
                    it.children.map(it => {
                        if (it.role) {
                            // ic 拷贝的每一个菜单项
                            let ic = JSON.parse(JSON.stringify(it))
                            // rl roleList 每个菜单的所有权限
                            ic.rl = ic.role.split('')
                            // cr checkRight 已选择的权限数组
                            ic.cr = []
                            // 如果是编辑需要给checkRight加上初始值
                            if (row) {
                                let _i = roleList.findIndex(oo => oo.id === ic.index)
                                if (_i > -1) ic.cr = roleList[_i].role
                            }
                            temp.push(ic)
                        }
                    })
                })
                this.menuList = temp
            },
            // 因为是本地过滤所以直接对数据进行本地切换
            queryEvt() {
                let temp = []
                this.pageData.map(it => {
                    if (it.name.includes(this.name)) temp.push(it)
                })
                this.table.data = temp
            },
            // 获取数据
            async getTableList() {
                let load = this.$loading()
                let result = await roleListApi()
                if (result.code === 200) {
                    this.pageData = result.data.rows
                    // 调用本地表格数据初始化方法
                    this.queryEvt()
                }
                load.close()
            },
            // 编辑/新增事件
            async editEvt(type, row) {
                console.log(row)
                // 保存类型，用于弹出框标题展示和提交的时候走不同的地址
                this.type = type
                // 初始化数据
                if (type === 'new') {
                    this.setMenuList()
                    this.form = {
                        id: '',
                        name: '',
                        menu: [],
                        remark: ''
                    }
                } else {
                    // 初始化数据到传递进来的值
                    this.setMenuList(row)
                    this.form = {
                        id: row.id,
                        name: row.name,
                        menu: row.menu,
                        remark: row.remark
                    }
                    // await this.$nextTick()
                }
                this.show = true
                // this.$refs.form.resetFields() 只能用在dom节点已经渲染的页面
            },
            // 保存
            async saveEvt() {
                console.log(this.menuList)
                // 通过elForm校验页面提交的数据是否合符rules的规则，validate方法返回一个promise，catch但单独处理，如果错误返回的值为undefined
                let result = await this.$refs.form.validate().catch(() => {})
                if (!result) return

                // 查看用户是否没有选择权限
                let idx = this.menuList.findIndex(oo => oo.cr.length > 0)
                if (idx < 0) {
                    this.$message.warning('请选择至少一个权限')
                    return
                }

                let submitObj = {
                    id: this.form.id,
                    name: this.form.name,
                    menu: [],
                    remark: this.form.remark
                }
                // 拼接权限数据
                this.menuList.map(it => {
                    // cr 选择后的权限数组
                    if (it.cr.length > 0) {
                        submitObj.menu.push(`${it.index}>>>${it.cr.join('')}`)
                    }
                })

                if (this.type === 'new') {
                    // 新增  /role post
                    // let result = await roleListApi()
                    // if(result.code === 200) {
                        
                    // }
                    
                    let result = await addRoleApi(submitObj)
                    if (result.code === 200) {
                        this.$message.success('保存成功')
                    } else {
                        this.$message.error('保存失败')
                    }
                    this.show = false
                    console.log(result)
                } else {
                    // 保存接口 /role put
                    let result = await updateRoleApi(submitObj)
                    if (result.code === 200) {
                        this.$message.success('保存成功')
                    } else {
                        this.$message.error('保存失败')
                    }
                    this.show = false
                    console.log(result)
                }
                // 请求成功后，需要刷新页面数据
                this.getTableList()
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../styles/common.less";
    .cell-text {
        .text-ellipsis();
    }
</style>