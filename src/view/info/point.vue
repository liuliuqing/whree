<template>
	<div>
		<Card>
			<div class="search-con search-con-top">
				<Input clearable placeholder="点位编号" class="search-input" v-model="search.pointId" @on-enter="handleSearch" />
				<Input clearable placeholder="小区名称" class="search-input" v-model="search.communityName" @on-enter="handleSearch" />

				<Button @click="handleSearch" class="search-btn" type="primary">
					<Icon type="search" />查询
				</Button>
				<Button @click="handleReset('search')" class="search-btn" type="primary">
					<Icon type="search" />重置
				</Button>
				<Button @click="handleSubmit" class="search-btn" type="primary">
					<Icon type="search" />提交
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
						<FormItem label="点位编号"  prop="pointId"  label-position="top">
							<Input  v-model="editData.pointId" placeholder="请输入小区编号" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="点位名称"  prop="pointName" label-position="top">
							<Input v-model="editData.pointName" placeholder="请输入小区名称" />
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="36">
						<FormItem label="点位地址" prop="pointAddress"  label-position="top">
							<Input v-model="editData.pointAddress"  type="textarea" :rows="4"  placeholder="请输入小区地址" />
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
						<FormItem label="广告位总数"  prop="totalNumber" label-position="top">
							<Input v-model="editData.totalNumber" placeholder="请输入广告位总数" />
						</FormItem>
					</Col>

						</Row>
				<Row :gutter="32">
											<Col span="12">
							<Select v-model="editData.Painter"   filterable clearable placeholder="请选择上画人员">
								<Option v-for="item in painterArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
					</Col>
						</Row>
						  <br />
				<Row :gutter="32">
                    <Col span="12">
						<Form-item prop="Province" >
							<Select v-model="editData.Province"   filterable clearable placeholder="请选择省份">
								<Option v-for="item in provinceArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item >

                    </Col>
                    <Col span="12">
					<Form-item  prop="City" >
                        <Select v-model="editData.City"  filterable clearable placeholder="请选择城市">
                            <Option v-for="item in cityArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
                        </Select>
					</Form-item >
                    </Col>
                     <br />
                    <Col span="12">
						<Form-item prop="District"  >
							<Select v-model="editData.District"    filterable clearable placeholder="请选择区县">
								<Option v-for="item in districtArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item >
                    </Col>

                    <Col span="12">
						<Form-item  prop="communityName" >
							<Select v-model="editData.communityName"  filterable  clearable placeholder="请选择小区名称">
								<Option v-for="item in communityArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item >
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
                    pointId: [
                        { required: true, message: '点位编号不能为空', trigger: 'blur' }
                    ],
                    pointName: [
                        { required: true, message: '点位名称不能为空', trigger: 'blur' }
                    ],
                    City: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    Province: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    District: [
                        { required: true,  message: '请选择区县', trigger: 'change' },
                    ],
                    Painter: [
                        { required: true,  message: '请选择上画人员', trigger: 'change' }
                    ],
                    pointAddress: [
                         { required: true, message: '小区地址不能为空', trigger: 'blur' }
                    ],
                    communityName: [
                         { required: true, message: '小区名称不能为空', trigger: 'change' }
					],
					totalNumber:[
					 { required: true, message:'广告位总数不能为空', trigger: 'blur' }
					 ]
                },
				search: {
					pointId: '',
					pointName: '',
					pointAddress: '',
					Province: '',
                    City: '',
                    District: '',
					communityId: '',
					communityName: '',
					Status: '',
                    Painter: '',
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
					{
						title: '点位编号',
						  width: 100,
						key: 'pointId',
					}, {
						title: '点位名称',
						  width: 120,
						key: 'pointName',
					}, {
                        title: '点位地址',
                         width: 150,
						key: 'pointAddress',
					}, {
                        title: '省份',
                         width: 70,
						key: 'Province',
					}, {
                        title: '城市',
                          width: 70,
						key: 'City',
					}, {
                        title: '区县',
                          width: 70,
						key: 'District',
					},{
                        title: '小区编号',
                        width: 110,
						key: 'communityId',
					},
					{
                        title: '小区名称',
                        width: 118,
						key: 'communityName',
					},{
                        title: '状态',
                        width:70,
						key: 'Status',
						render: (h, params) => {
							return h('span', params.row.Status && this.M_StatusArr.find(val => val.value == params.row.Status).label);
						}
					},{
						title: '上画人员',
						  width:70,
                        key: 'Painter',
                        render: (h, params) => {
							return h('div', [
                                h('Button', {
									props: {
										size: 'small',
										type: 'text'
									},
									on: {
										click: () => {
                                            this.edit(params);
										}
									}
								}, params.row.Painter),
							]);
                        }
					},{
                        title: '操作',
                         width: 200,
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
                provinceArr:[],
                cityArr:[],
                districtArr:[],
				painterArr:[],
				communityArr:[],
				tableList: [],
				initList: [{
					pointId: '0100',
					pointName: '宝安测试点',
					pointAddress: '麒麟新村3栋',
					Province: '广东',
                    City: '深圳',
					District: '南山',
					communityId: '0000001',
					communityName: '天福小区',
					Status: '0',
                    Painter: '柳柳青',
				}, {
					pointId: '0101',
					pointName: '南山测试点',
					pointAddress: '灶下村2栋',
					communityId: '0000002',
					communityName: '南山小区',
					Province: '北京',
                    City: '朝阳',
                    District: '丰台',
					Status: '1',
                    Painter: '柳青',
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
   				initCommunityList: [{
                    value: '0000002',
                    label:'南山小区',
                },
                {
                    value: '0000001',
                    label:'天福小区',
                },],
                initPainterList: [{
                    value: 'liuqing',
                    label:'柳青',
                },
                {
                    value: 'liuliuqing',
                    label:'柳柳青',
                },]
			}
		},
		methods: {
			handleSearch() {
				//清除小区名称查询条件
				if(this.search.communityName==''){
					this.search.communityId = '';
				}


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
                this.editData =this.tableList[params.row._index];
                this.params=params;
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

            //省份列表
            this.provinceArr=this.initProvinceList.concat();
            //城市列表
            this.cityArr=this.initCityList.concat();
            //地区列表
            this.districtArr=this.initDistrictList.concat();
            //上画人员列表
			this.painterArr=this.initPainterList.concat();
			this.communityArr=this.initCommunityList.concat();

			//根据路由返回参数初始化
			if(this.$route.params.communityId){
				this.search.communityId = this.$route.params.communityId;
				this.search.communityName = this.$route.params.communityName;
				this.handleSearch();

			}else{
				this.tableList = this.initList.concat();
            	this.total = this.initList.length;
			}

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