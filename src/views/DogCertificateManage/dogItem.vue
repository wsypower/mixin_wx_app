<template>
    <div class="dog-item" flex="dir:top" @click="gotToDogDetailPage(dogData.id)">
        <div flex="dir:left cross:center">
            <img class="dog-item-img" :src="dogData.dogPhotoFront">
            <div flex="dir:top" class="dog-item_mes">
                <span class="dog-item_name">{{dogData.dogName}}</span>
                <span class="dog-item_status" :class="{warning: dogData.dogCarStatus===1,wrong: dogData.dogCarStatus===2}">{{dogData.statusName}}</span>
            </div>
        </div>
        <div flex="dir:left main:justify cross:bottom">
            <div class="dog-item-des">
                <div>有效期：{{dogData.validityStart|timeFormatter('YYYY-MM-DD')}}至{{dogData.validityEnd|timeFormatter('YYYY-MM-DD')}}</div>
                <div>登记证号：{{dogData.dogCardNumber}}</div>
            </div>
            <img class="dog-item-qr" :src="dogData.qRCodePath">
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast } from 'vant';
    export default {
        name: 'dogItem',
        props:{
            dogData:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            gotToDogDetailPage(dogId){
                console.log(`dogId: ${dogId}`);
                Toast('还没开发');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dog-item{
        width: 100%;
        height: 300px;
        margin-top: 20px;
        padding: 40px;
        border-radius: 10px;
        @include bg-image("~assets/images/home_bg");
        background-size: 100% 100%;
        .dog-item-img{
            width: 110px;
            height: 110px;
            background-color: #ffffff;
            border: solid 3px #ffffff;
            border-radius: 110px;
            //margin-top: 25px;
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
            width: 83px;
            height: 83px;
        }
    }
</style>