<template>
    <div class="dog-manage-page">
        <page-header title="犬证管理"></page-header>
        <div class="dog-manage-body" flex="dir:top cross:center" v-if="dogList.length>0">
            <dog-item v-for="item in dogList" :key="item.id" :dogData="item" :needClick="true"></dog-item>
        </div>
        <div class="no-data" v-else flex="dir:top cross:center main:center">
            <div class="no-data_icon"></div>
            <div class="no-data_text">暂无狗证</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import DogItem from './components/dogItem.vue';
    import { queryDogCard } from '@/api/home.js'
    const statusArr = ["有效","即将到期","已到期","已注销"];
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
                    this.dogList = res.data.map(item =>{
                        item.statusId = statusArr.findIndex(it => it===item.dogCarStatus)
                        return item
                    });
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
            padding-bottom: 20px;
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