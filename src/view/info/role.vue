<template>
	<div>
		<h2>角色维护</h2>
		<Card v-show="false">
			<div class="search-con search-con-top">
				<Input clearable placeholder="订单编号" class="search-input" v-model="search.orderId" @on-enter="handleSearch" />
				<Select v-model="search.orderStatus" clearable placeholder="请选择订单状态" @on-enter="handleSearch">
					<Option v-for="item in M_orderStatusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input clearable placeholder="销售人编号" class="search-input" v-model="search.createdById" @on-enter="handleSearch" />
				<Input clearable placeholder="销售人名称" class="search-input" v-model="search.createdBy" @on-enter="handleSearch" />
				<Button @click="handleSearch" class="search-btn" type="primary">
					<Icon type="search" />查询
				</Button>
				<Button @click="handleReset" class="search-btn" type="primary">
					<Icon type="search" />重置
				</Button>
				<Button @click="handleSubmit" class="search-btn" type="primary">
					<Icon type="search" />提交
				</Button>
				<Button @click="handleAdd" class="search-btn" type="primary">
					<Icon type="search" />新增
				</Button>
			</div>
			<Table border :columns="columns" :data="tableList" @on-selection-change="selectChange"></Table>
			<div style="margin: 10px;overflow: hidden">
				<div style="float: right;">
					<Page show-total :total="total" :page-size="pagesize" :current="pageNo" @on-change="pageChange"></Page>
				</div>
			</div>
		</Card>
		<Drawer :title="editTitle" v-model="editShow" width="720" :mask-closable="true" :styles="styles" @on-close="closeDrawer">
			<Form :model="editData" ref="editData" :rules="ruleCustom">
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="订单编号" prop="orderId" label-position="top">
						<Input disabled v-model="editData.orderId" placeholder="请输入订单编号" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="销售人员名称" prop="createdBy" label-position="top">
						<Select v-model="editData.createdBy" clearable filterable placeholder="请选择销售人员" @on-change="changeCreatedBy($event)">
							<Option v-for="item in M_saleName" :value="item.label" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
					<FormItem label="销售人员编号" prop="createdById" label-position="top">
						<Input v-model="editData.createdById" placeholder="请输入销售人员编号" />
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="提交日期" prop="submitDate" label-position="top">
						<Input disabled v-model="editData.submitDate" placeholder="请输入提交日期" />
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div class="demo-drawer-footer">
				<Button style="margin-right: 8px" @click="closeDrawer">取消</Button>
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
				search: {
					orderId: '',
					submitDate: '',
					createdById: '',
					createdBy: '',
					orderStatus: '',
				},
				//indNo: '',
				pageNo: 1,
				total: 1,
				pagesize: 10,
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '订单编号',
						key: 'orderId',
					}, {
						title: '提交日期',
						key: 'submitDate',
						render: (h, params) => {
							return h('span', this.M_dateFormat(params.row.submitDate));
						}
					}, {
						title: '销售人编号',
						key: 'createdById',
					}, {
						title: '销售人名称',
						key: 'createdBy',
					}, {
						title: '订单状态',
						key: 'orderStatus',
						render: (h, params) => {
							return h('span', params.row.orderStatus && this.M_orderStatusArr.find(val => val.value == params.row.orderStatus)
								.label);
						}
					}, {
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
											this.detailShow = true
											this.detailData = this.tableList[params.row._index]
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										size: 'small',
										type: 'primary',
									},
									style: {
										display: params.row.orderStatus == '1' || params.row.orderStatus == '3' ? '' : 'none'
									},
									on: {
										click: () => {
											this.editTitle = '编辑';
											this.editShow = true;
											this.editData = this.M_deepCopy(this.tableList[params.row._index]);
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									style: {
										display: params.row.orderStatus == '1' || params.row.orderStatus == '3' ? '' : 'none'
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: '提示',
												content: '<p>确定删除该订单</p>',
												onOk: () => {
													console.log(params.row.orderId)
													this.tableList.splice(params.row._index, 1)
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
				detailShow: false,
				detailData: {},
				editShow: false,
				editData: {},
				ruleCustom: {
					orderId: [{
						required: true,
						message: '订单编号不能为空',
						trigger: 'blur'
					}],
					createdBy: [{
						required: true,
						message: '销售人员不能为空',
						trigger: 'blur'
					}],
					createdById: [{
						required: true,
						message: '销售人员编号不能为空',
						trigger: 'blur'
					}],
					submitDate: [{
						required: true,
						message: '提交日期不能为空',
						trigger: 'blur'
					}]
				},
				tableList: [],
				initList: [{
					orderId: '0000001',
					submitDate: '20181127',
					createdById: '10004',
					createdBy: '张三',
					orderStatus: '1'
				}, {
					orderId: '0000002',
					submitDate: '20181227',
					createdById: '10004',
					createdBy: '张三',
					orderStatus: '2'
				}, {
					orderId: '0000006',
					submitDate: '20181121',
					createdById: '10004',
					createdBy: '张三',
					orderStatus: '1'
				}, {
					orderId: '0000009',
					submitDate: '20181122',
					createdById: '10006',
					createdBy: '李四',
					orderStatus: '4'
				}, {
					orderId: '0000011',
					submitDate: '20181128',
					createdById: '10006',
					createdBy: '李四',
					orderStatus: '3'
				}, {
					orderId: '0000013',
					submitDate: '20181128',
					createdById: '10008',
					createdBy: '王小',
					orderStatus: '5'
				}],
				excelList: [],
			}
		},
		methods: {
			//查询
			handleSearch() {
				let params = {
					'pageSize': this.pageSize,
					'pageNo': this.pageNo - 1
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
				// this._ajaxSubmit('wcsQueryIndList.do', params, (res) => {
				//     if(res.errorCode == '0000') {
				//         this.tableList = res.indList
				//         this.total = Number(res.total) || this.total
				//     }
				// })
			},
			//重置
			handleReset() {
				this.search = {};
				this.handleSearch();
			},
			//提交
			handleSubmit() {},
			//新增
			handleAdd() {
				this.editTitle = '新增';
				this.editShow = true;
				this.editData = {};

				//虚拟数据
				this.editData.orderId = '0000014';
				setTimeout(()=> {
					this.$refs.myExcel.handleRemove();    //上传文件清空，  this.$refs.myExcel调用子组件方法  ref="myExcel"
				},0)
			},
			//分页
			pageChange(val) {
				this.pageNo = val
				this.handleSearch()
			},
			// editSearch() {
			// 	let params = {
			// 		'indNo': this.indNo,
			// 	}
			// 	this._ajaxSubmit('queryLinkInfo.do', params, (res) => {
			// 		if(res.errorCode == '0000') {
			// 			this.editData = res
			// 			this.editData.indNo = this.indNo
			// 		}
			// 	})
			// },
			//新增、编辑: 提交
			editSubmit(name) {
				console.log(this.excelList)  //导入的表数据
				this.$refs[name].validate((valid) => {   //表单校验
					if (valid) {
						if (this.editTitle == '新增') {
							this.tableList.push(this.editData);
							this.editData.orderStatus = "2";
							this.$Message.success('提交成功!');
						} else {
							this.$Message.success('修改成功!');
						}
						this.editShow = false;
					} else {
						//this.$Message.error('表单验证失败!');
					}
				})
				// this._ajaxSubmit('fillLinkInfo.do', this.editData, (res) => {
				//     if(res.errorCode == '0000') {
				//         // this.editData = res
				//         this.$Message.success('客户资料修改完成！');
				//         this.editShow = false
				//         this.handleSearch()
				//     }
				// })
			},
			//关闭弹框
			closeDrawer() {
				this.$refs.editData.resetFields();   //清空表单验证内容
				this.editShow = false;
			},
			//新增编辑时销售人员与编号联动
			changeCreatedBy(event) {
				if (!event) {
					this.editData.createdById = "";
					return;
				}
				//M_saleName假数据
				this.M_saleName.find(val => {
					if (val.label == event) {
						this.editData.createdById = val.value;
					}
				})
			},
			/**
			 * 子组件传值给父组件
			 * @excelDos="excelDo"
			 * @excelDos 子组件页面方法， excelDo父组件页面方法
			 */
			excelDo(list) {
				this.excelList = list;
			},
			//table多选
			selectChange(selection) {
				console.log(selection)  //selection[]
			},
		},
		mounted() {
			this.tableList = this.initList.concat();
			this.total = this.tableList.length;
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
