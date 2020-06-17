<template>
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <slot name="right"></slot>
        </template>
        <template #left>
            <slot name="left"></slot>
        </template>
    </van-nav-bar>
</template>
<script type="text/ecmascript-6">
    import { NavBar } from 'vant';
    export default {
        name: 'pageHeader',
        components:{
            [NavBar.name]: NavBar
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            leftArrow: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {

            }
        },
        methods:{
            onClickLeft(){
                if(this.leftArrow){
                    this.$router.go(-1);
                }
                else{
                    console.log('nothing!!!');
                }
            },
            onClickRight(){
                this.$emit('clickRight')
            }
        }
    }
</script>
<style lang="scss">
.van-nav-bar{
    height: 88px;
    background-color: #306ce7;
    flex: none;
    .van-nav-bar__left{
        padding-left: 12px;
    }
    .van-nav-bar__arrow{
        color: #ffffff;
        font-size: 36px;
    }
    .van-nav-bar__title{
        color: #fff;
        font-size: 38px;
        height: 88px;
        line-height: 88px;
    }
}
</style>