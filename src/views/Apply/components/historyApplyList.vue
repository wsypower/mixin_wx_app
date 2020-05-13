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
                            <div flex="dir:left">
                                <span class="item_name">{{item.name}}</span>
                                <div><span class="item_label">品种：</span>{{item.dogType}}</div>
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
    export default {
        name: 'historyApplyList',
        components:{},
        data(){
            return {
                listData:[]
            }
        },
        mounted(){
            this.getListData();
        },
        methods:{
            getListData(){
                let temp1 = {
                    id: '2567190kshdgc',
                    name: '平平',
                    dogType: '柴犬',
                    submitDay: '2020-05-11',
                    statusId: 0,
                    statusName: '未提交'
                }
                let temp2 = {
                    id: 'a2567190kshdgc',
                    name: '欢欢',
                    dogType: '柯基',
                    submitDay: '2020-05-11',
                    statusId: 1,
                    statusName: '审核中'
                }
                let temp3 = {
                    id: 'c2567190kshdgc',
                    name: '乐乐',
                    dogType: '柴犬',
                    submitDay: '2020-05-11',
                    statusId: 2,
                    statusName: '初审通过'
                }
                let temp4 = {
                    id: 'zz2567190kshdgc',
                    name: '三毛',
                    dogType: '金毛',
                    submitDay: '2020-05-11',
                    statusId: 3,
                    statusName: '审核未通过'
                }
                let temp5 = {
                    id: 'saw2567190kshdgc',
                    name: '平平',
                    dogType: '柴犬',
                    submitDay: '2020-05-11',
                    statusId: 4,
                    statusName: '已登记'
                }
                let temp6 = {
                    id: 'sassw2567190kshdgc',
                    name: '平平',
                    dogType: '柴犬',
                    submitDay: '2020-05-11',
                    statusId: 4,
                    statusName: '已登记'
                }
                this.listData.push(temp1);
                this.listData.push(temp2);
                this.listData.push(temp3);
                this.listData.push(temp4);
                this.listData.push(temp5);
                this.listData.push(temp6);
            },
            gotoDetail(item){
                console.log('item:', item);
                Toast('还没开发');
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
                                width: 133px;
                                font-family: PingFang-SC-Bold;
                                font-size: 30px;
                                line-height: 40px;
                                font-weight: 600;
                                color: #333333;
                            }
                            .item_label{
                                font-family: PingFang-SC-Medium;
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