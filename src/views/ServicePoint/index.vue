<template>
    <div class="service-point-page">
        <page-header title="服务点"></page-header>
        <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    export default {
        name: 'servicePoint',
        components:{
            PageHeader
        },
        data(){
            return {
                show: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .service-point-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding: 88px 24px 0px 24px;
    }
</style>