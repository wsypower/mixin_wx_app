<template>
    <div class="dog-manage-page">
        <page-header title="犬证年审"></page-header>
        <div class="dog-manage-body" v-if="dogList.length>0">
            <dog-item v-for="item in dogList" :key="item.id" :dogData="item" :needToDetail="true" :needShare="true" class="mt20"></dog-item>
        </div>
        <div v-else class="no-data" flex="dir:top cross:center main:center">
            <div class="no-data_icon"></div>
            <div class="no-data_text">暂无狗证</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import DogItem from './components/dogItem.vue';
    import { queryDogCard } from '@/api/dogManage.js'
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
            //获取用户的所有犬证
            getListData(){
                this.$store.commit('updateIsLoading', true);
                queryDogCard({userId: this.$store.getters['userId']}).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    if(res.errno === 0){
                        this.dogList = res.data;
                    }
                    else{
                        Toast.fail({message: res.errmsg || '获取数据失败'})
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dog-manage-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        .dog-manage-body{
            width: 100%;
            padding: 0px 24px 20px 24px;
            flex: auto;
            overflow-y: auto;
            .mt20{
                margin-top: 20px;
            }
        }
        .no-data{
            width: 100%;
            flex: auto;
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