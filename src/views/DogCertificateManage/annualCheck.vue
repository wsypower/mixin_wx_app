<template>
    <div class="annual-check-page" flex="dir:top cross:center">
        <page-header title="年审记录"></page-header>
        <order-item class="order-item"
                    :cardInfo="item"
                    v-for="item in cardInfoList"
                    :key="item.orderCode"
                    @refreshList="() => {getProcessList();}"
                    @gotoPage="() => {gotoDetail(item);}">
        </order-item>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import OrderItem from '../ProcessSearch/components/orderItem.vue';
    import { formatDate } from '@/utils/index';
    import { queryYearCarefulRecords } from '@/api/dogManage.js'
    const statusObj = {
        '-0-':{
            statusId: '0',
            iconStatusId: '0',
            statusName: '未提交',
        },
        '-10-60-':{
            statusId: '1',
            iconStatusId: '1',
            statusName: '审核中',
        },
        '-25-85-':{
            statusId: '3',
            iconStatusId: '1',
            statusName: '审核未通过',
        },
        '-20-':{
            statusId: '2',
            iconStatusId: '2',
            statusName: '审核通过',
        },
        '-30-':{
            statusId: '1',
            iconStatusId: '2',
            statusName: '审核中',
        },
        '-45-':{
            statusId: '5',
            iconStatusId: '2',
            statusName: '审核未通过',
        },
        '-40-80-':{
            statusId: '4',
            iconStatusId: '3',
            statusName: '已登记',
        }
    }
    export default {
        name: 'annual',
        components: {
            PageHeader,
            OrderItem
        },
        data(){
            return {
                params:{
                    userId: '',
                    dogId: '',
                    pageSize: 20,
                    currentPage: 1
                },
                cardInfoList: []
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.params.dogId = this.$store.getters['dog/dogInfo'].dogId;
            this.getProcessList();
        },
        methods:{
            getProcessList(){
                queryYearCarefulRecords(this.params).then( res => {
                    console.log('queryYearCarefulRecords',res.data);
                    this.cardInfoList = res.data.queryList.reduce((acc,item) => {
                        let statusKey = Object.keys(statusObj).find(key=>key.indexOf('-' + item.status + '-')>=0);
                        let temp = {
                            orderId: item.id,
                            orderCode: item.orderNo,
                            statusId: statusKey ? statusObj[statusKey].statusId: '',
                            iconStatusId: statusKey ? statusObj[statusKey].iconStatusId: '',
                            statusName: statusKey ? statusObj[statusKey].statusName: '',
                            dogName: item.dogName,
                            submitTime: item.submitTime ? formatDate(item.submitTime, 'yyyy-MM-dd'):'----',
                            cardType: item.cardType===0? '新办': '续办',
                            currentStep: item.currentStep,
                            userType: item.userType
                        }
                        acc.push(temp);
                        return acc
                    },[]);
                });
            },

            gotoDetail(item){
                console.log('item:', item);
                if(item.statusId === '0'){
                    this.$router.push({
                        path:'/newApply',
                        query:{
                            currentStep: item.currentStep,
                            orderId: item.orderId,
                            userType: item.userType
                        }
                    });
                }
                else if(item.statusId === '3'){
                    if(item.cardType===0){
                        this.$router.push({
                            path:'/newApply',
                            query:{
                                currentStep: 1,
                                orderId: item.orderId,
                                userType: item.userType
                            }
                        });
                    }
                    else{
                        this.$router.push({
                            path:'/continuedApply',
                            query:{
                                currentStep: 5,
                                orderId: item.orderId
                            }
                        });
                    }
                }
                else{
                    console.log('跳转至订单详情页');
                    this.$router.push('/' + item.orderCode + '/detail');
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .annual-check-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding: 88px 24px 20px 24px;
        .order-item{
            margin-top: 20px;
        }
    }
</style>