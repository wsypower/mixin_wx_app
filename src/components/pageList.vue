<template>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list-panel"
    >
        <div class="article-item" flex="dir:left cross:center main:justify" v-for="item in dataList" :key="item.id" @click="itemClickHandle(item)">
            <div class="top-flag" v-if="item.stick===1">
                <span class="icon iconfont icon-zhiding"></span><span>置顶</span>
            </div>
            <div class="message" flex="dir:top main:justify">
                <div class="title">{{item.title}}</div>
                <div class="sub-title" v-if="item.documentNumber">{{item.documentNumber}}</div>
                <div class="time">{{item.publishTime|timeFormatter('YYYY-MM-DD')}}</div>
            </div>
            <div class="img-panel" flex="cross:center main:center">
                <img :src="item.picPath" @error="imgError()"/>
            </div>
        </div>
    </van-list>
</template>
<script type="text/ecmascript-6">
    import { List } from 'vant';
    import { queryArticle } from '@/api/article.js'
    export default {
        name: 'pageList',
        components:{
            [List.name]: List
        },
        props:{
            type:{
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                dataList: [],
                loading: false,
                finished: false,
                totalSize: 0,
                defaultImg: require('@/assets/images/default@3x.png'),
                params:{
                    userId: '',
                    type: 0,  //0 制度法规 1犬类知识库
                    areaCode: '',
                    currentPage: 0,
                    pageSize: 10
                }
            }
        },
        computed:{
            userId: function(){
                return this.$store.getters['userId'];
            },
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.params.areaCode = this.$store.getters['areaCode'];
            this.params.type = this.type;
        },
        methods:{
            imgError(){
                let img = event.srcElement;
                img.src = this.defaultImg;
                img.onerror = null; //防止闪图
            },
            //list加载数据
            onLoad() {
                console.log('0009998887777666');
                this.params.currentPage = this.params.currentPage + 1;
                queryArticle(this.params).then( res => {
                    this.totalSize = res.data.count;
                    this.dataList = res.data.queryList.reduce((acc, item) => {
                        acc.push(item);
                        return acc
                    },this.dataList);
                    // 加载状态结束
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.dataList.length >= this.totalSize) {
                        this.finished = true;
                    }
                });
            },
            itemClickHandle(item){
                this.$store.commit('article/updateArticleInfo',item);
                if(this.type===0){
                    this.$router.push('/lawsKnowledge/detail');
                }
                else{
                    this.$router.push('/dogKnowledge/detail');
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .list-panel{
        padding: 20px 24px;
        .article-item{
            width: 100%;
            height: 190px;
            background-color: #ffffff;
            box-shadow: 0px 3px 7px 0px rgba(127, 127, 127, 0.35);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            .top-flag{
                position: absolute;
                top: 0px;
                left: 0px;
                z-index: 1;
                width: 90px;
                height: 34px;
                line-height: 34px;
                background-color: #e00808;
                border-radius: 10px 0px 0px 0px;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #ffffff;
                text-align: center;
                .icon-zhiding{
                    font-size: 14px;
                    width: 20px;
                }
            }
            &:last-child{
                margin-bottom: 0px;
            }
            .message{
                height: 100%;
                padding: 14px 0px;
                .title{
                    width: 418px;
                    font-family: PingFang-SC-Bold;
                    font-size: 28px;
                    color: #333333;
                    font-weight: bold;
                }
                .sub-title{
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    color: #4d4d4d;
                }
                .time{
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    color: #4d4d4d;
                }
            }
            .img-panel{
                width: 200px;
                height: 150px;
                background-color: #666666;
                border-radius: 10px;
                overflow: hidden;
                @include bg-image("~assets/images/default");
                background-size: 100% 100%;
                img{
                    height: 100%;
                }
            }
        }
    }
</style>