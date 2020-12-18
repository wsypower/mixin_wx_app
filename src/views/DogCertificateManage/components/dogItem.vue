<template>
    <div class="dog-item" flex="dir:top" @click="gotToDogDetailPage(dogData.dogCardNumber)">
        <div flex="dir:left cross:center" style="position: relative">
            <img class="dog-item-img" :src="dogData.imgHost + dogData.dogPhotoFront">
            <div flex="dir:top" class="dog-item_mes">
                <span class="dog-item_name">{{dogData.dogName}}</span>
                <span class="dog-item_status" :class="{warning: statusId===1,wrong: statusId===2,gray: statusId===3}">{{dogData.dogCarStatus}}</span>
            </div>
            <div class="share_btn" flex="dir:left cross:center main:center" v-if="needShare" @touchend.stop="share">
                <span class="icon iconfont icon-fenxiang3"></span>
                <span>分享</span>
            </div>
        </div>
        <div flex="dir:left main:justify cross:bottom">
            <div class="dog-item-des">
                <div>有效期：{{dogData.validityStart|timeFormatter('YYYY-MM-DD')}}至{{dogData.validityEnd|timeFormatter('YYYY-MM-DD')}}</div>
                <div>登记证号：{{dogData.dogCardNumber}}</div>
            </div>
            <div class="dog-item-qr" :style="{ backgroundImage: backgroundImage }" @touchend.stop="previewQrImg(dogData.imgHost + dogData.qrCodePath)"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast, ImagePreview } from 'vant';
    const statusArr = ["有效","即将到期","已到期","注销"];
    export default {
        name: 'dogItem',
        props:{
            needToDetail:{
                type: Boolean,
                default (){
                    return false
                }
            },
            needShare:{
                type: Boolean,
                default (){
                    return false
                }
            },
            dogData:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data(){
           return {
               startX: 0
           }
        },
        computed:{
           statusId: function(){
               return statusArr.findIndex(it => it === this.dogData.dogCarStatus);
           },
           backgroundImage: function(){
               if(this.statusId===0){
                   return 'url(' + this.dogData.imgHost + this.dogData.qrCodePath + '),linear-gradient(#0f0, #0f0)';
               }
               else if(this.statusId===1){
                    return 'url(' + this.dogData.imgHost + this.dogData.qrCodePath + '),linear-gradient(#ffa200, #ffa200)';
               }
               else if(this.statusId===2){
                   return 'url(' + this.dogData.imgHost + this.dogData.qrCodePath + '),linear-gradient(#f00, #f00)';
               }
               else {
                   return 'url(' + this.dogData.imgHost + this.dogData.qrCodePath + '),linear-gradient(#999999, #999999)';
               }
           }
        },
        methods:{
            share(){
                Toast('该功能暂未上线');
            },
            previewQrImg(qRCodePath){
                ImagePreview([qRCodePath]);
            },

            //@click="gotToDogDetailPage(dogData.dogCardNumber)"
            gotToDogDetailPage(dogCardNumber){
                if(this.needToDetail){
                    console.log(`dogCardNumber: ${dogCardNumber}`);
                    this.$router.push('/dogCertificateManage/' + dogCardNumber + '/detail');
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dog-item{
        width: 100%;
        height: 300px;
        padding: 40px;
        border-radius: 10px;
        @include bg-image("~assets/images/home_bg");
        background-size: 100% 100%;
        .share_btn{
            width: 110px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            border: solid 2px #ffffff;
            position: absolute;
            top: 0;
            right: 0;
            span{
                font-family: PingFang-SC-Regular;
                font-size: 24px;
                color: #ffffff;
            }
            .icon-fenxiang3{
                margin: 0px 6px 0px 0px;
            }
        }
        .dog-item-img{
            width: 110px;
            height: 110px;
            background-color: #ffffff;
            border: solid 3px #ffffff;
            border-radius: 110px;
        }
        .dog-item_mes{
            margin-left: 30px;
            .dog-item_name{
                font-family: PingFang-SC-Medium;
                font-size: 32px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #ffffff;
            }
            .dog-item_status{
                margin-top: 24px;
                background-color: #22ac38;
                border-radius: 5px;
                font-family: PingFang-SC-Medium;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
                padding: 0px 10px;
                width: 120px;
                &.warning{
                    background-color: #ffa200;
                }
                &.wrong{
                    background-color: #e33232;
                }
                &.gray{
                    background-color: #999999;
                }
            }
        }
        .dog-item-des{
            padding-top: 20px;
            >div{
                font-family: PingFang-SC-Medium;
                font-size: 26px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #ffffff;
                &:last-child{
                    margin-top: 10px;
                }
            }
        }
        .dog-item-qr{
            width: 84px;
            height: 84px;
            background-blend-mode: lighten;
            background-size: 100%;
            background-position: center;
        }
    }
</style>