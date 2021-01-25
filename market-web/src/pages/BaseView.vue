
<script>
    export default {
        render: ce => ce('div'),
        data() {
            return {
                paging: {
                    page: 1,
                    size: 15,
                    sizes: [15, 30, 50, 100, 200],
                    total: 0
                },
                table: {
                    data: [],
                    columns: [],
                    loading: false
                }
            }
        },
        methods: {
            handlePaging(type, val) {
                if (type === 'size') {
                    this.paging.size = val
                    this.paging.page = 1
                } else {
                    this.paging.page = val
                }
                this.getTableList()
            },
            // 进行简单定义，具体业务页面需要重写这个方法
            getTableList() {
                // do something
            }
        }
    }
</script>