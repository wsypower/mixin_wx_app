<template>
    <div class="step-page">
        <page-header title="犬证新办"></page-header>
        <apply-step-header :activeStep="activeStep"></apply-step-header>
        <div class="page-body">
            <my-scroll ref="myScroll">
                <transition :name="transitionName">
                    <router-view/>
                </transition>
            </my-scroll>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import defaultSetting from "@/settings";
    import PageHeader from '@/components/pageHeader.vue'
    import ApplyStepHeader from './components/applyStepHeader.vue'
    import { Toast } from 'vant';
    import { queryPidDogCard } from '@/api/process.js'
    const routerArr = ['/newApply/stepOne','/newApply/stepTwo','/newApply/stepThree','/newApply/stepFour'];
    export default {
        name: 'newApply',
        components: {
            PageHeader,
            ApplyStepHeader
        },
        data(){
            return {
                preStep: 0,
            }
        },
        mounted(){
            this.preStep = this.$route.meta.index;
        },
        beforeRouteEnter(to,from,next){
            console.log('beforeRouteEnter', to, from);
            next(vm => {
                if(to.query.currentStep){
                    vm.preStep = to.query.currentStep-1;
                    let isUser = to.query.userType;
                    let _link = '';
                    if(vm.preStep===0){
                        if(isUser==='0'){
                            _link = routerArr[0]+ 'ForPerson'
                        }
                        else{
                            _link = routerArr[0]+ 'ForCompany'
                        }
                    }
                    else{
                        _link = routerArr[vm.preStep];
                    }
                    vm.$router.replace({
                        path: _link
                    });
                    let params = {
                        userId : vm.$store.getters['userId'],
                        orderId: to.query.orderId
                    }
                    vm.$store.commit('updateIsLoading', true);
                    queryPidDogCard(params).then( res => {
                        vm.$store.commit('updateIsLoading', false);
                        if(res.errno===0){
                            console.log('zt');
                            vm.$store.commit('order/updateOrderInfo', res.data);
                        }
                        else{
                            Toast('数据获取失败');
                        }
                    });
                }
            })

        },
        watch:{
            activeStep: function(){
                this.$refs.myScroll.scrollTo({y:0},0);
            }
        },
        computed: {
            activeStep(){
                return this.$route.meta.index;
            },
            direction() {
                let flag = this.activeStep > this.preStep ? 'forward': 'back';
                this.preStep = this.activeStep;
                return flag
            },
            transitionName() {
                return defaultSetting.needPageTrans ? this.direction : "";
            }

        }
    }
</script>
<style lang="scss" scoped>
.step-page{
    width: 100%;
    height: 100%;
    padding-top: 88px;
    background-color: #f5f5f5;
    .page-body{
        width: 100%;
        height: calc(100% - 160px);
        overflow: hidden;
    }
}
</style>