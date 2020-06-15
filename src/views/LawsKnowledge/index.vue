<template>
    <div class="laws-page">
        <page-header title="制度法规"></page-header>
        <page-list :interfaceUrl="interfaceUrl" @itemClickHandle="geToArticleDetail"></page-list>
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
            return {
                interfaceUrl: null
            }
        },
        mounted(){

        },
        methods:{
            geToArticleDetail(data){
                this.$router.push('/laws/' + data.id + '/detail');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .laws-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding-top: 88px;

    }
</style>