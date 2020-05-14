<template>
    <div class="process-search-page" flex="dir:top cross:center">
        <page-header title="进度查询" @clickRight="showSearchPanel">
            <div class="header-right" slot="right">
                <span class="icon iconfont icon-sousuo1"></span>
            </div>
        </page-header>
        <div class="search-panel">
            <div class="form-item" flex="dir:left cross:center">
                <div class="form-item-label">日期选择：</div>
                <div class="form-item-inline" flex="dir:left cross:center main:justify">
                    <div class="daytime">
                        <span>{{params.startDay}}</span>
                        <span class="icon iconfont icon-arrowBottom-fill"></span>
                    </div>
                    <span class="step">至</span>
                    <div class="daytime">
                        <span>{{params.endDay}}</span>
                        <span class="icon iconfont icon-arrowBottom-fill"></span>
                    </div>
                </div>
            </div>
            <div class="form-item" flex="dir:left cross:center">
                <div class="form-item-label">办证类型：</div>
                <div class="form-item-inline">
                    <my-radio-group :initValue="params.type" :radioGroup="typeArray" @getRealValue="(name)=>{getRealValue('type', name)}"></my-radio-group>
                </div>
            </div>
            <van-button type="info" class="search-btn" @click="search">查询</van-button>
        </div>
        <div class="result-panel">
            <div class="result-panel-header" flex="dir:left cross:center">
                <span class="header-left">进度情况</span>
            </div>
            <div class="result-panel-body">
                <div class="result-item" flex="dir:top cross:center">
                    <div class="item-row" flex="dir:left cross:center main:justify">
                        <div class="item-row-left">预约单号：3213214124124</div>
                        <div class="item-row-right status">未提交</div>
                    </div>
                    <div class="item-row process-chart">
                        <process-chart :activeIndex="2"></process-chart>
                    </div>
                    <div class="item-row" flex="dir:left cross:center main:justify">
                        <div class="item-row-left">宠物昵称：</div>
                        <div class="item-row-right">平平</div>
                    </div>
                    <div class="item-row" flex="dir:left cross:center main:justify">
                        <div class="item-row-left">提交时间：</div>
                        <div class="item-row-right">2020-05-14</div>
                    </div>
                    <div class="item-row" flex="dir:left cross:center main:justify">
                        <div class="item-row-left">办证类型：</div>
                        <div class="item-row-right">新办</div>
                    </div>
                    <van-button plain type="info" class="btn">作废</van-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import { Calendar, Button } from 'vant';
    import ProcessChart from './components/processChart.vue';
    const typeArray = [{labelName: '全部', value: '1'},{labelName: '新办', value: '2'},{labelName: '续办', value: '3'}]
    export default {
        name: 'process',
        components: {
            PageHeader,
            MyRadioGroup,
            [Calendar.name]: Calendar,
            [Button.name]: Button,
            ProcessChart
        },
        data(){
            return {
                showSearch: false,
                typeArray,
                params:{
                    startDay: '',
                    endDay: '',
                    type: '1'
                }
            }
        },
        methods:{
            showSearchPanel(){
                console.log('click right');
                this.showSearch = !this.showSearch;
            },
            getRealValue(attrName, value){
                this.params[attrName] = value;
            },
            search(){

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
            .result-item{
                width: 100%;
                height: 540px;
                background-color: #ffffff;
                box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
                border-radius: 10px;
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
                        &.status{
                            width: 130px;
                            height: 38px;
                            background-color: #aaaaaa;
                            border-radius: 4px;
                            text-align: center;
                            color: #ffffff;
                        }
                    }
                    &.process-chart{
                        height: 156px;
                    }
                    &:nth-child(5){
                        border-width: 0;
                    }
                }
                .btn{
                    width: 640px;
                    height: 70px;
                    margin-top: 15px;
                }
            }
        }
    }
}
</style>