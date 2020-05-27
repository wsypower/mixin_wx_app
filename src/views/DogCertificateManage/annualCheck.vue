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
    import { querybidDogCardRecord } from '@/api/process.js'
    const statusObj = {
        '-0-':{
            statusId: '0',
            statusName: '未提交',
        },
        '-10-30-60-':{
            statusId: '1',
            statusName: '审核中',
        },
        '-20-':{
            statusId: '2',
            statusName: '审核通过',
        },
        '-25-45-85-':{
            statusId: '3',
            statusName: '审核未通过',
        },
        '-40-80-':{
            statusId: '4',
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
                },
                cardInfoList: []
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.getProcessList();
        },
        methods:{
            getProcessList(){
                let temp1 = {
                        orderId: '12345678',
                        orderCode: '2005010233060200009',
                        statusId: 1,
                        statusName: '有效',
                        dogName: '妮妮',
                        submitTime: '----',
                        cardType: '新办',
                        currentStep: 4,
                        userType: 0
                    }
                let temp2 = {
                    orderId: '123456785555',
                    orderCode: '2005010233060200008',
                    statusId: 1,
                    statusName: '有效',
                    dogName: '毛毛',
                    submitTime: '----',
                    cardType: '新办',
                    currentStep: 4,
                    userType: 0
                }
                this.cardInfoList.push(temp1);
                this.cardInfoList.push(temp2);
                // querybidDogCardRecord(this.params).then( res => {
                //     console.log('querybidDogCardRecord',res.data);
                //     this.cardInfoList = res.data.reduce((acc,item) => {
                //         let statusKey = Object.keys(statusObj).find(key=>key.indexOf('-' + item.status + '-')>=0);
                //         let temp = {
                //             orderId: item.id,
                //             orderCode: item.orderNo,
                //             statusId: statusKey ? statusObj[statusKey].statusId: '',
                //             statusName: statusKey ? statusObj[statusKey].statusName: '',
                //             dogName: item.dogName,
                //             submitTime: item.submitTime ? formatDate(item.submitTime, 'yyyy-MM-dd'):'----',
                //             cardType: item.cardType===0? '新办': '续办',
                //             currentStep: item.currentStep,
                //             userType: item.userType
                //         }
                //         acc.push(temp);
                //         return acc
                //     },[]);
                // });
            },
            search(){
                this.getProcessList();
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
                                orderId: this.orderInfo.orderId
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