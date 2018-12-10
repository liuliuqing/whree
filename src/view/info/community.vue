<template>
	<div>
		<Card>
			<div class="search-con search-con-top">
				<Input clearable placeholder="小区编号" class="search-input" v-model="search.communityId" @on-enter="handleSearch" />
				<Input clearable placeholder="小区名称" class="search-input" v-model="search.communityName" @on-enter="handleSearch" />
				<Input clearable placeholder="维护人员" class="search-input" v-model="search.maintenancePersonnel" @on-enter="handleSearch" />
                <br />
                <br />
        		<Select v-model="search.communityProvince" filterable clearable placeholder="请选择省份" @on-enter="handleSearch">
					<Option v-for="item in communityProvinceArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
				</Select>
        		<Select v-model="search.communityCity" filterable clearable placeholder="请选择城市" @on-enter="handleSearch">
					<Option v-for="item in communityCityArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
				</Select>
        		<Select v-model="search.communityDistrict" filterable clearable placeholder="请选择区县" @on-enter="handleSearch">
					<Option v-for="item in communityDistrictArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
				</Select>

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
						<FormItem label="小区编号"  prop="communityId"  label-position="top">
							<Input  v-model="editData.communityId" placeholder="请输入小区编号" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="小区名称"  prop="communityName" label-position="top">
							<Input v-model="editData.communityName" placeholder="请输入小区名称" />
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="36">
						<FormItem label="小区地址" prop="communityAddress"  label-position="top">
							<Input v-model="editData.communityAddress"  type="textarea" :rows="4"  placeholder="请输入小区地址" />
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
                    <Col span="12">
						<Form-item prop="communityProvince" >
							<Select v-model="editData.communityProvince"   filterable clearable placeholder="请选择省份">
								<Option v-for="item in communityProvinceArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item >

                    </Col>
                    <Col span="12">
					<Form-item  prop="communityCity" >
                        <Select v-model="editData.communityCity"  filterable clearable placeholder="请选择城市">
                            <Option v-for="item in communityCityArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
                        </Select>
					</Form-item >
                    </Col>
                     <br /><br />
                    <Col span="12">
						<Form-item prop="communityDistrict"  >
							<Select v-model="editData.communityDistrict"    filterable clearable placeholder="请选择区县">
								<Option v-for="item in communityDistrictArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item >
                    </Col>
                    <Col span="12">
						<Form-item  prop="maintenancePersonnel" >
							<Select v-model="editData.maintenancePersonnel" filterable multiple clearable placeholder="请选择维护人员">
								<Option v-for="item in communitymaintenancePersonnelArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item >
                    </Col>
						</Row>

					<Row :gutter="32">
                    <Col span="12">
						<Form-item  prop="Painter" >
							<Select v-model="editData.Painter"  filterable multiple  clearable placeholder="请选择上画人员">
								<Option v-for="item in communityPainterArr" :value="item.label" :key="item.value">{{ item.label }}</Option>
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

			const validatemaintenancePersonne= (rule, value, callback) => {
                if (!value) {
					callback(new Error('请选择维护人员'));

					}
					else
					{
						 callback();
					}
				};

			    const validatePainter= (rule, value, callback) => {
                if (!value) {
					callback(new Error('请选择上画人员'));

				}
					else
					{
						 callback();
					}
				};
			return {
				 ruleValidate: {
                    communityId: [
                        { required: true, message: '小区编号不能为空', trigger: 'blur' }
                    ],
                    communityName: [
                        { required: true, message: '小区名称不能为空', trigger: 'blur' }
                    ],
                    communityCity: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    communityProvince: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    communityDistrict: [
                        { required: true,  message: '请选择区县', trigger: 'change' },
                    ],
                    maintenancePersonnel: [
                        {validator: validatemaintenancePersonne, trigger: 'change' }
                    ],
                    Painter: [
                        { validator: validatePainter, trigger: 'change' }
                    ],
                    communityAddress: [
                         { required: true, message: '小区地址不能为空', trigger: 'blur' }
                    ]
                },
				search: {
					communityId: '',
					communityName: '',
					communityAddress: '',
					communityProvince: '',
                    communityCity: '',
                    communityDistrict: '',
					advertisingPointsNumber: '',
					Status: '',
					communityCoordinate: '',
                    Painter: '',
                    maintenancePersonnel: '',
                },
				pageNo: 1,
				total: 1,
				pagesize: 10,
				columns: [
					{
                        type: 'selection',
						width:'5%',
                        align: 'center'
	                },
					{
						title: '小区编号',
						width: '8%',
						key: 'communityId',
						align: 'center',
						render: (h, params) => {
							return  h('Button', {
									props: {
										type: 'text',
									},
									style:'padding : 0;white-space: normal;margin-right:0',
									on: {
										click: () => {
										 console.log(params);
										 this.$router.push({name:'点位信息维护',params:{communityId:params.row.communityId,communityName:params.row.communityName}});
										}
									}
								}, params.row.communityId);
                        }
					}, {
						title: '小区名称',
						width: '10%',
						key: 'communityName',
					}, {
                        title: '小区地址',
                         width:'10%',
						key: 'communityAddress',
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
                        title: '广告点位总数',
                        width: '5%',
						key: 'advertisingPointsNumber',
					},{
                        title: '状态',
                        width:'8%',
						key: 'Status',
						render: (h, params) => {
							return h('span', params.row.Status && this.M_StatusArr.find(val => val.value == params.row.Status).label);
						}
					},{
						title: '上画人员',
						width: '7%',
						key: 'Painter',
						align: 'center',
                        render: (h, params) => {
							return h('div', [
                                h('Button', {
									props: {
										type: 'text'
									},
									style:'padding : 0;white-space: normal;margin-right:0',
									on: {
										click: () => {
                                            this.edit(params);
										}
									}
								}, params.row.Painter),
							]);
                        }
					},{
						title: '维护人员',
						width:'7%',
						key: 'maintenancePersonnel',
						align: 'center',
                        render: (h, params) => {
							return h('div', [
                                h('Button', {
									props: {
										type: 'text'
									},
									style:'padding : 0;white-space: normal;margin-right:0',
									on: {
										click: () => {
											this.edit(params);
										}
									}
								}, params.row.maintenancePersonnel),
							]);
                        }

					},{
                        title: '坐标',
                        width: '10%',
						key: 'communityCoordinate',
					},{
                        title: '操作',
						align: 'center',
						 width: '12%',
						key: 'action',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'primary'
									},
									style:'margin-right : 5px;',
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
                communityProvinceArr:[],
                communityCityArr:[],
                communityDistrictArr:[],
                communitymaintenancePersonnelArr:[],
                communityPainterArr:[],
				tableList: [],
				initData: {
					communityId: '',
					communityName: '',
					communityAddress: '',
					communityProvince: '',
                    communityCity: '',
                    communityDistrict: '',
					advertisingPointsNumber: '',
					Status: '',
					communityCoordinate: '',
                    Painter: '',
                    maintenancePersonnel: '',
				},
				initList: [{
					communityId: '0000001',
					communityName: '天福小区',
					communityAddress: '麒麟新村3栋',
					communityProvince: '广东',
                    communityCity: '深圳',
                    communityDistrict: '南山',
					advertisingPointsNumber: '23',
					Status: '0',
					communityCoordinate: '192.168.0.1',
                    Painter: '柳柳青',
                    maintenancePersonnel: '张三',
				}, {
					communityId: '0000002',
					communityName: '南山小区',
					communityAddress: '灶下村2栋',
					communityProvince: '北京',
                    communityCity: '朝阳',
                    communityDistrict: '丰台',
					advertisingPointsNumber: '2',
					Status: '1',
					communityCoordinate: '192.168.0.21',
                    Painter: '柳青',
                    maintenancePersonnel: '王五'
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
                 initmaintenancePersonnelList: [{
                    value: 'zhangsan',
                    label:'张三',
                },
                {
                    value: 'wangwu',
                    label:'王五',
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
				console.log(this.tableList);
			},
			handleReset(name) {
				 this.search={};
				 this.handleSearch();
			},
			handleSubmit() {},
			handleAdd() {
				this.editTitle = '新增'
				this.editData = {};
				this.editShow = true
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
                this.editData =this.M_deepCopy( this.tableList[params.row._index])
                this.params=params;
            },
            //修改数据
            editMoify(){
                this.editShow = false;

            },
            //添加
            editAdd(){
				this.editData.Status = '0';
				this.editData.communityCoordinate = '192.168.0.1';

				this.tableList.push(this.editData);
				this.editShow = false;
			}
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
            //维护人员列表
            this.communitymaintenancePersonnelArr=this.initmaintenancePersonnelList.concat();
            //上画人员列表
            this.communityPainterArr=this.initPainterList.concat();
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