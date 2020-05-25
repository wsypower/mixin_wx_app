<template>
    <div class="apply-page">
        <page-header title="犬证申办"></page-header>
        <div class="apply-main" flex="dir:top cross:center">
            <card-layout>
                <div class="type-content" slot="content">
                    <div class="form-item" flex="dir:left cross:center">
                        <div class="from-item-label">养犬类型：</div>
                        <div class="from-item-inline">
                            <my-radio-group :initValue="userType" :radioGroup="typeArray" @getRealValue="(name)=>{getRealValue('userType', name)}"></my-radio-group>
                        </div>
                    </div>
                    <div class="form-item" flex="dir:left cross:center">
                        <div class="from-item-label">办证类型：</div>
                        <div class="from-item-inline">
                            <my-radio-group :initValue="cardType" :radioGroup="methodArray" @getRealValue="(name)=>{getRealValue('cardType', name)}"></my-radio-group>
                        </div>
                    </div>
                    <van-button class="next-btn" color="linear-gradient(0deg, #4b7ee5 0%, #306ce7 100%)" @click="nextPage">继续</van-button>
                </div>
            </card-layout>
            <history-apply-list></history-apply-list>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { RadioGroup, Radio, Button } from 'vant';
    import PageHeader from '@/components/pageHeader.vue'
    import CardLayout from './components/cardLayout.vue'
    import HistoryApplyList from './components/historyApplyList.vue'
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import orderInitInfo from '@/utils/orderInit.js'
    import myMixin from '@/utils/mixin.js'
    export default {
        name: 'apply',
        components: {
            PageHeader,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            CardLayout,
            HistoryApplyList,
            MyRadioGroup
        },
        mixins: [myMixin],
        data(){
            return {
                userType: '0',
                cardType : '0'
            }
        },
        mounted(){},
        methods: {
            //单选实际值
            getRealValue(attrName, value){
                this[attrName] = value;
            },
            nextPage(){
                console.log(this.userType, this.cardType);
                this.$store.commit('order/updateOrderInfo', orderInitInfo);
                if(this.cardType==='0'){
                    //代表个人的新办
                    if(this.userType==='0'){
                        this.$router.push('/newApply/stepOneForPerson');
                    }
                    else{
                        //代表单位的新办
                        this.$router.push('/newApply/stepOneForCompany');
                    }
                }
                //代表个人或者单位的续办
                else {
                    this.$router.push('/continuedApply');
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .apply-page{
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;
        padding-top: 88px;
        .apply-main{
            width: 100%;
            height: 100%;
            padding: 20px 24px;
            .type-content{
                .form-item{
                    margin-bottom: 34px;
                    .from-item-label{
                        width: 200px;
                        font-family: PingFang-SC-Medium;
                        font-size: 32px;
                        letter-spacing: 0px;
                        color: #4d4d4d;
                    }
                    .from-item-inline{
                        flex: 1;
                    }
                }
                .next-btn{
                    width: 640px;
                    height: 70px;
                }
            }
        }
    }
</style>