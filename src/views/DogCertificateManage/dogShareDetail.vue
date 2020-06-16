<template>
    <div class="share-page">
        <page-header title="犬证详情" :leftArrow="false"></page-header>
        <div class="share-page-main" flex="dir:top main:justify">
            <div class="share-page-main-content">
                <div class="dog-img-bg">
                    <div class="img-panel" flex="cross:center main:center">
                        <img :src="dogDetail.dogPhotoFront" />
                    </div>
                </div>
                <div class="message-panel" flex="dir:left cross:center">
                    <div class="item">
                        <span class="item_title">犬名:</span>
                        <span class="item_value">{{dogDetail.dogName}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">性别:</span>
                        <span class="item_value">{{dogDetail.dogSexStr}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">犬种:</span>
                        <span class="item_value">{{dogDetail.breed}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">毛色:</span>
                        <span class="item_value">{{dogDetail.hairColor}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">犬主姓名:</span>
                        <span class="item_value">{{dogDetail.ownerName}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">联系电话:</span>
                        <span class="item_value">{{dogDetail.phone}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">登记证号:</span>
                        <span class="item_value">{{dogDetail.dogCardNumber}}</span>
                    </div>
                    <div class="item">
                        <span class="item_title">犬管中心:</span>
                        <a class="item_value" :href="'tel:'+ telPhone">{{telPhone}}</a>
                    </div>
                </div>
            </div>
            <!--<van-button type="info" class="btn" @click="phoneToDogManageCenter"><span class="icon iconfont icon-dianhua"></span>联系犬管中心</van-button>-->
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button } from 'vant'
    import PageHeader from '@/components/pageHeader.vue';
    import externalMethods from '@/utils/externalMethods/index.js'
    import { getURLParameters } from '@/utils/index.js';
    import { queryDogByQrCode } from '@/api/dogManage.js'
    export default {
        name: 'share',
        components:{
            [Button.name]: Button,
            PageHeader
        },
        data(){
            return {
                //二维码
                qrCode: '',
                //犬管中心电话
                telPhone: '0571-********',
                dogDetail:{
                    //犬昵称
                    dogName: '',
                    //犬正面照
                    dogPhotoFront: '',
                    //犬性别
                    dogSex: '',
                    //犬种类
                    breed: '',
                    //犬毛色
                    hairColor: '',
                    //犬主姓名
                    ownerName: '',
                    //犬主手机号
                    phone: '',
                    //犬证编号
                    dogCardNumber: ''
                }
            }
        },
        mounted(){
            //从URL上面获取qrCode
            this.qrCode = getURLParameters('qrcode');
            //获取分享信息
            this.getShareData();
        },
        methods:{
            getShareData(){
                console.log(`qrCode: ${this.qrCode}`);
                queryDogByQrCode({qrCode: this.qrCode}).then(res => {
                    this.dogDetail = res.data;
                })
            },
            phoneToDogManageCenter(){
                //犬管中心电话
                externalMethods.telephone('').then(()=>{})
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
                height: 1020px;
                background-color: #ffffff;
                box-shadow: 0px 3px 7px 0px rgba(135, 135, 135, 0.35);
                border-radius: 10px;
                padding: 0px 28px;
                .dog-img-bg{
                    margin: 40px auto 50px;
                    width: 412px;
                    height: 518px;
                    @include bg-image("~assets/images/img_bg");
                    background-size: 100% 100%;
                    padding: 172px 66px 62px 66px;
                    .img-panel{
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
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
                        &:nth-last-child(2){
                            width: 100%;
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