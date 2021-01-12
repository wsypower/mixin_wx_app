<template>
    <div class="hotline-page">
        <page-header title="服务热线"></page-header>
        <div class="page-main">
            <div class="header-title" flex="dir:left cross:center main:center">
                <span class="icon iconfont icon-dianhua1"></span>
                <span>各区域服务热线电话</span>
            </div>
            <div class="hotline-list">
                <div class="hotline-list-item"
                     flex="dir:left cross:center"
                     v-for="(item,index) in list"
                     :key="index">
                    <span>{{item.areaName}}：</span>
                    <span @click="phoneToDogManageCenter(item.phone)">{{item.phone}}</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import { Icon }  from 'vant';
    import externalMethods from '@/utils/externalMethods/index.js';
    export default {
        name: 'hotline',
        components:{
            PageHeader,
            [Icon.name]: Icon
        },
        data(){
            return {
                list: [{areaName: '越城区', phone: '0575-85225110'},
                    {areaName: '柯桥区', phone: '0575-85581606'},
                    {areaName: '上虞区', phone: '0575-82191617'},
                    {areaName: '诸暨市', phone: '0575-89093916'},
                    {areaName: '嵊州市', phone: '0575-83003520'},
                    {areaName: '新昌县', phone: '0575-86073639'}]
            }
        },
        methods:{
            phoneToDogManageCenter(phone){
                //犬管中心电话
                externalMethods.telephone(phone).then(()=>{})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .hotline-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        .page-main{
            width: 100%;
            padding: 18px 24px 0px 24px;
            .header-title{
                width: 100%;
                height: 84px;
                @include bg-image("~assets/images/hotline");
                background-size: 100% 100%;
                color: #ffffff;
                font-size: 30px;
                font-weight: 700;
                .icon-dianhua1{
                    font-size: 34px;
                    margin-right: 10px;
                }
            }
            .hotline-list{
                margin-top: 10px;
                width: 100%;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
                .hotline-list-item{
                    width: 100%;
                    height: 108px;
                    border-bottom: 2px solid #f0f1f8;
                    padding-left: 40px;
                    span{
                        font-size: 32px;
                        color: #333333;
                        font-weight: 600;
                        &:last-child{
                            color: #306CE7;
                        }
                    }
                    &:last-child{
                        border-bottom-color: transparent;
                    }
                }
            }
        }

    }
</style>