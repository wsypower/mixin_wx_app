<template>
    <div class="dog-manage-page">
        <page-header title="犬证管理"></page-header>
        <div class="dog-manage-body" flex="dir:top cross:center" v-if="dogList.length>0">
            <dog-item v-for="item in dogList" :key="item.id" :dogData="item"></dog-item>
        </div>
        <div class="no-data" flex="dir:top cross:center main:center">
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
                // let dogTemp = {
                //     id: 'sh52673836389293hsol',
                //     dogUrl: require('./testImg/1.png'),
                //     name: '嘻嘻',
                //     code: '23148784656898914783',
                //     startDay: '2020-05-06',
                //     endDay: '2020-11-05',
                //     statusId: 0,
                //     statusName: '有效',
                //     QRCodeUrl: require('./testImg/qr.png')
                // }
                // let dogTemp2 = {
                //     id: 'ax12573836389293hsol',
                //     dogUrl:  require('./testImg/2.png'),
                //     name: '菲菲',
                //     code: '51478784656898914783',
                //     startDay: '2020-01-01',
                //     endDay: '2020-04-05',
                //     statusId: 2,
                //     statusName: '过期',
                //     QRCodeUrl: require('./testImg/qr.png')
                // }
                // let dogTemp3 = {
                //     id: 'zaa12573836389293hsol',
                //     dogUrl:  require('./testImg/3.png'),
                //     name: '飞利浦',
                //     code: '51478784656898914783',
                //     startDay: '2020-04-01',
                //     endDay: '2020-06-05',
                //     statusId: 1,
                //     statusName: '即将过期',
                //     QRCodeUrl: require('./testImg/qr.png')
                // }
                // this.dogList.push(dogTemp);
                // this.dogList.push(dogTemp2);
                // this.dogList.push(dogTemp3);
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