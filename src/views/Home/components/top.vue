<template>
    <div class="top" >
        <div v-if="dogCards.length===0" class="no-data-show" flex="dir:top cross:center main:center">
            <div class="no-data-img"></div>
            <div class="no-data-text">暂时没有您的爱犬信息~</div>
        </div>
        <van-swipe v-else class="dog-swipe" indicator-color="white" ref="swiper">
            <van-swipe-item v-for="item in dogCards" :key="item.id" @touchstart="touchStartFun" @touchend="touchEndFun">
                <dog-item :dogData="item" :needToDetail="true" :isRealClick="isRealClick"></dog-item>
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
            return {
                isRealClick: true
            }
        },
        mounted(){},
        methods:{
            touchStartFun(e){
                e.preventDefault;
                let touch = e.touches[0]; //获取第一个触点
                this.startX = Number(touch.pageX);
            },
            touchEndFun(e){
                let touch = e.changedTouches[0]; //获取最后一个触点
                let x = Number(touch.pageX);
                console.log('x: ' + x);
                if(Math.abs(x-this.startX)>5){
                    this.isRealClick = false
                    if(x-this.startX>5){
                        // this.$emit('prev');
                        this.$refs.swiper.prev();
                    }
                    else{
                        this.$refs.swiper.next();
                        // this.$emit('next');
                    }
                }
                else{
                    this.isRealClick = true
                }
            }
            // prev(){
            //     this.$refs.swiper.prev();
            // },
            // next(){
            //     this.$refs.swiper.next();
            // }
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
    .dog-swipe{}
}
</style>