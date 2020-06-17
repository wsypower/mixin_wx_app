<template>
    <div class="dog-knowledge-page">
        <page-header title="养犬知识"></page-header>
        <page-list :type="1" class="main"></page-list>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import PageList from '@/components/pageList.vue';
    export default {
        name: 'index',
        components:{
            PageHeader,
            PageList
        },
        data(){
            return {}
        },
        mounted(){},
        methods:{}
    }
</script>
<style lang="scss" scoped>
    .dog-knowledge-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        .main{
            flex: auto;
            overflow-y: auto;
        }
    }
</style>