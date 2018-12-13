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
                <Button @click="handleSearch" class="search-btn" type="primary">
                    <Icon type="search" />查询
				</Button>
                <Button @click="handleReset" class="search-btn" type="primary">
                    <Icon type="search" />重置
				</Button>
                <Button @click="passSubmit('1')" class="search-btn" type="primary">
                    <Icon type="search" />通过
				</Button>
                <Button @click="passSubmit('0')" class="search-btn" type="primary">
                    <Icon type="search" />不通过
				</Button>
            </div>
            <Table border ref="table" :columns="columns" :data="tableList" @on-selection-change="selectChange"></Table>
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
//                    taskStatus: '',
                },
                pageNo: 1,
                total: 1,
                pagesize: 10,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
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
            },
            //table多选
            selectChange(selection) {
                this.selectedList = selection;
            },
            passSubmit(type) {
                if (this.selectedList.length <= 0) {
                    this.$Message.success('请先选择一条数据!');
                    return false;
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确定'+ (type=='1' ? '通过' : '退回') +'该订单</p>',
                        onOk: () => {
                            this.changeOrderState(type);
                        }
                    })
                }
            },
            changeOrderState(type) {
                let mes = type == '1' ? '通过' : '退回';
                let _list = [];
                this.tableList.forEach((i, index) => {
                    this.selectedList.forEach((j, j_index) => {
                        if (i.taskId == j.taskId) {
                            _list.push({
                                _index: index,
                                _data: i
                            })
                        }
                    })
                })
                _list.forEach((item, index) => {
                    //只有已提交订单才可以进行审批操作
                    if (item._data.taskStatus == '2') {
                        //审批操作。。。
                        this.tableList[_list[index]._index].taskStatus = type == '1' ? '4' : '3'; //审批成功后修改状态
                        this.disabledList();
                        this.$Message.success(mes + '成功!');
                    } else {
//                        this.$Message.success('该状态无法审批!');
                    }
                })
            },
            //"已提交"才可以进行操作,其余置灰选择框
            disabledList() {
                this.tableList.forEach((item, index)=>{
                    if(item.taskStatus != '2'){
                        item._disabled = true;
                    }else{
                        item._disabled = false;
                    }
                })
            }
        },
        mounted() {
            this.tableList = this.initList.concat();
            this.disabledList();

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
</style>
