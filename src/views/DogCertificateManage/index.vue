<template>
    <div class="dog-manage-page">
        <page-header title="犬证管理"></page-header>
        <div class="dog-manage-body" flex="dir:top cross:center" v-if="dogList.length>0">
            <dog-item v-for="item in dogList" :key="item.id" :dogData="item"></dog-item>
        </div>
        <div class="no-data" v-else flex="dir:top cross:center main:center">
            <div class="no-data_icon"></div>
            <div class="no-data_text">暂无狗证</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import DogItem from './dogItem.vue';
    import { queryDogCard } from '@/api/home.js'
    export default {
        name: 'dogCertificateManage',
        components:{
            PageHeader,
            DogItem
        },
        data(){
            return {
                dogList: []
            }
        },
        mounted(){
            this.getListData();
        },
        methods:{
            getListData(){
                queryDogCard({userId: this.$store.getters['userId']}).then( res => {
                    this.dogList = res.data;
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dog-manage-page{
        width: 100%;
        height: 100%;
        padding-top: 88px;
        background-color: #f5f5f5;
        .dog-manage-body{
            width: 100%;
            padding: 0px 24px;
        }
        .no-data{
            width: 100%;
            height: 100%;
            &_icon{
                width: 374px;
                height: 288px;
                background-size: 100% 100%;
                @include bg-image("~assets/images/no_data");
            }
            &_text{
                font-family: PingFang-SC-Medium;
                font-size: 32px;
                line-height: 43px;
                letter-spacing: 0px;
                color: #666666;
            }
        }
    }
</style>