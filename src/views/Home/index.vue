<template>
    <div class="home">
        <page-header title="养犬管理" :leftArrow="false">
            <div class="header-left" slot="left">
                <span class="icon iconfont point">&#xe63e;</span>
                <span class="address">越城区</span>
            </div>
        </page-header>
        <div class="main" flex="dir:top cross:center">
            <top></top>
            <operate></operate>
            <service-place></service-place>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue'
    import Top from './components/top.vue'
    import Operate from './components/operate.vue'
    import ServicePlace from './components/serviceplace.vue'
    export default {
        name: 'index',
        components:{
            PageHeader,
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
    .home{
        height: 100%;
        width: 100%;
        .header-left{
            color: #fff;
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
        .main{
            padding-top: 108px;
            height: 100%;
            width: 100%;
        }
    }
</style>