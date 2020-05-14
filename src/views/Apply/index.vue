<template>
    <div class="apply-page">
        <page-header title="犬证申办"></page-header>
        <div class="apply-main" flex="dir:top cross:center">
            <card-layout>
                <div class="type-content" slot="content">
                    <div class="form-item" flex="dir:left cross:center">
                        <div class="from-item-label">养犬类型：</div>
                        <div class="from-item-inline">
                            <my-radio-group :initValue="yqType" :radioGroup="typeArray" @getRealValue="(name)=>{getRealValue('yqType', name)}"></my-radio-group>
                        </div>
                    </div>
                    <div class="form-item" flex="dir:left cross:center">
                        <div class="from-item-label">办证类型：</div>
                        <div class="from-item-inline">
                            <my-radio-group :initValue="bzType" :radioGroup="methodArray" @getRealValue="(name)=>{getRealValue('bzType', name)}"></my-radio-group>
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
    const typeArray = [{labelName: '个人',value:'1'},{labelName: '单位',value:'2'}];
    const methodArray = [{labelName: '新办',value:'1'},{labelName: '续办',value:'2'}];
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
        data(){
            return {
                typeArray,
                methodArray,
                yqType: '1',
                bzType: '1'
            }
        },
        mounted(){

        },
        methods: {
            getRealValue(attrName, value){
                this[attrName] = value;
            },
            nextPage(){
                console.log(this.yqType, this.bzType);
                //代表个人的新办
                if(this.bzType==='1'&&this.yqType==='1'){
                    this.$router.push('/newApply/stepOneForPerson');
                }
                //代表单位的新办
                else if(this.bzType==='1'&&this.yqType==='2'){
                    this.$router.push('/newApply/stepOneForCompany');
                }
                //代表个人或者单位的续办
                else if(this.bzType==='2'){
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
        .apply-main{
            width: 100%;
            padding-top: 108px;
            height: 100%;
            .apply-main_type{
                width: 702px;
                height: 430px;
                position: relative;
                .top-bg{
                    width:606px;
                    height:0;
                    border-bottom: 100px solid #5e8ff3;
                    border-right: 37px solid transparent;
                    border-left:37px solid transparent
                }
                .top-text-bg{
                    position: absolute;
                    top: -4px;
                    z-index: 2;
                    height: 85px;
                    width: 460px;
                    background-color: #3873eb;
                    border-bottom-left-radius: 43px;
                    border-bottom-right-radius: 43px;
                    transform: perspective(200px) rotateX(-40deg) rotateY(0deg) translateZ(0);
                    text-align: center;
                }
                .type-body{
                    position: absolute;
                    top: 36px;
                    z-index:1;
                    width: 702px;
                    height: 380px;
                    background-color: #ffffff;
                    box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
                    border-radius: 10px;
                    padding: 90px 30px 30px 30px;
                }
                .top-title{
                    position: absolute;
                    top: 0px;
                    z-index: 4;
                    height: 66px;
                    span{
                        font-family: PingFang-SC-Medium;
                        font-size: 30px;
                        letter-spacing: 0px;
                        color: #ffffff;
                    }
                }
                .type-content{
                    .form-item{
                        margin-bottom: 50px;
                        .from-item-label{
                            width: 200px;
                            font-family: PingFang-SC-Medium;
                            font-size: 32px;
                            letter-spacing: 0px;
                            color: #4d4d4d;
                        }
                        .from-item-inline{
                            flex: 1;
                            .marginR{
                                margin-right: 100px;
                            }
                            .icon_radio{
                                font-size: 36px;
                                color: #999999;
                                &.checked{
                                    color: #306ce7;
                                }
                            }
                        }
                    }
                    .next-btn{
                        width: 640px;
                        height: 70px;
                    }
                }
            }
        }
    }
</style>
<style>
    .van-radio__label{
        font-family: PingFang-SC-Medium;
        font-size: 30px;
        color: #4d4d4d;
    }
    /*.van-radio__icon{*/
        /*height: 30px;*/
    /*}*/
    /*.van-radio__icon .van-icon{*/
        /*width: 30px;*/
        /*height: 30px;*/
    /*}*/
</style>