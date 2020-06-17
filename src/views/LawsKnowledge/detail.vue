<template>
    <div class="knowledge-detail-page">
        <page-header title="制度法规"></page-header>
        <div class="page-top">
            <div class="title">{{articleInfo.title}}</div>
            <div flex="dir:left main:justify">
                <span>{{articleInfo.documentNumber}}</span>
                <span>{{articleInfo.publishTime|timeFormatter('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <div v-html="articleInfo.content" class="content"></div>
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
                articleInfo:{
                    title: '',
                    documentNumber: '',
                    publishTime: 0,
                    content: ''
                }
            }
        },
        mounted(){
            let info = this.$store.getters['article/articleInfo'];
            Object.keys(this.articleInfo).forEach(key => {
                this.articleInfo[key] = info[key];
            });
        }
    }
</script>
<style lang="scss" scoped>
    .knowledge-detail-page{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        .page-top{
            height: 156px;
            width: 100%;
            border-bottom: 2px solid #e6e6e6;
            padding: 0px 32px 0px 32px;
            flex: none;
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
        .content{
            padding: 25px;
            flex: auto;
            overflow-y: auto;
        }
    }
</style>