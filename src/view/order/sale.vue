<template>
	<div>
		<Card>
			<div class="search-con search-con-top">
				<Input clearable placeholder="订单编号" class="search-input" v-model="search.orderId" @on-enter="handleSearch" />
				<Select v-model="search.orderStatus" clearable placeholder="请选择订单状态" @on-enter="handleSearch">
					<Option v-for="item in M_orderStatusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input clearable placeholder="销售人编号" class="search-input" v-model="search.createdById" @on-enter="handleSearch" />
				<Input clearable placeholder="销售人名称" class="search-input" v-model="search.createdBy" @on-enter="handleSearch" />
				<Button @click="handleSearch" class="search-btn" type="primary">
					<Icon type="search" />&nbsp;&nbsp;查询
				</Button>
				<Button @click="handleReset" class="search-btn" type="primary">
					<Icon type="search" />&nbsp;&nbsp;重置
				</Button>
				<Button @click="handleSubmit" class="search-btn" type="primary">
					<Icon type="search" />&nbsp;&nbsp;提交
				</Button>
				<Button @click="handleAdd" class="search-btn" type="primary">
					<Icon type="search" />&nbsp;&nbsp;新增
				</Button>
			</div>
			<Table border :columns="columns" :data="tableList"></Table>
			<div style="margin: 10px;overflow: hidden">
				<div style="float: right;">
					<!-- <Page :total="total" :page-size="_pageSize" :current="pageNo" @on-change="pageChange"></Page> -->
				</div>
			</div>
		</Card>
		<Drawer :title="editTitle" v-model="editShow" width="720" :mask-closable="true" :styles="styles">
			<Form :model="editData">
				<Row :gutter="32">
					<Col span="12">
						<FormItem label="订单编号" label-position="top">
							<Input v-model="editData.orderId" placeholder="请输入订单编号" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="销售人员" label-position="top">
							<Input v-model="editData.createdBy" placeholder="请输入销售人员" />
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
						<FormItem label="销售人员编号" label-position="top">
							<Input v-model="editData.createdById" placeholder="请输入销售人员编号" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="提交日期" label-position="top">
							<Input v-model="editData.submitDate" placeholder="请输入提交日期" />
						</FormItem>
					</Col>
				</Row>
			</Form>
			<div class="demo-drawer-footer">
				<Button style="margin-right: 8px" @click="editShow = false">取消</Button>
				<Button type="primary" @click="editSubmit">提交</Button>
			</div>
		</Drawer>
		<Drawer width="640" v-model="detailShow">
			<sale-detail :detail-data="detailData"></sale-detail>
		</Drawer>
	</div>
</template>
<script>
	import '_c/tables/index.less'
	import SaleDetail from './saleDetail'
	export default {
		components: {
			SaleDetail
		},
		data() {
			return {
				search: {
					orderId: '',
					submitDate: '',
					createdById: '',
					createdBy: '',
					orderStatus: '',
				},
				indNo: '',
				pageNo: 1,
				total: 0,
				columns: [
					{
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
							return h('span', params.row.orderStatus && this.M_orderStatusArr.find(val => val.value == params.row.orderStatus).label);
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
										type: 'primary'
									},
									on: {
										click: () => {
											this.editShow = true
											this.editData = this.tableList[params.row._index]
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
											this.editTitle = '编辑'
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
				tableList: [],
				initData: {
					orderId: '',
					submitDate: '',
					createdById: '',
					createdBy: '',
					orderStatus: ''
				},
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
					orderId: '0000031',
					submitDate: '20181120',
					createdById: '10007',
					createdBy: '王五',
					orderStatus: '1'
				}, {
					orderId: '0000042',
					submitDate: '20181027',
					createdById: '10009',
					createdBy: '赵六',
					orderStatus: '1'
				}, ]
			}
		},
		methods: {
			getLink(v) {
				console.log(v)
				console.log(this.linkStatusList.find(val => val.value == v))
				// this.linkStatusList.find(val => v.value == v)[0].label
			},
			handleSearch() {
				let params = {
					'pageSize': this.pageSize,
					'pageNo': this.pageNo - 1
				}
				params = Object.assign({}, params, this.search)
				this.tableList = this.tableList.filter(v => {
					let bol = true
					for(let i in this.search) {
						if(this.search[i] && this.search[i] != v[i]) {
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
			handleReset() {},
			handleSubmit() {},
			handleAdd() {
				this.editTitle = '新增'
				this.editShow = true
				this.editDetail = this.initData
			},
			pageChange(val) {
				this.pageNo = val
				this.handleSearch()
			},
			editSearch() {
				let params = {
					'indNo': this.indNo,
				}
				this._ajaxSubmit('queryLinkInfo.do', params, (res) => {
					if(res.errorCode == '0000') {
						this.editData = res
						this.editData.indNo = this.indNo
					}
				})
			},
			editSubmit() {
				this.editShow = false
				if(this.editTitle == '新增') {
					this.tableList.push(this.editData)
				}
				// this._ajaxSubmit('fillLinkInfo.do', this.editData, (res) => {
				//     if(res.errorCode == '0000') {
				//         // this.editData = res
				//         this.$Message.success('客户资料修改完成！');
				//         this.editShow = false
				//         this.handleSearch()
				//     }
				// })
			},
			valchange(val) {
				console.log(val)
				this.editShow = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
			},
		},
		mounted() {
			this.tableList = this.initList.concat()
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