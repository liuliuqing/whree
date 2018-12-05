<template>
	<div>
		<Card>
			<div class="search-con search-con-top">
				<Input clearable placeholder="小区编号" class="search-input" v-model="search.communityId" @on-enter="handleSearch" />
				<Input clearable placeholder="小区名称" class="search-input" v-model="search.communityName" @on-enter="handleSearch" />
				<Input clearable placeholder="维护人员" class="search-input" v-model="search.maintenancePersonnel" @on-enter="handleSearch" />
                <Input clearable placeholder="点位名称" class="search-input" v-model="search.ptName" @on-enter="handleSearch" />
        		<Select v-model="search.salesStatus" filterable clearable placeholder="售卖状态">
					<Option v-for="item in M_salesStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
        		<Select v-model="search.adUploadStatus" filterable clearable placeholder="上画状态">
					<Option v-for="item in M_adUploadStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>

				<Button @click="handleSearch" class="search-btn" type="primary">
					<Icon type="search" />查询
				</Button>
				<Button @click="handleReset('search')" class="search-btn" type="primary">
					<Icon type="search" />重置
				</Button>
			</div>
			<Table border :columns="columns" :data="tableList"></Table>
			<div style="margin: 10px;overflow: hidden">
				<div style="float: right;">
					<Page show-total :total="total" :page-size="pagesize" :current="pageNo" @on-change="pageChange"></Page>
				</div>
			</div>
		</Card>
	</div>
</template>
<script>
	import '_c/tables/index.less'
	export default {
		data() {
			return {
				search: {
					communityId: '',
					communityName: '',
					maintenancePersonnel: '',
					ptName: '',
                    salesStatus: '',
                    adUploadStatus: '',
                },
				pageNo: 1,
				total: 1,
				pagesize: 10,
				columns: [
					{
						title: '点位编号',
						width: '8%',
						key: 'ptId',
						align: 'center',
					}, {
						title: '点位名称',
						width: '10%',
						key: 'ptName',
					}, {
						title: '点位地址',
						width: '10%',
						key: 'ptAddress',
					}, {
                        title: '省份',
                         width: '8%',
						key: 'communityProvince',
					}, {
                        title: '城市',
                          width: '8%',
						key: 'communityCity',
					}, {
                        title: '区县',
                          width:'8%',
						key: 'communityDistrict',
					},{
                        title: '小区编号',
                        width: '5%',
						key: 'communityId',
					},{
                        title: '小区名称',
                        width:'8%',
						key: 'communityName',
					},
					{
                        title: '售卖开始时间',
                        width: '10%',
						key: 'timeZoneBegin',
					},{
                        title: '售卖结束时间',
                        width: '10%',
						key: 'timeZoneEnd',
					},{
                        title: '售卖状态',
                        width: '10%',
						key: 'salesStatus',
						render: (h, params) => {
                            return h('span', params.row.salesStatus && this.M_salesStatus.find(val => val.value == params.row.salesStatus).label);
                        }
					},{
                        title: '上画状态',
                        width: '10%',
						key: 'adUploadStatus',
						render: (h, params) => {
                            return h('span', params.row.adUploadStatus && this.M_adUploadStatus.find(val => val.value == params.row.adUploadStatus).label);
                        }
					},{
                        title: '操作',
						align: 'center',
						width: '200px',
						key: 'action',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									style: {
                                        display: params.row.adUploadStatus == '1' ? '' : 'none'
                                    },
									on: {
										click: () => {
//											this.edit(params);
										}
									}
                                }, '取消上画'),
                                h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									style: {
                                        display: params.row.adUploadStatus == '2' ? '' : 'none'
                                    },
									on: {
										click: () => {

										}
									}
								}, '上画'),
								h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									style: {
                                        display: params.row.salesStatus == '2' ? '' : 'none'
                                    },
									on: {
										click: () => {

										}
									}
								}, '取消售卖'),
								h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									style: {
                                        display: params.row.salesStatus == '1' ? '' : 'none'
                                    },
									on: {
										click: () => {

										}
									}
								}, '售卖'),
							]);
						}
					}
				],
                communityProvinceArr:[],
                communityCityArr:[],
                communityDistrictArr:[],
				tableList: [],
				initList: [{
					ptId: 'DW00001',
					ptName: '天福小区',
					ptAddress: '海雅缤纷城2栋',
					communityProvince: '广东',
                    communityCity: '深圳',
                    communityDistrict: '南山',
					communityId: 'SZLH0001',
					communityName: '星海名城1',
					timeZoneBegin: '2018-10-20',
					timeZoneEnd: '2018-11-21',
					salesStatus: '1',
                    adUploadStatus: '2',
				}, {
					ptId: 'DW00002',
					ptName: '天福小区1',
					ptAddress: '海雅缤纷城3栋',
					communityProvince: '北京',
                    communityCity: '朝阳',
                    communityDistrict: '丰台',
					communityId: 'SZLH0002',
					communityName: '星海名城2',
					timeZoneBegin: '2018-11-20',
					timeZoneEnd: '2018-12-21',
					salesStatus: '2',
                    adUploadStatus: '1',
                }],
                initProvinceList: [{
                    value: 'guangdong',
                    label:'广东',
                },
                {
                    value: 'beijing',
                    label:'北京',
                }],
                initCityList: [{
                    value: 'shenzhen',
                    label:'深圳',
                },
                {
                    value: 'chaoyang',
                    label:'朝阳',
                },],
                initDistrictList: [{
                    value: 'nanshan',
                    label:'南山',
                },
                {
                    value: 'fengtai',
                    label:'丰台',
                },],
			}
		},
		methods: {
			handleSearch() {
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
			pageChange(val) {
				this.pageNo = val
				this.handleSearch()
            },

		},
		mounted() {
			this.tableList = this.initList.concat();
            this.total = this.initList.length;
            //省份列表
            this.communityProvinceArr=this.initProvinceList.concat();
            //城市列表
            this.communityCityArr=this.initCityList.concat();
            //地区列表
            this.communityDistrictArr=this.initDistrictList.concat();
		}
	}
</script>
<style>
	table{width: 100% !important}
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