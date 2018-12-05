<style lang="less">
	@import "./common.less";
</style>
<template>
	<div>
		<Card title="导出EXCEL">
			<Row>
				<div class="search-con search-con-top">
					<Select v-model="search.orderStatus" multiple clearable placeholder="请选择订单状态" style="min-width: 200px;margin-right: 10px;max-width: 500px;width: auto;">
						<Option v-for="item in M_orderStatusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<DatePicker type="date" placeholder="售卖开始时间" v-model="search.createdBytime" clearable :editable=false style="width: 200px;margin-right: 10px;"></DatePicker>
					<DatePicker type="date" placeholder="售卖结束时间" v-model="search.createdById" clearable :editable=false style="width: 200px;margin-right: 10px;"></DatePicker>
					<Button @click="handleSearch" class="search-btn" type="primary">
						<Icon type="search" />查询
					</Button>
					<Button icon="md-download" :loading="exportLoading" @click="exportExcel">导出文件</Button>
				</div>
			</Row>
		</Card>
		<Row class="margin-top-10">
			<Table :columns="tableTitle" :data="tableData"></Table>
		</Row>
	</div>
</template>
<script>
	import excel from '@/libs/excel'
	export default { 
		data() {  
			return {   
				exportLoading: false,
				   search: {      
					orderStatus: '',
					      createdBytime: '',
					      createdById: ''   
				},
				   tableTitle: [    {     
					title: '一级分类',
					     key: 'category1'    
				},      {     
					title: '二级分类',
					     key: 'category2'    
				},      {     
					title: '三级分类',
					     key: 'category3'    
				}   ],
				   tableData: []  
			} 
		},methods: {  
			exportExcel() {   
				if(this.tableData.length) {    
					this.exportLoading = true;
					const params = {     
						title: ['一级分类', '二级分类', '三级分类'],
						key: ['category1', 'category2', 'category3'],
						data: this.tableData,
						autoWidth: true,
						filename: '分类列表'    
					}    
					excel.export_array_to_excel(params);
					this.exportLoading = false;
				} else {    
					this.$Message.info('表格数据不能为空！');
				}  
			},
			  handleSearch() {       
				this.tableData = [
				{        
					category1: 1,
					category2: 2,
					category3: 3       
				},        
				{        
					category1: 4,
					category2: 5,
					category3: 6       
				},        
				{        
					category1: 7,
					category2: 8,
					category3: 9       
				}       
				]    
			},
			 
		},
		 created() { },
		 mounted() { }
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