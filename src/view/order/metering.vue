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
					<Icon type="search" />查询
				</Button>
				<Button @click="handleReset" class="search-btn" type="primary">
					<Icon type="search" />重置
				</Button>
				<Button @click="passSubmit('list','1')" class="search-btn" type="primary">
					<Icon type="search" />通过
				</Button>
				<Button @click="passSubmit('list','0')" class="search-btn" type="primary">
					<Icon type="search" />不通过
				</Button>
			</div>
			<Table border ref="table" :columns="columns" :data="tableList" @on-selection-change="selectChange" @on-select="selectSinge"></Table>
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
				<Table border :columns="columnsDet" :data="tableListDet"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-total :total="totalDet" :page-size="pagesizeDet" :current="pageNoDet" @on-change="pageChangeDet"></Page>
					</div>
				</div>
			</Form>
			<div class="demo-drawer-footer">
				<Button style="margin-right: 8px" @click="closeDrawer">取消</Button>
				<Button type="primary" @click="passSubmit('det','1')">通过</Button>
				<Button type="primary" @click="passSubmit('det','0')">不通过</Button>
			</div>
		</Drawer>
		<Drawer width="640" v-model="detailShow">
			<sale-detail :detail-data="detailData"></sale-detail>
		</Drawer>
	</div>
</template>
<script>
	import '_c/tables/index.less'
	import SaleDetail from './saleDetail';
	export default {
		components: {
			SaleDetail,
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
				//indNo: '',
				pageNo: 1,
				total: 1,
				pagesize: 10,
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						type: 'index',
						width: 60,
						align: 'center',
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
										display: params.row.orderStatus == '2' ? '' : 'none'
									},
									on: {
										click: () => {
											this.editTitle = '编辑';
											this.editShow = true;
											this.editData = this.M_deepCopy(this.tableList[params.row._index])
											this.$refs.table.selectAll(false); //取消选中状态
										}
									}
								}, '编辑')
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
					orderStatus: '3'
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
					orderStatus: '2'
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
				selectedList: [],
				pageNoDet: 1,
				totalDet: 1,
				pagesizeDet: 10,
				columnsDet: [
					{title: '订单编号',key: 'orderId'}, 
					{title: '小区编号',key: 'communityId'}, 
					{title: '小区名称',key: 'communityName'}, 
					{title: '点位编号',key: 'ptId'}, 
					{title: '售卖开始时间',key: 'timeZoneBegin'}, 
					{title: '售卖结束时间',key: 'timeZoneEnd'}, 
					{title: '客户编号',key: 'custormerId'}, 
					{title: '客户名称',key: 'custormerName'}, 
				],
				tableListDet: [
				 	{
				 		orderId: '0000001',
				 		communityId: 'SZ00001',
				 		communityName: '星海名城',
				 		ptId: 'DW000001',
				 		timeZoneBegin: '2018-10-20',
						timeZoneEnd: '2018-10-27',
						custormerId: 'KN00001',
						custormerName: '张大爷',
				 	}
				]	
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
			},
			//重置
			handleReset() {
				this.search = {};
				this.handleSearch();
			},
			//通过1，不通过0
			passSubmit(state, type) {
				if (state == 'det') {
					this.$refs.editData.validate((valid) => { //表单校验
						if (valid) {
							this.tableList.forEach((i, index) => {
								if (this.editData.orderId == i.orderId) {
									this.tableList[index].orderStatus = type == '1' ? '4' : '3';
								}
							})
							this.editShow = false;
						} else {
							// this.$Message.error(mes + '失败!');
						}
					})
					return false;
				} else {
					if (this.selectedList.length <= 0) {
						this.$Message.success('请先选择一条数据!');
						return false;
					} else {
						this.changeOrderState(type);
					}
				}
			},
			changeOrderState(type) {
				let mes = type == '1' ? '通过' : '不通过';
				let _list = [];
				this.tableList.forEach((i, index) => {
					this.selectedList.forEach((j, j_index) => {
						if (i.orderId == j.orderId) {
							_list.push({
								_index: index,
								_data: i
							})
						}
					})
				})
				_list.forEach((item, index) => {
					//只有已提交订单才可以进行审批操作
					if (item._data.orderStatus == '2') {
						//审批操作。。。
						this.tableList[_list[index]._index].orderStatus = type == '1' ? '4' : '3'; //审批成功后修改状态
						this.$Message.success(mes + '审批成功!');
					} else {
						this.$Message.success('该状态无法审批!');
					}
				})
			},
			//分页
			pageChange(val) {
				this.pageNo = val
				this.handleSearch()
			},
			pageChangeDet(val) {
				this.pageNoDet = val
			},
			//关闭弹框
			closeDrawer() {
				this.$refs.editData.resetFields(); //清空表单验证内容
				this.editShow = false;
			},
			//新增编辑时销售人员与编号联动
			changeCreatedBy(event) {
				if (!event) {
					this.editData.createdById = "";
					return;
				}
				//this.M_saleName 为人员列表假数据
				this.M_saleName.find(val => {
					if (val.label == event) {
						this.editData.createdById = val.value;
					}
				})
			},
			//table多选
			selectChange(selection) {
				this.selectedList = selection;
			},
			selectSinge(selection, row) {
				//不是已提交不能操作
			}
		},
		mounted() {
			this.tableList = this.initList.concat();
			this.total = this.tableList.length;
			this.totalDet = this.tableListDet.length;
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
