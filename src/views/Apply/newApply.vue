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
    // import { createNamespacedHelpers } from "vuex";
    // const { mapState } = createNamespacedHelpers("pagesAnimation");
    import PageHeader from '@/components/pageHeader.vue'
    import ApplyStepHeader from './components/applyStepHeader.vue'
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