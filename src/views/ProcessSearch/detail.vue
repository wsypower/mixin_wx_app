<template>
    <div class="detail-page">
        <page-header title="预约单号查询"></page-header>
        <div class="base-panel">
            <div class="item-row" flex="dir:left cross:center main:justify">
                <div class="item-row-left">预约单号：</div>
                <div class="item-row-right">{{orderInfo.orderNo}}</div>
            </div>
            <div class="item-row" flex="dir:left cross:center main:justify">
                <div class="item-row-left">办证类型：</div>
                <div class="item-row-right">{{orderInfo.cardType}}</div>
            </div>
            <div class="item-row" flex="dir:left cross:center main:justify">
                <div class="item-row-left">犬主姓名：</div>
                <div class="item-row-right">{{orderInfo.ownerName}}</div>
            </div>
            <div class="item-row" flex="dir:left cross:center main:justify">
                <div class="item-row-left">宠物昵称：</div>
                <div class="item-row-right">{{orderInfo.dogName}}</div>
            </div>
            <div class="item-row" flex="dir:left cross:center main:justify">
                <div class="item-row-left">宠物品种：</div>
                <div class="item-row-right">{{orderInfo.breed}}</div>
            </div>
        </div>
        <div class="log-panel">
            <div class="log-header" flex="dir:left cross:center">
                <span class="header-left">申办进度</span>
            </div>
            <div class="log-body">
                <div class="log-item" flex="dir:left">
                    <div class="log-item-left">2020.01.03 14:22</div>
                    <div class="log-item-right">
                        <div class="dot"></div>
                        <div class="message">信息审核中，请耐心等待</div>
                    </div>
                </div>
                <div class="log-item" flex="dir:left">
                    <div class="log-item-left">2020.01.03 14:22</div>
                    <div class="log-item-right">
                        <div class="dot"></div>
                        <div class="message">资料已提交</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue'
    export default {
        name: 'detail',
        components:{
            PageHeader
        },
        data(){
            return {
                orderInfo:{
                    //预约单号
                    orderNo: '',
                    //办证类型
                    carType: '',
                    //犬主姓名
                    ownerName: '',
                    //宠物昵称
                    dogName: '',
                    //宠物品种
                    breed: '',
                    //申办进度
                    logList: []
                }
            }
        },
        mounted(){
            this.getDetailData();
        },
        methods: {
            getDetailData(){
                this.orderInfo.orderNo = '2000001568';
                this.orderInfo.cardType = '新办';
                this.orderInfo.ownerName = '菲菲';
                this.orderInfo.dogName =  '飞飞';
                this.orderInfo.breed = '柴犬';
                this.orderInfo.logList = [];
            }
        }
    }
</script>
<style lang="scss">
    .detail-page{
        width: 100%;
        height: 100%;
        padding-top: 88px;
        background-color: #f5f5f5;
        .base-panel{
            width: 100%;
            background-color: #ffffff;
            .item-row{
                height: 68px;
                width: 100%;
                padding: 0px 24px;
                border-bottom: solid 2px #e5e5e5;
                .item-row-left{
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 40px;
                    letter-spacing: 0px;
                    color: #4d4d4d;
                }
                .item-row-right{
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 40px;
                    letter-spacing: 0px;
                    color: #666666;
                }
                &:last-child{
                    border-width: 0;
                }
            }
        }
        .log-panel{
            height: calc(100% - 340px);
            .log-header{
                height: 90px;
                padding-left: 24px;
                .header-left{
                    font-family: PingFang-SC-Medium;
                    font-size: 30px;
                    line-height: 40px;
                    letter-spacing: 0px;
                    color: #4d4d4d;
                    border-left: 6px solid #306ce7;
                    padding-left: 10px;
                }
            }
            .log-body{
                width: 100%;
                background-color: #ffffff;
                padding-top: 40px;
                height: calc(100% - 90px);
                .log-item{
                    width: 100%;
                    height: 140px;
                    .log-item-left{
                        width: 190px;
                        text-align: center;
                        font-family: PingFang-SC-Medium;
                        font-size: 26px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 40px;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                    .log-item-right{
                        margin-left: 20px;
                        border-left: 3px solid #d9d9d9;
                        height: 100%;
                        position: relative;
                        .dot{
                            position: absolute;
                            top: 0px;
                            left: -19px;
                            background-color: #b5b5b5;
                            width: 40px;
                            height: 40px;
                            border-radius: 20px;
                            border: 10px solid #e9e9e9;
                        }
                        .message{
                            margin-left: 56px;
                            width: 454px;
                            background-color: #ffffff;
                            box-shadow: 0px 4px 10px 0px rgba(48, 108, 231, 0.2);
                            border-radius: 4px;
                            padding: 20px 30px;
                            font-family: PingFang-SC-Regular;
                            font-size: 26px;
                            font-weight: bold;
                            font-stretch: normal;
                            line-height: 50px;
                            letter-spacing: 0px;
                            color: #424242;
                        }
                    }
                    &:first-child{
                        .log-item-right{
                            .dot{
                                background-color: #306ce7;
                                border-color: #c0d3f8;
                            }
                        }
                    }
                    &:last-child{
                        .log-item-right{
                            border-width: 0px;
                        }
                    }
                }
            }
        }
    }
</style>