<template>
    <div>
        <Card>
            <div class="search-con search-con-top">
                <Input clearable placeholder="合同编号" class="search-input" v-model="search.contractId" @on-enter="handleSearch" />
                <Input clearable placeholder="合同名称" class="search-input" v-model="search.contractName" @on-enter="handleSearch" />
                <!--<Select v-model="search.staffType" clearable placeholder="员工类型">
                    <Option v-for="item in M_StaffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>-->
                <Button @click="handleSearch" class="search-btn" type="primary">
                    <Icon type="search" />查询
				</Button>
                <Button @click="handleReset()" class="search-btn" type="primary">
                    <Icon type="search" />重置
				</Button>
                <Button @click="handleAdd" class="search-btn" type="primary">
                    <Icon type="search" />新增
				</Button>
            </div>
            <Table border :columns="columns" :data="tableList"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page show-total :total="total" :page-size="pagesize" :current="pageNo" @on-change="pageChange"></Page>
                </div>
            </div>
        </Card>
        <Drawer :title="editTitle" v-model="editShow" width="720" :mask-closable="true" :styles="styles"  @on-close="editCancel">
            <Form  ref="editData"  :model="editData" :rules="ruleValidate">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="合同编号"  prop="contractId"  label-position="top">
                            <Input clearable v-model="editData.contractId" type="text" placeholder="请输入合同编号" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="合同名称"  prop="contractName" label-position="top">
                            <Input clearable v-model="editData.contractName" type="text" placeholder="请输入合同名称" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="合同签订时间"  prop="orderTime" label-position="top">
                            <DatePicker clearable type="date" placeholder="合同签订时间" :editable=false v-model="editData.orderTime" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12" label="Date">
                        <FormItem label="合同开始时间"  prop="contactTimeBegin" label-position="top">
                            <DatePicker clearable type="date" placeholder="合同开始时间" :editable=false v-model="editData.contactTimeBegin" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="合同结束时间"  prop="contactTimeEnd" label-position="top">
                            <DatePicker clearable type="date" placeholder="合同结束时间" :editable=false v-model="editData.contactTimeEnd" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户名称"  prop="custormerName" label-position="top">
                            <Select clearable v-model="editData.custormerName" clearable filterable placeholder="请选择客户名称">
                                <Option v-for="item in M_saleName" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="销售人名称"  prop="salesName" label-position="top">
                            <Select clearable v-model="editData.salesName" clearable filterable placeholder="请选择销售人名称">
                                <Option v-for="item in M_saleName" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="editCancel">取消</Button>
                <Button type="primary" @click="editSubmit('editData')">提交</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    import '_c/tables/index.less';
    export default {
        data() {
            return {
                editData: {
                    contractId: '',
                    contractName: '',
                    orderTime: '',
                    contactTimeBegin: '',
                    contactTimeEnd: '',
                    custormerName: '',
                    salesName: '',
                },
                ruleValidate: {
                    contractId: [
                        {required: true,message:'合同编号不能为空', trigger: 'blur' }
                    ],
                    contractName: [
                        { required: true, message: '合同名称不能为空', trigger: 'blur' }
                    ],
                    orderTime: [
                        { required: true, type: 'date', message: '合同签订时间不能为空', trigger: 'change' }
                    ],
                    contactTimeBegin: [
                        { required: true, type: 'date', message: '合同开始时间不能为空', trigger: 'change' }
                    ],
                    contactTimeEnd: [
                        { required: true, type: 'date', message: '合同结束时间不能为空', trigger: 'change' }
                    ],
                    custormerName: [
                        { required: true,  message: '客户名称不能为空', trigger: 'change' },
                    ],
                    salesName: [
                        { required: true,  message: '销售人名称不能为空', trigger: 'change' },
                    ],
                },
                search: {
                    staffId: '',
                    staffName: '',
                    staffType: ''
               },
                pageNo: 1,
                total: 1,
                pagesize: 10,
                columns: [
                    {
                        title: '合同编号',
                        key: 'contractId',
                    }, {
                        title: '合同名称',
                        key: 'contractName',
                    }, {
                        title: '合同签订时间',
                        key: 'orderTime',
                    }, {
                        title: '合同开始时间',
                        key: 'contactTimeBegin',
                    }, {
                        title: '合同结束时间',
                        key: 'contactTimeEnd',
                    }, {
                        title: '客户名称',
                        key: 'custormerName',
                    }, {
                        title: '销售人名称',
                        key: 'salesName',
                    },{
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'primary'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'primary'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '提示',
                                                content: '<p>确定删除该合同</p>',
                                                onOk: () => {
                                                    this.tableList.splice(params.row._index, 1);
                                                },
                                            });
                                        }
                                    }
                                }, '删除'),
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
                editTitle: '编辑',
                editShow: false,
                editNoIndex: 0,
                tableList: [],
                initList: [{
                    contractId: 'HT000001',
                    contractName: '颗星一号',
                    orderTime: '2018-10-20',
                    contactTimeBegin: '2018-10-20',
                    contactTimeEnd: '2019-10-20',
                    custormerName:'张三',
                    salesName:'李四',
                }, {
                    contractId: 'HT000001',
                    contractName: '颗星让他号',
                    orderTime: '2018-11-20',
                    contactTimeBegin: '2018-11-20',
                    contactTimeEnd: '2019-12-20',
                    custormerName:'张三',
                    salesName:'王小',
                }],
            }
        },
        methods: {
            handleSearch(id) {
                let params = {
                    'pageSize': this.pageSize,
                    'pageNo': this.pageNo - 1
                }
                params = Object.assign({}, params, this.search);
                this.tableList = this.initList.concat();
                this.tableList = this.tableList.filter(v => {
                    let bol = true;
                    for(let i in this.search) {
                        if(this.search[i] && this.search[i] != v[i]) {
                            bol = false;
                        }
                    }
                    return bol;
                })
            },
            handleReset() {
                 this.search={};
                 this.handleSearch();
            },
            handleSubmit() {},
            handleAdd() {
                this.editTitle = '新增'
                this.editShow = true
                this.editData = {}
            },
            pageChange(val) {
                this.pageNo = val
                this.handleSearch()
            },
            //编辑页面提交    分修改与新增
            editSubmit(name) {
                 this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.editTitle == '新增') {
                            this.editAdd();
                        }
                        else if(this.editTitle == '编辑') {
                            this.editMoify();
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })

            },
            //取消编辑
            editCancel(){
                this.editShow = false;
                this.$refs.editData.resetFields();   //清空表单验证内容
            },
            //进入编辑页面
            edit(params){
                this.editTitle= '编辑';
                this.editShow = true;
                this.editNoIndex = params.row._index;
                this.editData =this.M_deepCopy(this.tableList[params.row._index]);
            },
            //修改数据
            editMoify(){
                this.editShow = false;
                this.$set(this.tableList,this.editNoIndex,this.editData);  //响应式更新列表
                this.$Message.success('修改成功!');
            },
            //添加
            editAdd(){
                this.editShow = false;
                this.tableList.push(this.editData);
                this.$Message.success('新增成功!');
            }
        },
        mounted() {
            this.tableList = this.initList.concat();
            this.total = this.initList.length;
        },
//        filters: {
//            replacePhone: function(value, discount) {
//                return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
//            }
//      }
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