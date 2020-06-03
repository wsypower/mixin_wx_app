<template>
    <div class="result-item" flex="dir:top cross:center" @click="gotoDetail">
        <div class="item-row" flex="dir:left cross:center main:justify">
            <div class="item-row-left">预约单号：{{cardInfo.orderCode}}</div>
            <div class="item-row-right status"
                 :class="{gray:cardInfo.statusId==='0',yellow:cardInfo.statusId==='1',blue:cardInfo.statusId==='2',red:cardInfo.statusId==='3'||cardInfo.statusId==='5',green:cardInfo.statusId==='4'}">
                {{cardInfo.statusName}}
            </div>
        </div>
        <div class="item-row process-chart">
            <process-chart v-if="cardInfo.cardType === '新办'" :activeIndex="activeIndex"></process-chart>
            <process-chart-three v-else :activeIndex="activeIndex"></process-chart-three>
        </div>
        <div class="item-row" flex="dir:left cross:center main:justify">
            <div class="item-row-left">宠物昵称：</div>
            <div class="item-row-right">{{cardInfo.dogName}}</div>
        </div>
        <div class="item-row" flex="dir:left cross:center main:justify">
            <div class="item-row-left">提交时间：</div>
            <div class="item-row-right">{{cardInfo.submitTime}}</div>
        </div>
        <div class="item-row" flex="dir:left cross:center main:justify">
            <div class="item-row-left">办证类型：</div>
            <div class="item-row-right">{{cardInfo.cardType}}</div>
        </div>
        <van-button plain type="info" class="btn" v-if="cardInfo.statusId === '0'" @click.stop="deleteDogItem(cardInfo.orderId)">作废</van-button>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button, Toast } from 'vant';
    import ProcessChart from './processChart.vue';
    import ProcessChartThree from './processChartThree.vue';
    import { deleteDogItem } from '@/api/process.js'
    const indexArr = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 3,
        '5': 2
    }
    export default{
        name: 'cardItem',
        components:{
            ProcessChart,
            ProcessChartThree,
            [Button.name]: Button,
        },
        props:{
            cardInfo: {
                orderId: '',
                orderCode: '',
                statusId: '',
                iconStatusId: '',
                statusName: '',
                dogName: '',
                submitTime: '',
                cardType: ''
            }
        },
        computed: {
            activeIndex(){
                return indexArr[this.cardInfo.iconStatusId]
            }
        },
        data(){
            return {

            }
        },
        methods:{
            deleteDogItem(dogOrderId){
                let params = {
                    userId: this.$store.getters['userId'],
                    orderId: dogOrderId
                }
                deleteDogItem(params).then( res => {
                    if(res.errno === 0){
                        Toast.success({message: '删除成功'});
                        this.$emit('refreshList');
                    }
                    else{
                        Toast.fail({message: res.errmsg});
                    }
                })
            },
            gotoDetail(){
                this.$emit('gotoPage');
            }
        }

    }
</script>
<style lang="scss" scoped>
    .result-item{
        width: 100%;
        //height: 540px;
        background-color: #ffffff;
        box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
        border-radius: 10px;
        .item-row{
            height: 68px;
            width: 100%;
            padding: 0px 24px;
            border-bottom: solid 2px #e5e5e5;
            .item-row-left{
                font-family: PingFang-SC-Medium;
                font-size: 26px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #4d4d4d;
            }
            .item-row-right{
                font-family: PingFang-SC-Medium;
                font-size: 28px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #666666;
                &.status{
                     width: 130px;
                     height: 38px;
                     border-radius: 4px;
                     text-align: center;
                     font-size: 24px;
                     color: #ffffff;
                    &.gray{
                         background-color: #aaaaaa;
                     }
                    &.yellow{
                         background-color: #ffa200;
                     }
                    &.blue{
                         background-color: #0f84fb;
                     }
                    &.red{
                         background-color: #ff0000;
                     }
                    &.green{
                         background-color: #22ac38;
                     }
                }
            }
            &.process-chart{
                 height: 156px;
             }
            &:nth-child(5){
                 border-width: 0;
             }
        }
        .btn{
            width: 640px;
            height: 70px;
            margin-top: 15px;
            margin-bottom: 25px;
        }
    }
</style>