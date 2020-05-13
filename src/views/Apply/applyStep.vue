<template>
    <div class="step-page">
        <page-header title="犬证新办"></page-header>
        <apply-step-header :activeStep=activeStep></apply-step-header>
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
    import { createNamespacedHelpers } from "vuex";
    const { mapState } = createNamespacedHelpers("pagesAnimation");
    import PageHeader from '@/components/pageHeader.vue'
    import ApplyStepHeader from './components/applyStepHeader.vue'
    export default {
        name: 'applyStep',
        components: {
            PageHeader,
            ApplyStepHeader
        },
        data(){
            return {
                activeStep: 0
            }
        },
        watch:{
            '$route': function(newValue){
                console.log(`route:`,newValue);
                this.activeStep = newValue.meta.index;
                this.$refs.myScroll.scrollTo({y:0},0);
            }
        },
        computed: {
            ...mapState({
                direction: state => state.direction
            }),
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