<template>
    <div class="process-search-page">
        <page-header title="进度查询" @clickRight="showSearchPanel">
            <div class="header-right" slot="right">
                <span class="icon iconfont icon-sousuo1"></span>
            </div>
        </page-header>
        <div class="page-main">
            <div class="search-panel"  v-show="showSearch">
                <div class="form-item" flex="dir:left cross:center">
                    <div class="form-item-label">日期选择：</div>
                    <div class="form-item-inline" flex="dir:left cross:center main:justify">
                        <div class="daytime" @click="showBeginTimePicker=true">
                            <span>{{beginTimeString}}</span>
                            <span class="icon iconfont icon-arrowBottom-fill"></span>
                        </div>
                        <span class="step">至</span>
                        <div class="daytime" @click="showEndTimePicker=true">
                            <span>{{endTimeString}}</span>
                            <span class="icon iconfont icon-arrowBottom-fill"></span>
                        </div>
                    </div>
                </div>
                <div class="form-item" flex="dir:left cross:center">
                    <div class="form-item-label">办证类型：</div>
                    <div class="form-item-inline">
                        <my-radio-group :initValue="params.cardType" :radioGroup="typeArray" @getRealValue="(name)=>{getRealValue('cardType', name)}"></my-radio-group>
                    </div>
                </div>
                <van-button type="info" class="search-btn" @click="search">查询</van-button>
            </div>
            <div class="result-panel">
                <div class="result-panel-header" flex="dir:left cross:center">
                    <span class="header-left">进度情况</span>
                </div>
                <div class="result-panel-body" v-if="cardInfoList.length>0">
                    <order-item class="order-item"
                                :cardInfo="item"
                                v-for="item in cardInfoList"
                                :key="item.orderCode"
                                @refreshList="() => {getProcessList();}"
                                @gotoPage="() => {gotoDetail(item);}">
                    </order-item>
                </div>
                <div class="no-data" v-else flex="dir:top cross:center main:center">
                    <div class="no-data_icon"></div>
                    <div class="no-data_text">暂无进度</div>
                </div>
            </div>
        </div>
        <van-popup v-model="showBeginTimePicker" position="bottom">
            <van-datetime-picker
                    type="date"
                    @confirm="onBeginTimeConfirm"
                    @cancel="showBeginTimePicker = false"
            />
        </van-popup>
        <van-popup v-model="showEndTimePicker" position="bottom">
            <van-datetime-picker
                    type="date"
                    @confirm="onEndTimeConfirm"
                    @cancel="showEndTimePicker = false"
            />
        </van-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import { Toast, Popup, DatetimePicker, Button } from 'vant';
    import OrderItem from './components/orderItem.vue';
    import { formatDate } from '@/utils/index';
    import { querybidDogCardRecord } from '@/api/process.js';
    import statusObj from '@/utils/statusObj.js';
    const typeArray = [{labelName: '全部', value: ''},{labelName: '新办', value: '0'},{labelName: '续办', value: '1'}];
    export default {
        name: 'process',
        components: {
            PageHeader,
            MyRadioGroup,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Button.name]: Button,
            OrderItem
        },
        data(){
            return {
                //展示查询窗口
                showSearch: false,
                typeArray,
                showBeginTimePicker: false,
                showEndTimePicker: false,
                beginTimeString: '',
                endTimeString: '',
                //查询入参
                params:{
                    userId: '',
                    beginTime: undefined,
                    endTime: undefined,
                    cardType: ''
                },
                cardInfoList: []
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.getProcessList();
        },
        methods:{
            //展示/影藏查询块
            showSearchPanel(){
                console.log('click right');
                this.showSearch = !this.showSearch;
            },
            //获取办证类型
            getRealValue(attrName, value){
                this.params[attrName] = value;
            },
            //获取查询开始时间
            onBeginTimeConfirm(value){
                this.beginTimeString = formatDate(value, 'yyyy-MM-dd');
                this.params.beginTime = new Date(value).getTime();
                console.log(this.params.beginTime);
                this.showBeginTimePicker = false;
            },
            //获取查询结束时间
            onEndTimeConfirm(value){
                this.endTimeString = formatDate(value, 'yyyy-MM-dd');
                this.params.endTime = new Date(value).getTime();
                console.log(this.params.endTime);
                this.showEndTimePicker = false;
            },
            //获取进度记录
            getProcessList(){
                this.$store.commit('updateIsLoading', true);
                querybidDogCardRecord(this.params).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    console.log('querybidDogCardRecord',res.data);
                    if(res.errno === 0){
                        this.cardInfoList = res.data.reduce((acc,item) => {
                            let statusKey = Object.keys(statusObj).find(key=>key.indexOf('-' + item.status + '-')>=0);
                            let temp = {
                                orderId: item.id,
                                orderCode: item.orderNo,
                                statusId: statusKey ? statusObj[statusKey].statusId: undefined,
                                iconStatusId: statusKey ? statusObj[statusKey].iconStatusId: undefined,
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
                    }
                    else{
                        Toast.fail({message: res.errmsg||'数据获取失败'});
                    }
                });
            },
            //查询
            search(){
                this.getProcessList();
            },
            //跳转到编辑页或者订单详情页
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
    display: flex;
    flex-direction: column;
    .header-right{
        color: #ffffff;
        .icon-sousuo1{
            font-size: 28px;
        }
    }
    .page-main{
        width: 100%;
        padding: 0px 24px 0px 24px;
    }
    .search-panel{
        width: 100%;
        height: 330px;
        margin: 20px 0px;
        background-color: #ffffff;
        padding: 46px 30px 30px 30px;
        flex: none;
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
        width: 100%;
        flex: auto;
        overflow-y: auto;
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
        .no-data{
            margin-top: 200px;
            width: 100%;
            &_icon{
                width: 374px;
                height: 288px;
                background-size: 100% 100%;
                @include bg-image("~assets/images/no_data");
            }
            &_text{
                font-family: PingFang-SC-Medium;
                font-size: 32px;
                line-height: 43px;
                letter-spacing: 0px;
                color: #666666;
            }
        }
    }
}
</style>