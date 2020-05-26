<template>
    <div class="annual-check-page" flex="dir:top cross:center">
        <page-header title="年审记录"></page-header>
        <order-item class="order-item"
                    :cardInfo="item"
                    v-for="item in cardInfoList"
                    :key="item.orderCode"
                    @refreshList="() => {getProcessList();}"
                    @gotoPage="() => {gotoDetail(item);}">
        </order-item>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import OrderItem from './components/orderItem.vue';
    import { formatDate } from '@/utils/index';
    import { querybidDogCardRecord } from '@/api/process.js'
    const statusObj = {
        '-0-':{
            statusId: '0',
            statusName: '未提交',
        },
        '-10-30-60-':{
            statusId: '1',
            statusName: '审核中',
        },
        '-20-':{
            statusId: '2',
            statusName: '审核通过',
        },
        '-25-45-85-':{
            statusId: '3',
            statusName: '审核未通过',
        },
        '-40-80-':{
            statusId: '4',
            statusName: '已登记',
        }
    }
    export default {
        name: 'process',
        components: {
            PageHeader,
            OrderItem
        },
        data(){
            return {
                cardInfoList: []
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.getProcessList();
        },
        methods:{
            showSearchPanel(){
                console.log('click right');
                this.showSearch = !this.showSearch;
            },
            getRealValue(attrName, value){
                this.params[attrName] = value;
            },
            onBeginTimeConfirm(value){
                this.beginTimeString = formatDate(value, 'yyyy-MM-dd');
                this.params.beginTime = new Date(value).getTime();
                console.log(this.params.beginTime);
                this.showBeginTimePicker = false;
            },
            onEndTimeConfirm(value){
                this.endTimeString = formatDate(value, 'yyyy-MM-dd');
                this.params.endTime = new Date(value).getTime();
                console.log(this.params.endTime);
                this.showEndTimePicker = false;
            },
            getProcessList(){
                querybidDogCardRecord(this.params).then( res => {
                    console.log('querybidDogCardRecord',res.data);
                    this.cardInfoList = res.data.reduce((acc,item) => {
                        let statusKey = Object.keys(statusObj).find(key=>key.indexOf('-' + item.status + '-')>=0);
                        let temp = {
                            orderId: item.id,
                            orderCode: item.orderNo,
                            statusId: statusKey ? statusObj[statusKey].statusId: '',
                            statusName: statusKey ? statusObj[statusKey].statusName: '',
                            dogName: item.dogName,
                            submitTime: item.submitTime ? formatDate(item.submitTime, 'yyyy-MM-dd'):'----',
                            cardType: item.cardType===0? '新办': '续办',
                            currentStep: item.currentStep,
                            userType: item.userType
                        }
                        acc.push(temp);
                        return acc
                    },[]);
                });
            },
            search(){
                this.getProcessList();
            },
            gotoDetail(item){
                console.log('item:', item);
                if(item.statusId === '0'){
                    this.$router.push({
                        path:'/newApply',
                        query:{
                            currentStep: item.currentStep,
                            orderId: item.orderId,
                            userType: item.userType
                        }
                    });
                }
                else if(item.statusId === '3'){
                    if(item.cardType===0){
                        this.$router.push({
                            path:'/newApply',
                            query:{
                                currentStep: 1,
                                orderId: item.orderId,
                                userType: item.userType
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
                else{
                    console.log('跳转至订单详情页');
                    this.$router.push('/' + item.orderCode + '/detail');
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .process-search-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding-top: 88px;
        .header-right{
            color: #ffffff;
            .icon-sousuo1{
                font-size: 28px;
            }
        }
        .search-panel{
            width: 702px;
            height: 330px;
            margin: 20px 0px;
            background-color: #ffffff;
            padding: 46px 30px 30px 30px;
            .form-item{
                margin-bottom: 40px;
                .form-item-label{
                    width: 180px;
                    font-family: PingFang-SC-Medium;
                    font-size: 32px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 40px;
                    letter-spacing: 0px;
                    color: #4d4d4d;
                }
                .form-item-inline{
                    flex: 1;
                    .step{
                        font-family: PingFang-SC-Regular;
                        font-size: 28px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 40px;
                        letter-spacing: 0px;
                        color: #666666;
                    }
                    .daytime{
                        width: 200px;
                        height: 52px;
                        line-height: 52px;
                        background-color: #fcfcfc;
                        border-radius: 6px;
                        border: solid 2px #bfbfbf;
                        position: relative;
                        span:first-child{
                            font-family: PingFang-SC-Regular;
                            font-size: 24px;
                            color: #4d4d4d;
                            vertical-align: top;
                            margin-left: 10px;
                        }
                        .icon-arrowBottom-fill{
                            position: absolute;
                            right: 10px;
                            top: 2px;
                            font-size: 32px;
                            color: #666666;
                        }
                    }
                }
            }
            .search-btn{
                width: 640px;
                height: 70px;
            }
        }
        .result-panel{
            width: 702px;
            .result-panel-header{
                width: 100%;
                height: 90px;
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
            .result-panel-body{
                .order-item{
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>