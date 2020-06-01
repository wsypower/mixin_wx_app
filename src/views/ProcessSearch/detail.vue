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
            <div class="log-body" flex="dir:top main:justify">
                <div class="log-body-main">
                    <div class="log-item" flex="dir:left" v-for="item in orderInfo.logList" :key="item.id">
                        <div class="log-item-left">{{item.operatorTime||item.createtime|timeFormatter}}</div>
                        <div class="log-item-right">
                            <div class="dot"></div>
                            <div class="message" :class="{wrong: item.stepCode==='25'||item.stepCode==='45'||item.stepCode==='85'}">
                                <span v-if="item.stepCode==='25'||item.stepCode==='45'||item.stepCode==='85'">审核未通过，原因：</span>
                                <span>{{item.remark||item.stepName}}</span>
                                <span v-if="item.stepCode==='20'">，请到服务点申领狗牌</span>
                                <div v-if="item.stepCode==='20'" @click="goToPage">服务点：<span class="icon iconfont icon-dingwei"></span><span class="service">{{orderInfo.serviceName}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-panel" flex="dir:top cross:center main:center" v-show="showButton">
                    <van-button type="info" class="op-btn" @click="goToPage">{{buttonName}}</van-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button, Toast } from 'vant'
    import PageHeader from '@/components/pageHeader.vue'
    import { queryOrderDetail } from '@/api/process.js'

    const buttonObj = {
        '-20-': { name:'查看服务点',path: 'service'},
        '-25-45-85-': {name:'修改信息',path:'applyPage'},
        '-40-80-': {name:'查看犬证',path: ''}
    }
    export default {
        name: 'detail',
        components:{
            [Button.name]: Button,
            PageHeader
        },
        data(){
            return {
                showButton: false,
                buttonName: '',
                pagePath: '',
                orderInfo:{
                    orderId: '',
                    //预约单号
                    orderNo: '',
                    //办证类型
                    carType: '',
                    //个人还是单位
                    userType: 0,
                    //犬主姓名
                    ownerName: '',
                    //宠物昵称
                    dogName: '',
                    //宠物品种
                    breed: '',
                    //服务点名称
                    serviceName: '',
                    //服务点Code
                    serviceCode: '',
                    //申办进度
                    logList: []
                },
                pointInfo:{}
            }
        },
        mounted(){
            console.log('orderNo', this.$route.params.orderNo)
            this.getDetailData();
        },
        methods: {
            getDetailData(){
                let params = {
                    userId: this.$store.getters['userId'],
                    originLon: this.$store.getters['originLon'],
                    originLat: this.$store.getters['originLat'],
                    orderNo: this.$route.params.orderNo
                }
                queryOrderDetail(params).then( res => {
                    console.log('queryOrderDetail', res);
                    if(res.errno===0){
                        let order = res.data.dogOrder;
                        this.orderInfo.orderId = order.id;
                        this.orderInfo.orderNo = order.orderNo;
                        this.orderInfo.cardType = order.cardType===0 ? '新办':'续办';
                        this.orderInfo.userType = order.userType;
                        this.orderInfo.ownerName = order.ownerName;
                        this.orderInfo.dogName = order.dogName;
                        this.orderInfo.breed = order.breed;
                        this.orderInfo.serviceName = order.serviceName;
                        this.orderInfo.serviceCode = order.serviceCode;
                        this.orderInfo.logList = res.data.list;
                        let temp = res.data.list[0];
                        let pointInfo = {
                            id: temp.dogServicePoint.id,
                            servicePointName: temp.dogServicePoint.servicePointName,
                            distance: temp.dogServicePoint.distance,
                            address: temp.dogServicePoint.address,
                            serviceTime: temp.dogServicePoint.serviceTime,
                            originLon: temp.dogServicePoint.longitude,
                            originLat: temp.dogServicePoint.latitude,
                        }
                        this.$store.commit('service/updatePointInfo',pointInfo);
                        let needKey = Object.keys(buttonObj).find(key => key.indexOf('-' + temp.stepCode + '-')>=0)
                        if(needKey){
                            this.showButton = true;
                            this.buttonName = buttonObj[needKey].name;
                            this.pagePath = buttonObj[needKey].path;
                        }
                        else{
                            this.showButton = false;
                        }
                    }
                    else{
                        Toast.fail({message:res.errmsg});
                    }
                });
            },
            goToPage(){
                if(this.pagePath===''){
                    Toast('还未开发');
                }
                else if(this.pagePath==='service'){
                    this.$router.push('/service');
                }
                else{
                    if(this.orderInfo.cardType==='新办'){
                        this.$router.push({
                            path:'/newApply',
                            query:{
                                currentStep: 1,
                                orderId: this.orderInfo.orderId,
                                userType: this.orderInfo.userType
                            }
                        });
                    }
                    else{
                        this.$router.push({
                            path:'/continuedApply',
                            query:{
                                currentStep: 5,
                                orderId: this.orderInfo.orderId
                            }
                        });
                    }
                }
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
            //height: calc(100% - 340px);
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
                .log-body-main{
                    height: 100%;
                    width: 100%;
                    .log-item{
                        width: 100%;
                        /*height: 140px;*/
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
                                margin-bottom: 60px;
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
                                &.wrong{
                                    color: #ff0000;
                                }
                                .icon-dingwei{
                                    font-size: 30px;
                                    color: #306ce7;
                                    margin-right: 10px;
                                }
                                .service{
                                    color: #306ce7;
                                }
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
                .btn-panel{
                    height: 170px;
                    width: 100%;
                    .op-btn{
                        width: 702px;
                        height: 80px;
                    }
                }
            }
        }
    }
</style>