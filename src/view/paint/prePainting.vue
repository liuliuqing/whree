<template>
    <div>
        <p :style="pStyle">点位预上画情况</p>
        <Card>
        	<div class="search-con search-con-top">
				<Row>
					<Input clearable placeholder="任务编号" class="search-input" v-model="presearch.taskId" @on-enter="preHandleSearch" />
					<Input clearable placeholder="上画人员编码" class="search-input" v-model="presearch.adUploadId" @on-enter="preHandleSearch" />
					<Input clearable placeholder="上画人员名称" class="search-input" v-model="presearch.adUploadName" @on-enter="preHandleSearch" />
				</Row>
				<br>
        		<Row>
					<Button @click="preHandleSearch" class="search-btn" type="primary">
						<Icon type="search" />查询
					</Button>
					<Button @click="preHandleReset" class="search-btn" type="primary">
						<Icon type="search" />重置
					</Button>
        		</Row>
        	</div>
        	<Table border ref="preTable" :columns="preColumns" :data="preDetailData"></Table>
        	<div style="margin: 10px;overflow: hidden">
        		<div style="float: right;">
        			<Page show-total :total="preTotal" :page-size="prePagesize" :current="prePageNo" @on-change="prePageChange"></Page>
        		</div>
        	</div>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'PrePainting',
        props: ['preDetailData','preSearchData'],
        data () {
            return {
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
				presearch: {
					taskId: '',
					adUploadName: '',
					adUploadId: '',
				},
				prePageNo: 1,
				preTotal: 1,
				prePagesize: 10,
				preColumns: [
					{type: 'index',width: 60,align: 'center'},
					{title: '小区编号',key: 'communityId'}, 
					{title: '小区名称',key: 'communityName'}, 
					{title: '点位编号',key: 'ptId'}, 
					{title: '点位名称',key: 'ptName'}, 
					{title: '售卖开始日期',key: 'timeZoneBegin'}, 
					{title: '售卖结束日期',key: 'timeZoneEnd'}, 
					{title: '客户编号',key: 'custormerId'}, 
					{title: '客户名称',key: 'custormerName'},
				],
            }
        },
		methods: {
			preHandleSearch() {
				console.log("查询")
			},
			preHandleReset() {
				this.presearch = {};
			},
			prePageChange() {
				
			},
			getPreSearchData(val) {
				this.presearch.taskId = val.taskId;
				this.presearch.adUploadName = val.adUploadName;
				this.presearch.adUploadId = val.adUploadId;
				this.preHandleSearch();
			}
		},
        mounted () {
			
        }
    }
</script>
<style>
    .demo-drawer-profile{
        font-size: 14px;
    }
    .demo-drawer-profile .ivu-col{
        margin-bottom: 12px;
    }
</style>
