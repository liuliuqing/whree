<template>
    <div>
        <p :style="pStyle">订单详情</p>
        <div class="demo-drawer-profile">
            <Row>
                <Col span="12">
                    订单编号: {{ detailData.orderId }}
                </Col>
                <Col span="12">
                    提交日期: {{ this.M_dateFormat(detailData.submitDate) }}
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    销售人编号: {{ detailData.createdById }}
                </Col>
                <Col span="12">
                    销售人名称: {{ detailData.createdBy }}
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    订单状态: {{ detailData.orderStatus && this.M_orderStatusArr.find(val => val.value == detailData.orderStatus).label }}
                </Col>

            </Row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'SaleDetail',
        props: ['detailData'],
        data () {
            return {
                value4: true,
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                }
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
