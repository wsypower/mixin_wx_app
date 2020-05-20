<template>
    <div class="history-apply-list">
        <div class="history-apply-list-header" flex="dir:left cross:center main:justify">
            <span class="header-left">最近一个月办理</span>
        </div>
        <div class="history-apply-list-body">
            <div class="no-data" v-if="listData.length===0" flex="dir:top cross:center">
                <div class="no-data_icon"></div>
                <div class="no-data_text">暂无办理记录~</div>
            </div>
            <div class="list-body-content">
                <my-scroll>
                    <div v-for="item in listData" :key="item.id" class="list-item" flex="dir:left cross:center main:justify" @click="gotoDetail(item)">
                        <div class="list-item_left">
                            <div flex="dir:left cross:center">
                                <span class="item_name">{{item.name}}</span>
                                <div flex="dir:left"><span class="item_label">品种：</span>{{item.dogType}}</div>
                            </div>
                            <div><span class="item_label">提交时间：</span>{{item.submitDay}}</div>
                        </div>
                        <div class="list-item_right" flex="dir:left cross:center">
                            <span class="right_status" :class="{gray: item.statusId===0,yellow:item.statusId===1,blue:item.statusId===2,red:item.statusId===3,green:item.statusId===4}">{{item.statusName}}</span>
                            <span class="icon iconfont jt-right">&#xe60f;</span>
                        </div>
                    </div>
                </my-scroll>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast } from 'vant'
    import { formatDate, getDay } from '@/utils/index.js'
    import { querybidDogCardRecord } from '@/api/process.js'
    const statusObj = {
        '-0-':{
            statusId: 0,
            statusName: '未提交',
        },
        '-10-30-60-':{
            statusId: 1,
            statusName: '审核中',
        },
        '-20-':{
            statusId: 2,
            statusName: '审核通过',
        },
        '-25-45-85-':{
            statusId: 3,
            statusName: '审核未通过',
        },
        '-40-80-':{
            statusId: 4,
            statusName: '已登记',
        }
    }
    export default {
        name: 'historyApplyList',
        components:{},
        data(){
            return {
                params:{
                    userId: '',
                    beginTime: '',
                    endTime: '',
                    cardType: ''
                },
                listData:[]
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            //let end = formatDate(new Date(), 'yyyy-MM-dd');
            this.params.endTime = new Date().getTime();
            this.params.beginTime = new Date(getDay(-30)).getTime();
            this.getListData();
        },
        methods:{
            getListData(){
                querybidDogCardRecord(this.params).then(res=>{
                    console.log('histoeyApplyList', res.data);
                    this.listData = res.data.reduce((acc,item) => {
                        let statusKey = Object.keys(statusObj).find(key=>key.indexOf('-' + item.status + '-')>=0);
                        let temp = {
                            id: item.id,
                            currentStep: item.currentStep,
                            name: item.dogName ? item.dogName : '----',
                            dogType: item.breed ?item.breed : '----',
                            submitDay: item.submitTime ? formatDate(item.submitTime, 'yyyy-MM-dd'):'----',
                            statusId: statusObj[statusKey].statusId,
                            statusName: statusObj[statusKey].statusName,
                            userType: item.userType
                        }
                        acc.push(temp);
                        return acc
                    },[]);
                });
            },
            gotoDetail(item){
                console.log('item:', item);
                if(item.statusId === 0){
                    this.$router.push({
                        path:'/newApply',
                        query:{
                            currentStep: item.currentStep,
                            orderId: item.id,
                            userType: item.userType
                        }
                    });
                }
                else if(item.statusId === 3){
                    this.$router.push({
                        path:'/newApply',
                        query:{
                            currentStep: 1,
                            orderId: item.id,
                            userType: item.userType
                        }
                    });
                }
                else{
                    console.log('跳转至订单详情页');
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .history-apply-list{
        width: 702px;
        height: calc(100% - 430px);
        .history-apply-list-header{
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
            .header-right{
                font-family: PingFang-SC-Medium;
                font-size: 26px;
                line-height: 56px;
                letter-spacing: 0px;
                color: #666666;
                .pright{
                    margin-left: -15px;
                }
            }
        }
        .history-apply-list-body{
            height: calc(100% - 90px);
            .no-data{
                padding-top: 100px;
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
            .list-body-content{
                padding-bottom: 24px;
                height: 100%;
                .list-item{
                    width: 702px;
                    height: 130px;
                    background-color: #ffffff;
                    box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
                    border-radius: 10px;
                    padding: 20px 14px 20px 25px;
                    margin-bottom: 10px;
                    .list-item_left{
                        font-family: PingFang-SC-Regular;
                        font-size: 26px;
                        color: #4d4d4d;
                        >div{
                            .item_name{
                                //width: 133px;
                                font-family: PingFang-SC-Bold;
                                font-size: 30px;
                                line-height: 40px;
                                font-weight: 600;
                                color: #333333;
                                margin-right: 30px;
                            }
                            .item_label{
                                font-family: PingFang-SC-Medium;
                                vertical-align: middle;
                            }
                            &:last-child{
                                margin-top: 10px;
                            }
                        }
                    }
                    .list-item_right{
                        .right_status{
                            width: 130px;
                            height: 44px;
                            border-radius: 4px;
                            text-align: center;
                            font-family: PingFang-SC-Medium;
                            font-size: 24px;
                            line-height: 44px;
                            letter-spacing: 0px;
                            color: #ffffff;
                            &.gray{
                                background-color: #b5b5b5;
                            }
                            &.yellow{
                                background-color: #ffa200;
                            }
                            &.blue{
                                background-color: #0f84fb;
                            }
                            &.red{
                                background-color: #ff0000;
                            }
                            &.green{
                                background-color: #22ac38;
                            }
                        }
                        .jt-right{
                            color: #b2b2b2;
                            margin-left: 24px;
                            font-size: 28px;
                        }
                    }
                    &:last-child{
                        margin-bottom: 0px;
                    }
                }
            }
        }
    }
</style>