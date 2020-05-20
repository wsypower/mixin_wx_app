<template>
    <div class="top" >
        <div v-if="dogList.length===0" class="no-data-show" flex="dir:top cross:center main:center">
            <div class="no-data-img"></div>
            <div class="no-data-text">暂时没有您的爱犬信息~</div>
        </div>
        <van-swipe v-else class="dog-swipe" indicator-color="white">
            <van-swipe-item v-for="item in dogList" :key="item.id">
                <div class="dog-item" flex="dir:top" @click="gotoDogDetailPage(item.id)">
                    <div flex="dir:left cross:center">
                        <img class="dog-item-img" :src="item.dogPhotoFront">
                        <div flex="dir:top" class="dog-item_mes">
                            <span class="dog-item_name">{{item.dogName}}</span>
                            <span class="dog-item_status" :class="{warning: item.dogCarStatus===1,wrong: item.dogCarStatus===2}">{{item.statusName}}</span>
                        </div>
                    </div>
                    <div flex="dir:left main:justify cross:bottom">
                        <div class="dog-item-des">
                            <div>有效期：{{item.validityStart|timeFormatter('YYYY-MM-DD')}}至{{item.validityEnd|timeFormatter('YYYY-MM-DD')}}</div>
                            <div>登记证号：{{item.dogCardNumber}}</div>
                        </div>
                        <img class="dog-item-qr" :src="item.qRCodePath">
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Swipe, SwipeItem, Toast } from 'vant';
    const statusArr = ["有效","即将到期","已到期"];
    export default {
        name: 'top',
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast
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
            this.dogList = JSON.parse(JSON.stringify(this.dogCards));
            this.dogList.forEach(item => {
                item.statusName = statusArr[item.dogCarStatus];
            })
        },
        methods:{
            gotoDogDetailPage(dogId){
                console.log(`dogId: ${dogId}`);
                Toast('还没开发');
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
                width: 83px;
                height: 83px;
            }
        }
    }

}
</style>