<template>
    <div>
        <Card>
            <div class="search-con search-con-top">
                <Input clearable placeholder="员工编号" class="search-input" v-model="search.staffId" @on-enter="handleSearch" />
                <Input clearable placeholder="员工名称" class="search-input" v-model="search.staffName" @on-enter="handleSearch" />
                <Select v-model="search.staffType" clearable placeholder="员工类型">
                    <Option v-for="item in M_StaffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
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
                        <FormItem label="员工编号"  prop="staffId"  label-position="top">
                            <Input clearable v-model="editData.staffId" type="text" placeholder="请输入员工编号" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="员工名称"  prop="staffName" label-position="top">
                            <Input clearable v-model="editData.staffName" type="text" placeholder="请输入员工名称" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="登录账号"  prop="staffAccount" label-position="top">
                            <Input clearable v-model="editData.staffAccount" type="text" placeholder="请输入员工登录账号" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="登录密码"  prop="staffPassword" label-position="top">
                            <Input clearable v-model="editData.staffPassword" type="text" placeholder="请输入员工登录密码" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="员工电话"  prop="phoneNo" label-position="top">
                            <Input clearable v-model="editData.phoneNo" type="text" placeholder="请输入员工电话" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="身份证号码"  prop="IdNumber" label-position="top">
                            <Input clearable v-model="editData.IdNumber" type="text" placeholder="请输入员工身份证号码" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="赋予角色" prop="staffType" label-position="top">
                            <Select clearable v-model="editData.staffType" clearable filterable placeholder="请选择赋予角色">
                                <Option v-for="item in M_StaffType" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                ruleValidate: {
                    staffId: [
                        {required: true,message:'员工编号不能为空', trigger: 'blur' }
                    ],
                    staffName: [
                        { required: true, message: '员工名称不能为空', trigger: 'blur' }
                    ],
                    staffAccount: [
                        { required: true, message: '登录账号不能为空', trigger: 'blur' }
                    ],
                    staffPassword: [
                        { required: true, message: '登录密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 20, message: '不能少于20个字符', trigger: 'blur' }
                    ],
                    phoneNo: [
                        { required: true,  message: '员工电话不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^1(3|4|5|7|8)\d{9}$/, message:'请输入正确的身份证号', trigger:'blur'},
                    ],
                    IdNumber: [
                        { required: true,  message: '身份证号不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message:'请输入正确的身份证号', trigger:'blur'},
                    ],
                    staffType: [
                        { required: true,  message: '赋予角色不能为空', trigger: 'change' },
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
                        title: '员工编号',
                        key: 'staffId',
                    }, {
                        title: '员工名称',
                        key: 'staffName',
                    }, {
                        title: '员工账号',
                        key: 'staffAccount',
                    }, {
                        title: '员工账号密码',
                        key: 'staffPassword',
                        render: (h, params) => {
                            return h('span', this.M_replaceWithStar(params.row.staffPassword, 'all'));
                        }
                    }, {
                        title: '员工电话',
                        key: 'phoneNo',
                        render: (h, params) => {
                            return h('span', this.M_replaceWithStar(params.row.phoneNo, 'phone'));
                        }
                    }, {
                        title: '员工身份证',
                        key: 'IdNumber',
                    }, {
                        title: '员工类型',
                        key: 'staffType',
                        render: (h, params) => {
                            return h('span', params.row.staffType && this.M_StaffType.find(val => val.value == params.row.staffType).label);
                        }
                    }, {
                        title: '状态',
                        key: 'dataState',
                        render: (h, params) => {
                            return h('span', params.row.dataState && this.M_dataState.find(val => val.value == params.row.dataState).label);
                        }
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
                editData: {},
                editNoIndex: 0,
                tableList: [],
                initList: [{
                    staffId: 'YG000001',
                    staffName: 'uzi',
                    staffAccount: 'RNG-uzi',
                    staffPassword: 'uzi',
                    phoneNo: '18028730125',
                    IdNumber:'452239198911270268',
                    staffType:'2',
                    dataState:'1'
                }, {
                    staffId: 'YG000003',
                    staffName: 'mlxg',
                    staffAccount: 'RNG-mlxg',
                    staffPassword: 'mlxg',
                    phoneNo: '13488735699',
                    IdNumber:'452659199905024233',
                    staffType:'3',
                    dataState:'1'
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
                this.editTitle = '新增';
                this.editShow = true;
                this.editData = {};
            },
            pageChange(val) {
                this.pageNo = val;
                this.handleSearch();
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
        }
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