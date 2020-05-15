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
                        <img class="dog-item-img" :src="item.dogUrl">
                        <div flex="dir:top" class="dog-item_mes">
                            <span class="dog-item_name">{{item.name}}</span>
                            <span class="dog-item_status" :class="{warning: item.statusId===1,wrong: item.statusId===2}">{{item.statusName}}</span>
                        </div>
                    </div>
                    <div flex="dir:left main:justify cross:bottom">
                        <div class="dog-item-des">
                            <div>有效期：{{item.startDay}}至{{item.endDay}}</div>
                            <div>登记证号：{{item.code}}</div>
                        </div>
                        <img class="dog-item-qr" :src="item.QRCodeUrl">
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Swipe, SwipeItem, Toast } from 'vant';
    export default {
        name: 'top',
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast
        },
        data(){
            return {
                dogList:[]
            }
        },
        mounted(){
            this.getDogListData();
        },
        methods:{
            getDogListData(){
                console.log('home top userId',this.$store.getters['userId']);
                let dogTemp = {
                    id: 'sh52673836389293hsol',
                    dogUrl: require('./testImg/1.png'),
                    name: '嘻嘻',
                    code: '23148784656898914783',
                    startDay: '2020-05-06',
                    endDay: '2020-11-05',
                    statusId: 0,
                    statusName: '有效',
                    QRCodeUrl: require('./testImg/qr.png')
                }
                let dogTemp2 = {
                    id: 'ax12573836389293hsol',
                    dogUrl:  require('./testImg/2.png'),
                    name: '菲菲',
                    code: '51478784656898914783',
                    startDay: '2020-01-01',
                    endDay: '2020-04-05',
                    statusId: 2,
                    statusName: '过期',
                    QRCodeUrl: require('./testImg/qr.png')
                }
                let dogTemp3 = {
                    id: 'zaa12573836389293hsol',
                    dogUrl:  require('./testImg/3.png'),
                    name: '飞利浦',
                    code: '51478784656898914783',
                    startDay: '2020-04-01',
                    endDay: '2020-06-05',
                    statusId: 1,
                    statusName: '即将过期',
                    QRCodeUrl: require('./testImg/qr.png')
                }
                this.dogList.push(dogTemp);
                this.dogList.push(dogTemp2);
                this.dogList.push(dogTemp3);
            },
            gotoDogDetailPage(dogId){
                console.log(`dogId: ${dogId}`);
                Toast('还没开发');
            }
        }
    }
</script>
<style lang="scss" scoped>
.top{
    width: 702px;
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