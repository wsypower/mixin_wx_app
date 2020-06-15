<template>
    <div class="knowledge-detail-page">
        <page-header title="养犬知识"></page-header>
        <div class="page-top">
            <div class="title">2020年绍兴市养犬管理办法</div>
            <div flex="dir:left main:justify">
                <span>绍【2020第一号文】</span>
                <span>2020-06-01</span>
            </div>
        </div>
        <div v-html="articleHtml"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    export default {
        name: 'knowledgeDetail',
        components:{
            PageHeader
        },
        data(){
            return {
                articleHtml: ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .knowledge-detail-page{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        padding-top: 88px;
        .page-top{
            height: 156px;
            width: 100%;
            border-bottom: 2px solid #e6e6e6;
            padding: 0px 32px 0px 32px;
            .title{
                padding: 30px 0px;
                font-family: PingFang-SC-Bold;
                font-size: 36px;
                line-height: 40px;
                color: #333333;
                text-align: center;
                font-weight: bold;
            }
            span{
                font-family: PingFang-SC-Medium;
                font-size: 28px;
                color: #666666;
            }
        }
    }
</style>