<template>
    <div>
        <Card>
            <div class="search-con search-con-top">
                <Input clearable placeholder="任务编号" class="search-input" v-model="search.taskId" @on-enter="handleSearch" />
                <Input clearable placeholder="上画人员编码" class="search-input" v-model="search.adUploadId" @on-enter="handleSearch" />
                <Input clearable placeholder="上画人员名称" class="search-input" v-model="search.adUploadName" @on-enter="handleSearch" />
                <!--<Select v-model="search.taskStatus" clearable placeholder="请选择任务状态">
                    <Option v-for="item in M_taskStatusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>-->
                <DatePicker clearable type="date" placeholder="售卖开始时间" :editable=false v-model="search.timeZoneBegin" style="width: 200px"></DatePicker>
                <DatePicker clearable type="date" placeholder="售卖结束时间" :editable=false v-model="search.timeZoneEnd" style="width: 200px"></DatePicker>
                <Button @click="handleSearch" class="search-btn" type="primary">
                    <Icon type="search" />查询
                </Button>
                <Button @click="handleReset" class="search-btn" type="primary">
                    <Icon type="search" />重置
                </Button>
            </div>
            <Table border ref="table" :columns="columns" :data="tableList"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page show-total :total="total" :page-size="pagesize" :current="pageNo" @on-change="pageChange"></Page>
                </div>
            </div>
        </Card>
        <!-- 上传 -->
        <Drawer v-model="imgShow" width="720" :mask-closable="true" :styles="styles" @on-close="closeDrawer">
            <task-detail ref="task" :detail-data="editData" :show-falg="editTitle" @uploadImg="uploadImg" @closeDrawer="closeDrawer"></task-detail>
        </Drawer>
        <!-- 预上画 -->
        <Drawer width="720" v-model="prePaintShow">
            <pre-painting ref="preData" :pre-detail-data="preDetailData" :pre-search-data="preSearchData" @back="prePaintShow=false"></pre-painting>
        </Drawer>
    </div>
</template>
<script>
    import '_c/tables/index.less'
    import TaskDetail from './taskDetail';
    import PrePainting from './prePainting.vue';
    export default {
        components: {
            TaskDetail,
            PrePainting
        },
        data() {
            return {
                search: {
                    taskId: '',
                    adUploadName: '',
                    adUploadId: '',
                    taskStatus: '',
                    timeZoneBegin: '',
                    timeZoneEnd: ''
                },
                pageNo: 1,
                total: 1,
                pagesize: 10,
                columns: [
                    {type: 'index',width: 60,align: 'center'},
                    {
                        title: '任务编号',
                        key: 'taskId',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'text'
                                    },
                                    on: {
                                        click: () => {
                                            this.getPrePaint(params);
                                        }
                                    }
                                }, params.row.taskId),
                            ]);
                        }
                    },
                    {title: '上画人员名称',key: 'adUploadName'},
                    {title: '上画人员编码',key: 'adUploadId'},
                    {title: '小区名称',key: 'communityName'},
                    {title: '客户名称',key: 'custormerName'},
                    {
                        title: '售卖开始日期',
                        key: 'timeZoneBegin',
                        render: (h, params) => {
                            return h('span', this.M_dateFormat(params.row.timeZoneBegin));
                        }
                    },{
                        title: '售卖结束日期',
                        key: 'timeZoneEnd',
                        render: (h, params) => {
                            return h('span', this.M_dateFormat(params.row.timeZoneEnd));
                        }
                    },{
                        title: '任务状态',
                        key: 'taskStatus',
                        render: (h, params) => {
                            return h('span', params.row.taskStatus && this.M_taskStatusArr.find(val => val.value == params.row.taskStatus).label);
                        }
                    }, {
                        title: '操作',
                        align: 'center',
                        key: 'action',
//                        fixed: 'right',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'primary'
                                    },
                                    style: {
                                        display: params.row.taskStatus == '1' || params.row.taskStatus == '3' ? '' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.goToUpload('图片上传',params)
                                        }
                                    }
                                }, '图片上传'),
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'primary',
                                    },
                                    on: {
                                        click: () => {
//                                            this.$nextTick(function () {
//                                                this.editTitle = '图片查看';
//                                            })
//                                            this.$refs.taskData.getEditTitle('图片查看');  //动态传值给子组件
                                            this.goToUpload('图片查看',params)
                                        }
                                    }
                                }, '图片查看')
                            ]);
                        }
                    }
                ],
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                editTitle: '图片上传',
                imgShow: false,
                editData: {},
                tableList: [],
                initList: [
                    {
                        taskId: 'SZLH001',
                        adUploadId: 'SZ00001',
                        adUploadName: '张大爷',
                        communityName: '小区0',
                        communityId: 'DW000001',
                        custormerName: '星海名城',
                        timeZoneBegin: '2018-10-02',
                        timeZoneEnd: '2018-10-20',
                        taskStatus: '2',
                    },
                    {
                        taskId: 'SZLH003',
                        adUploadId: 'SZ00004',
                        adUploadName: '小一',
                        communityName: '小区3',
                        communityId: 'DW000009',
                        custormerName: '天地壹号',
                        timeZoneBegin: '2017-10-02',
                        timeZoneEnd: '2017-10-20',
                        taskStatus: '2',
                    },
                    {
                        taskId: 'SZLH004',
                        adUploadId: 'SZ00003',
                        adUploadName: '佬的',
                        communityName: '小区2',
                        communityId: 'DW000003',
                        custormerName: '星海名城',
                        timeZoneBegin: '2018-10-02',
                        timeZoneEnd: '2018-10-20',
                        taskStatus: '4',
                    },
                    {
                        taskId: 'SZLH005',
                        adUploadId: 'SZ00008',
                        adUploadName: '噢噢',
                        communityName: '小区1',
                        communityId: 'DW000006',
                        custormerName: '深圳北',
                        timeZoneBegin: '2018-10-02',
                        timeZoneEnd: '2018-10-20',
                        taskStatus: '3',
                    },
                    {
                        taskId: 'SZLH006',
                        adUploadId: 'SZ00000',
                        adUploadName: '周大',
                        communityName: '小区12',
                        communityId: 'DW000008',
                        custormerName: '猪八戒',
                        timeZoneBegin: '2018-10-02',
                        timeZoneEnd: '2018-10-20',
                        taskStatus: '1',
                    }
                ],
                selectedList: [],
                prePaintShow: false,
                preDetailData: [],   //预上画列表数据
                preSearchData: {},
            }
        },
        methods: {
            //查询
            handleSearch() {
                let params = {
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo - 1,
                    'timeZoneBegin': this.M_dateFormat(this.search.timeZoneBegin),
                }
                params = Object.assign({}, params, this.search);
                this.tableList = this.initList.concat();
                this.tableList = this.tableList.filter(v => {
                    let bol = true
                    for (let i in this.search) {
                        if (this.search[i] && this.search[i] != v[i]) {
                            bol = false
                        }
                    }
                    return bol
                })
            },
            //重置
            handleReset() {
                this.search = {};
                this.handleSearch();
            },
            //分页
            pageChange(val) {
                this.pageNo = val
                this.handleSearch()
            },
            //关闭弹框
            closeDrawer() {
                this.imgShow = false;
            },
            //预上画
            getPrePaint(params) {
                this.prePaintShow = true;
                this.preSearchData = this.tableList[params.row._index];
                this.$refs.preData.getPreSearchData(this.preSearchData);  //动态传值给子组件

            },
            goToUpload(name, params) {
                this.editTitle = name;
                this.$refs.task.getShowFalg(this.editTitle);
                this.imgShow = true;
                this.editData = this.tableList[params.row._index];

                this.editData.titleName = name;  //title
            },
            //上传照片提交后的数据
            uploadImg(list) {
                console.log(list)
                this.closeDrawer();
            }
        },
        mounted() {
            this.tableList = this.initList.concat();
            this.total = this.tableList.length;
            this.preDetailData = this.initList.concat();  //预上画假设数据
        }
    }
</script>
<style>
	.demo-drawer-footer {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1px solid #e8e8e8;
		padding: 10px 16px;
		text-align: right;
		background: #fff;
		z-index: 3;
	}

	.search-con .search-input {
		margin-right: 10px;
	}

	.search-con .ivu-select {
		width: 200px;
		margin-right: 10px;
	}

	.ivu-btn {
		margin-right: 5px;
	}

	.ivu-date-picker{
		margin-right: 20px;
	}
</style>
