<template>
    <div class="step-page">
        <page-header title="犬证新办"></page-header>
        <apply-step :activeStep="0"></apply-step>
        <div class="page-body">
            <transition>
                <router-view/>
            </transition>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue'
    import ApplyStep from './components/newApplyStep.vue'
    export default {
        name: 'applyStepForPerson',
        components: {
            PageHeader,
            ApplyStep
        },
        data(){
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
.step-page{
    width: 100%;
    height: 100%;
    padding-top: 88px;
    .page-body{
        width: 100%;
        height: calc(100% - 248px);
    }
}
</style>