<template>
    <div class="top" >
        <div v-if="dogCards.length===0" class="no-data-show" flex="dir:top cross:center main:center">
            <div class="no-data-img"></div>
            <div class="no-data-text">暂时没有您的爱犬信息~</div>
        </div>
        <van-swipe v-else class="dog-swipe" indicator-color="white">
            <van-swipe-item v-for="item in dogCards" :key="item.id">
                <dog-item :dogData="item" :needToDetail="true"></dog-item>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Swipe, SwipeItem} from 'vant';
    import DogItem from '../../DogCertificateManage/components/dogItem.vue'
    export default {
        name: 'top',
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            DogItem
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
            return {}
        },
        mounted(){},
        methods:{}
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
    .dog-swipe{}
}
</style>