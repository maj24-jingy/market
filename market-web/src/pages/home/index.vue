/*************************************************************
 * created by deming.su on 2020-10-14 for login page
 *************************************************************/
<template>
    <div class="home-container">
        <el-row :gutter="12">
            <el-col v-for="it in bannerList" :span="4" :offset="0" :key="it.name">
                <el-card class="box-card">
                    <!-- <div slot="header" class="clearfix">
                        
                    </div> -->
                    <div :class="['banner-cls', it.cls]">
                        <div>
                            <span>{{it.amount}}</span>
                            <span>{{it.nums}}</span>
                            <span>{{it.name}}</span>
                        </div>
                        <i></i>
                    </div>
                </el-card>
                
            </el-col>
            <el-col>
                <!-- ElTable -->
                <el-table :data="tableData"
                    style="width: 100%;magin-top: 15px">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                        <template v-slot="scope">
                            <!-- <span>{{scope.row.date | dateFormat('MM月dd日')}}</span> -->
                            <!-- 指令是Vue框架把元素给到我们自己，我们需要完成元素的渲染 -->
                            <!-- <span v-dateFormat:ydf="scope.row.date"></span> -->
                            <span v-date-format:ydf="scope.row.date"></span>
                            <!-- <span style="color: #f00">{{scope.column}}</span>
                            <span>{{scope.$index}}</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="nums"
                        label="数量"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="数量"
                        :width="120">
                    </el-table-column>
                    <el-table-column
                        label="操作列"
                        :width="120">
                        <template v-slot="scope">
                            <div>
                                <el-button type="text" size="default" @click="delEvt(scope.row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col>
                <slot-node>
                    <!-- <span slot-scope="scope">jfldsjfkds{{scope.value}}</span> -->
                    <template v-slot:test="scope">
                        <p slot="test">{{scope.value}}</p>
                    </template>
                    <!-- <template slot-scope="scope">
                        <div>
                            <span>jfldsjfkds{{scope.value}}</span>
                        </div>
                    </template> -->
                    
                </slot-node>
                <span id="textNode">{{testValue}}</span>
            </el-col>
            <el-col>
                <div class="chart" ref="chartNode" :style="{height: `${chartHei}px`}">

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { getHotApi, getSalesApi } from '../../apis/userApi'
    import { dateFormat as ddff } from '../../util'
    import SlotNode from './slot'
    import {mapGetters} from 'vuex'

    export default {
        components: {SlotNode},
        directives: {
            // df: function(el, binding) {
            //     console.log(arguments)
            //     console.log('+++++++++++++++++++++++++++++')
            //     el.innerText = ddff('MM月dd日', binding.value)
            // }
            df: {
                inserted(el, binding, vnode, oldVnode) {
                    let format = ''
                    if (binding.arg === 'df') format = 'MM月dd日'
                    if (binding.arg === 'ydf') format = 'yyyy年MM月dd日'
                    el.innerText = ddff(format, binding.value)
                    // console.log(binding)
                    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                },
                bind: function() {
                },
                update(el, binding, vnode, oldVnode) {

                }
            }
        },
        // filters: {
        //     df: function(val, arg1) {
        //         console.log(arguments)
        //         console.log('+++++++++++++++++++++++++++++')
        //         return dateFormat(arg1, val)
        //     }
        // },
        data() {
            return {
                tableData: [],
                bannerList: [
                    {amount: 0, name: '牛奶', nums: 0, cls: 'milk'},
                    {amount: 0, name: '牛肉', nums: 0, cls: 'beef'},
                    {amount: 0, name: '啤酒', nums: 0, cls: 'beer'},
                    {amount: 0, name: '被子', nums: 0, cls: 'bz'},
                    {amount: 0, name: '羊肉', nums: 0, cls: 'yr'},
                    {amount: 0, name: '衣服', nums: 0, cls: 'yf'}
                ],
                socket: null,
                chartNode: null,
                resetTimer: null,
                testValue: '',
                chartHei: 0
            }
        },
        computed: {
            collpase() {
                return this.$store.getters['common/getcollpase']
            },
            ...mapGetters({
                gc: 'common/getcollpase'
            })
        },
        watch: {
            bannerList: {
                deep: true,
                immediate: true,
                handler: function(val){
                    console.log(val)
                }
            },
            gc(val) {
                this.resetChart()
            },
            collpase(val) {
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            }
        },
        // mounted 并不能保证挂载后的节点完全展开
        async mounted() {
            this.socket = io("http://www.shuiyue.info:12600")
            this.socket.on('connect', () => {
                console.log('connect success... ...')
                this.socket.emit('clientEvt', {type: 'getTodayHot'})
            })
            this.socket.on('serverEvt', data => {
                console.log('socket connected... ...')
                if (!!data && data.length > 0) {
                    this.bannerList.map(it => {
                        let _d = data.find(oo => oo.name === it.name)
                        it.amount = _d.amount || 0
                        it.nums = _d.nums || 0
                        return it
                    })
                }
            })
            
            this.chartHei = 320
            // 效果等同于 setTimeout，
            await this.$nextTick()
            this.chartHei = 380
            setTimeout(() => {
                // 初始化chart
                this.chartNode = echarts.init(this.$refs.chartNode)

                this.getChartData()

                window.addEventListener('resize', this.resetChart, false)
            })

            // $nextTick的作用
            this.testValue = '11'
            console.log(document.getElementById('textNode').innerHTML, 'before...')
            await this.$nextTick()
            console.log(document.getElementById('textNode').innerHTML, 'after...')

            // this.$nextTick(() => {
            //     this.chartNode = echarts.init(this.$refs.chartNode)
            // })

            // 近七天每天销售额最大的产品数量和金额
            let result = await getSalesApi()

            if (result.code === 200) {
                // result.data.map(it => {
                //     it.date = dateFormat('MM月dd日', it.date)
                //     return it
                // })
                this.tableData = result.data

                // let d = [];
                // for (let i =0;i < 50000;i ++) {
                //     d.push({"date":"2020/10/02","name":"衣服","nums":18952,"amount":"24176.23"})
                // }
                // this.tableData = d;
            }
        },
        methods: {
            // 要注意页面用户操作防抖
            resetChart() {
                console.log('.............')
                if (this.resetTimer) {
                    clearTimeout(this.resetTimer)
                    this.resetTimer = null
                }
                this.resetTimer = setTimeout(() => {
                    console.log('............. done')
                    clearTimeout(this.resetTimer)
                    this.resetTimer = null
                    if (this.chartNode) this.chartNode.resize()
                }, 500)
            },
            async getChartData() {
                let result = await getHotApi()
                if (result.code !== 200) return

                let xLabel = [],
                    _d= result.data,
                    d1 = [],
                    d2 = [],
                    d3 = []
                _d.data.map(it => {
                    xLabel.push(it.date)
                    d1.push(it.value1)
                    d2.push(it.value2)
                    d3.push(it.value3)
                })


                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [_d.name1, _d.name2, _d.name3]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xLabel
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: _d.name1,
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#f00'
                                }
                            },
                            data: d1
                        },
                        {
                            name: _d.name2,
                            type: 'line',
                            data: d2
                        },
                        {
                            name: _d.name3,
                            type: 'line',
                            data: d3
                        }
                    ]
                };
                this.chartNode.setOption(option)

                // setTimeout(() => {
                //     this.chartNode.clear();
                // }, 2500)
            },
            delEvt(row) {
                console.log(row)
            }
        },
        beforeDestroy() {
            // 断开socket连接
            if (this.socket) {
                this.socket.close()
            }
            // 销毁定时器
            if (this.resetTimer) {
                clearTimeout(this.resetTimer)
                this.resetTimer = null
            }
            // 取消resize事件
            window.removeEventListener('resize', this.resetChart)
            // 销毁echarts 对象
            this.chartNode.dispose()
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        background: transparent;
    }
    .banner-cls {
        display: block;
        position: relative;
        height: 100px;
        overflow: hidden;
        background: #fff;
        div {
            float: left;
            width: calc(~"100% - 48px");
            span {
                display: block;
                position: relative;
                font-size: .8rem;
            }
        }
        i {
            float: right;
            width: 48px;
            height: 100%;
        }
        .loopBanner(1)
    }

    @color: #f00 #f0f #f00 #0ff #00f #0f0;
    @names: milk beef beer bz yr yf;
    .loopBanner(@index) when (@index <= length(@color)) {
        @c: extract(@color, @index);
        @n: extract(@names, @index);
        &.@{n} {
            div span {
                color: @c;
            }
            i {
                background: url("../../images/home/banner-0@{index}.png") center center / 32px 32px no-repeat;
            }
        }
        .loopBanner(@index + 1);
    }

    .chart {
        display: block;
        position: relative;
        height: 320px;
        background: #fff;
        margin-top: 12px;
    }

    .el-card__body {
    padding: 12px;
}
</style>