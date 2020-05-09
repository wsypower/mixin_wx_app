<template>
    <div class="index">
        <div class="header">
            <div class="header-left">
                <span class="icon iconfont point">&#xe63e;</span>
                <span class="address">越城区</span>
                <!--<span class="icon iconfont">&#xe60e;</span>-->
            </div>
            <span class="title">养犬管理</span>
        </div>
        <div class="main" flex="dir:top cross:center">
            <top></top>
            <operate></operate>
            <service-place></service-place>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import { NavBar } from 'vant';
    import Top from './components/top.vue'
    import Operate from './components/operate.vue'
    import ServicePlace from './components/serviceplace.vue'
    export default {
        name: 'index',
        components:{
            [NavBar.name]: NavBar,
            Top,
            Operate,
            ServicePlace
        },
        data(){
            return {}
        },
        mounted(){}
    }
</script>
<style lang="scss" scoped>
    .index{
        height: 100%;
        width: 100%;
        .header{
            width: 100%;
            height: 128px;
            background-color: #306ce7;
            color: #ffffff;
            position: relative;
            .header-left{
                position: absolute;
                left: 10px;
                bottom: 0px;
                height: 88px;
                line-height: 88px;
                .point{
                    margin-left: 10px;
                    font-size: 28px;
                }
                .address{
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    letter-spacing: 1px;
                }
            }
            .title{
                position: absolute;
                left: 50%;
                bottom: 0px;
                transform: translateX(-50%);
                height: 88px;
                line-height: 88px;
                font-family: PingFang-SC-Bold;
                font-size: 38px;
                letter-spacing: 1px;
            }
        }
        .main{
            padding-top: 20px;
            width: 100%;

        }
    }
</style>