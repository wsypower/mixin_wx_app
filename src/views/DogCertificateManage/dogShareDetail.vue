<template>
    <div class="share-page">
        <page-header title="犬证详情" :leftArrow="false"></page-header>
        <div class="share-page-main" flex="dir:top main:justify">
            <div class="share-page-main-content">
                <div class="dog-img-bg">

                </div>
                <div class="message-panel" flex="dir:left cross:center">
                    <div class="item">
                        <span class="item_title">犬名:</span>
                        <span class="item_value">平平</span>
                    </div>
                    <div class="item">
                        <span class="item_title">性别:</span>
                        <span class="item_value">公</span>
                    </div>
                    <div class="item">
                        <span class="item_title">犬种:</span>
                        <span class="item_value">金毛</span>
                    </div>
                    <div class="item">
                        <span class="item_title">毛色:</span>
                        <span class="item_value">土黄</span>
                    </div>
                    <div class="item">
                        <span class="item_title">犬主姓名:</span>
                        <span class="item_value">张*丰</span>
                    </div>
                    <div class="item">
                        <span class="item_title">联系电话:</span>
                        <span class="item_value">133****4598</span>
                    </div>
                    <div class="item">
                        <span class="item_title">登记证号:</span>
                        <span class="item_value">33010319880823M</span>
                    </div>
                </div>
            </div>
            <van-button type="info" class="btn" @click="phoneToDogManageCenter"><span class="icon iconfont icon-dianhua"></span>联系犬管中心</van-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button } from 'vant'
    import PageHeader from '@/components/pageHeader.vue';
    export default {
        name: 'share',
        components:{
            [Button.name]: Button,
            PageHeader
        },
        data(){
            return {

            }
        },
        methods:{
            phoneToDogManageCenter(){

            }
        }
    }
</script>
<style lang="scss" scoped>
    .share-page{
        width: 100%;
        height: 100%;
        padding-top: 88px;
        background-color: #f5f5f5;
        .share-page-main{
            width: 100%;
            height: 100%;
            padding: 28px 24px 46px 24px;
            .share-page-main-content{
                width: 100%;
                height: 940px;
                background-color: #ffffff;
                box-shadow: 0px 3px 7px 0px rgba(135, 135, 135, 0.35);
                border-radius: 10px;
                padding: 0px 28px;
                .dog-img-bg{
                    margin: 40px auto 50px;
                    width: 412px;
                    height: 518px;
                }
                .message-panel{
                    width: 100%;
                    flex-wrap: wrap;
                    .item{
                        width: 50%;
                        height: 80px;
                        font-family: PingFang-SC-Medium;
                        font-size: 28px;
                        color: #4d4d4d;
                        &_title{
                            display: inline-block;
                            width: 120px;
                            text-align: right;
                        }
                        &_value{
                            padding-left: 20px;
                        }
                        &:last-child{
                            width: 100%;
                        }
                    }

                }
            }
            .btn{
                width: 100%;
                height: 80px;
                .icon-dianhua{
                    font-size: 28px;
                    margin-right: 14px;
                }
            }
        }
    }
</style>