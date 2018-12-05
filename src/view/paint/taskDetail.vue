<template>
    <div>
        <p :style="pStyle" >{{ detailData.titleName }}:</p>
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
            <upload-image ref="taskDet" :show-name="showFalg"  @uploadSuccess="uploadSuccess"></upload-image>
        </Row>
        <div class="demo-drawer-footer" v-if="detailData.titleName == '图片上传'">
            <Button style="margin-right: 8px" @click="close">取消</Button>
            <Button type="primary" @click="editSubmit">提交</Button>
        </div>
    </div>
</template>
<script>
    import UploadImage from './uploadImage.vue';
    export default {
        name: 'TaskDetail',
        props: ['detailData'],
        components: {
            UploadImage
        },
        data () {
            return {
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
                showFalg:'',
                imgList: []
            }
        },
        methods: {
            getShowFalg(val) {
                this.$refs.taskDet.getShowName(val);
            },
            editSubmit() {
                this.$emit('uploadImg',this.imglist);
            },
            close() {
                this.$emit('closeDrawer');
            },
            uploadSuccess(list) {
                this.imglist = list;
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
