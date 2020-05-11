<template>
    <div class="step-page">
        <page-header title="犬证新办"></page-header>
        <div class="page-body">
            <apply-step :activeStep="0"></apply-step>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue'
    import ApplyStep from './components/newApplyStep.vue'
    export default {
        name: 'stepOneForPerson',
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
    .page-body{
        width: 100%;
        height: 100%;
        padding-top: 88px;
    }
}
</style>