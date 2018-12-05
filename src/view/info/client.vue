<template>
	<div>
		<Card>
			<div class="search-con search-con-top">
				<Input clearable placeholder="客户编号" class="search-input" v-model="search.custormerId" @on-enter="handleSearch" />
				<Input clearable placeholder="客户名称" class="search-input" v-model="search.custormerName" @on-enter="handleSearch" />
				<Button @click="handleSearch" class="search-btn" type="primary">
					<Icon type="search" />查询
				</Button>
				<Button @click="handleReset('search')" class="search-btn" type="primary">
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
		<Drawer :title="editTitle" v-model="editShow" width="720" :mask-closable="true" :styles="styles"  @on-close="editCancel">
			<Form  ref="editData"  :model="editData" :rules="ruleValidate">
				<Row :gutter="32">
					<Col span="12">
						<FormItem label="客户编号"  prop="custormerId"  label-position="top">
							<Input  v-model="editData.custormerId" type="text" placeholder="请输入客户编号" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="客户名称"  prop="custormerName" label-position="top">
							<Input v-model="editData.custormerName" type="text" placeholder="请输入客户名称" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="客户电话"  prop="phoneNo" label-position="top">
							<Input v-model="editData.phoneNo" number type="text" placeholder="请输入客户电话" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="客户方代表"  prop="custormerRep" label-position="top">
							<Input v-model="editData.custormerRep" type="text" placeholder="请输入客户方代表" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="客户地址"  prop="adress" label-position="top">
							<Input v-model="editData.adress" type="textarea" placeholder="请输入客户地址" />
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
	import '_c/tables/index.less'
	export default {
		data() {
			return {
				 ruleValidate: {
                    custormerId: [
                        { required: true, message: '客户编号不能为空', trigger: 'blur' }
                    ],
                    custormerName: [
                        { required: true, message: '客户名称不能为空', trigger: 'blur' }
                    ],
                    phoneNo: [
                        { required: true, message: '客户电话不能为空', trigger: 'blur' }
                    ],
                    custormerRep: [
                        { required: true, message: '客户方代表不能为空', trigger: 'blur' }
                    ],
                    adress: [
                        { required: true,  message: '客户地址不能为空', trigger: 'blur' },
                    ],
                },
				search: {
					custormerId: '',
					custormerName: '',
                },
				pageNo: 1,
				total: 1,
				pagesize: 10,
				columns: [
					{
						title: '客户编号',
						key: 'custormerId',
					}, {
						title: '客户名称',
						key: 'custormerName',
					}, {
                        title: '客户方代表',
						key: 'custormerRep',
					}, {
                        title: '客户电话',
						key: 'phoneNo',
					}, {
                        title: '客户地址',
						key: 'adress',
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
                                h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									on: {
										click: () => {

										}
									}
								}, '启用'),
								h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									on: {
										click: () => {

										}
									}
								}, '停用'),
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
				tableList: [],
				initList: [{
					custormerId: 'KH0100',
					custormerName: '张有钱',
					custormerRep: '张大',
					phoneNo: '15026833975',
                    dataState: '1',
                    adress:'南山大道'
				}, {
					custormerId: 'KH0100',
					custormerName: '王有钱',
					custormerRep: '王大将军',
					phoneNo: '18026833975',
                    dataState: '2',
                    adress:'皇后大道'
                }],
			}
		},
		methods: {
			handleSearch(id) {
				let params = {
					'pageSize': this.pageSize,
					'pageNo': this.pageNo - 1
				}
				params = Object.assign({}, params, this.search)
				this.tableList = this.initList.concat();
				this.tableList = this.tableList.filter(v => {
                    let bol = true
					for(let i in this.search) {
						if(this.search[i] && this.search[i] != v[i]) {
							bol = false
						}
					}
					return bol
				})
			},
			handleReset(name) {
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
            //编辑页面提交    分修改与新增
			editSubmit(name) {
				 this.$refs[name].validate((valid) => {
                    if (valid) {
						if(this.editTitle == '新增') {
							this.editAdd();
						}
						else if(this.editTitle == '编辑') {
							this.editMoify();
						}
						this.$Message.success('提交成功!');

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })

            },
            //取消编辑
            editCancel(){
                this.editShow = false
				this.$refs.editData.resetFields();   //清空表单验证内容
            },
            //进入编辑页面
            edit(params){
                this.editTitle= '编辑';
                this.editShow = true;
                this.editData =this.M_deepCopy(this.tableList[params.row._index]);

                console.log(this.editData)

            },
            //修改数据
            editMoify(){
                this.editShow = false;
            },
            //添加
            editAdd(){
                this.editShow = false;
                this.tableList.push(this.editData);
			}
		},
		mounted() {
			this.tableList = this.initList.concat();
            this.total = this.initList.length;
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