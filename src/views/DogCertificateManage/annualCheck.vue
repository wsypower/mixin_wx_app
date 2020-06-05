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
    import { Toast } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import OrderItem from '../ProcessSearch/components/orderItem.vue';
    import { formatDate } from '@/utils/index';
    import { queryYearCarefulRecords } from '@/api/dogManage.js'
    import statusObj from '@/utils/statusObj.js';
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
                this.$store.commit('updateIsLoading', true);
                queryYearCarefulRecords(this.params).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    console.log('queryYearCarefulRecords',res.data);
                    if(res.errno === 0){
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
                    }
                    else{
                        Toast.fail({message: res.errmsg||'获取数据失败'});
                    }
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