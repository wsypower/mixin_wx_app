<template>
    <div class="top" >
        <div v-if="dogList.length===0" class="no-data-show" flex="dir:top cross:center main:center">
            <div class="no-data-img"></div>
            <div class="no-data-text">暂时没有您的爱犬信息~</div>
        </div>
        <van-swipe v-else class="dog-swipe" indicator-color="white">
            <van-swipe-item v-for="item in dogList" :key="item.id">
                <div class="dog-item" flex="dir:top" @click="gotoDogDetailPage(item.dogCardNumber)">
                    <div flex="dir:left cross:center">
                        <img class="dog-item-img" :src="item.dogPhotoFront">
                        <div flex="dir:top" class="dog-item_mes">
                            <span class="dog-item_name">{{item.dogName}}</span>
                            <span class="dog-item_status" :class="{warning: item.statusId===1,wrong: item.statusId===2,gray: item.statusId===3}">{{item.dogCarStatus}}</span>
                        </div>
                    </div>
                    <div flex="dir:left main:justify cross:bottom">
                        <div class="dog-item-des">
                            <div>有效期：{{item.validityStart|timeFormatter('YYYY-MM-DD')}}至{{item.validityEnd|timeFormatter('YYYY-MM-DD')}}</div>
                            <div>登记证号：{{item.dogCardNumber}}</div>
                        </div>
                        <div class="dog-item-qr" :style="{ backgroundImage: item.backgroundImage }" @click.stop="previewQrImg(item.qRCodePath)"></div>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Swipe, SwipeItem, Toast, ImagePreview } from 'vant';
    const statusArr = ["有效","即将到期","已到期","注销"];
    export default {
        name: 'top',
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
            [ImagePreview.Component.name]: ImagePreview.Component
        },
        props:{
            dogCards: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data(){
            return {
                dogList:[]
            }
        },
        mounted(){

        },
        watch:{
            dogCards: function(val){
                this.dogList = JSON.parse(JSON.stringify(val));
                this.dogList.forEach(item => {
                    item.statusId = statusArr.findIndex(it=>it===item.dogCarStatus);
                    if(item.statusId===0){
                        item.backgroundImage = 'url(' + item.qRCodePath + '),linear-gradient(#0f0, #0f0)';
                    }
                    else if(item.statusId===1){
                        item.backgroundImage = 'url(' + item.qRCodePath + '),linear-gradient(#ffa200, #ffa200)';
                    }
                    else if(item.statusId===2){
                        item.backgroundImage = 'url(' + item.qRCodePath + '),linear-gradient(#f00, #f00)';
                    }
                    else {
                        item.backgroundImage = 'url(' + item.qRCodePath + '),linear-gradient(#999999, #999999)';
                    }
                })
            }
        },
        methods:{
            previewQrImg(qRCodePath){
                ImagePreview([qRCodePath]);
            },
            gotoDogDetailPage(dogCardNumber){
                console.log(`dogCardNumber:`, dogCardNumber);
                this.$router.push('/dogCertificateManage/' + dogCardNumber +'/detail');
            }
        }
    }
</script>
<style lang="scss" scoped>
.top{
    width: 100%;
    height: 300px;
    border-radius: 10px;
    @include bg-image("~assets/images/home_bg");
    background-size: 100% 100%;
    .no-data-show{
        width: 100%;
        height: 100%;
        .no-data-img{
            width: 118px;
            height: 100px;
            @include bg-image("~assets/images/no_data_2");
            background-size: 100% 100%;
        }
        .no-data-text{
            margin-top: 30px;
            font-family: PingFang-SC-Medium;
            font-size: 28px;
            line-height: 40px;
            letter-spacing: 0px;
            color: #ffffff;
        }
    }
    .dog-swipe{
        .dog-item{
            height: 300px;
            padding: 0px 37px;
            .dog-item-img{
                width: 110px;
                height: 110px;
                background-color: #ffffff;
                border: solid 3px #ffffff;
                border-radius: 110px;
                margin-top: 25px;
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
                padding-top: 15px;
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
    }

}
</style>