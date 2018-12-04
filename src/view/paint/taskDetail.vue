<template>
    <div>
        <p :style="pStyle" >订单详情:</p>
        <div class="demo-drawer-profile">
			<Row>
				<Col span="12">
				</Col>
			</Row>
			<Row>
				<Col span="12">
					上画人员名称: {{ detailData.adUploadName }}
				</Col>
				<Col span="12">
					上画人员编码: {{ detailData.adUploadId }}
				</Col>
			</Row>
            <Row>
                <Col span="12">
                    小区名称: {{ detailData.communityName }}
                </Col>
                <Col span="12">
                    小区编号: {{ detailData.communityId }}
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    售卖开始日期: {{ detailData.timeZoneBegin }}
                </Col>
                <Col span="12">
                    售卖结束日期: {{ detailData.timeZoneBegin }}
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    任务状态: {{ detailData.taskStatus && this.M_taskStatusArr.find(val => val.value == detailData.taskStatus).label }}
                </Col>
            </Row>
        </div>
		<Row class="margin-top-10">
			<upload-image ref="img"></upload-image>
		</Row>
    </div>
</template>
<script>
	import UploadImage from './uploadImage.vue';
    export default {
        name: 'TaskDetail',
        props: ['detailData','editTitle'],
		components: {
			UploadImage
		},
        data () {
            return {
                value4: true,
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
				tit: ''
            }
        },
		methods: {
			getEditTitle(val) {
				this.$refs.img.getTitle(val);
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
