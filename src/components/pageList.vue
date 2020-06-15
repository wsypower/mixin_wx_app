<template>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list-panel"
    >
        <div class="article-item" flex="dir:left cross:center main:justify" v-for="item in dataList" :key="item.id" @click="itemClickHandle(item)">
            <div class="message" flex="dir:top main:justify">
                <div class="title">{{item.title}}</div>
                <div class="time">{{item.time}}</div>
            </div>
            <div class="img-panel" flex="cross:center main:center">
                <img :src="item.imageUrl" />
            </div>
        </div>
    </van-list>
</template>
<script type="text/ecmascript-6">
    import { List } from 'vant';
    export default {
        name: 'pageList',
        components:{
            [List.name]: List,
        },
        props:{
            interfaceUrl:{
                type: Object,
                default: null
            }
        },
        data(){
            return {
                dataList: [],
                loading: false,
                finished: false,
                currentPage: 0,
                pageSize: 10
            }
        },
        computed:{
            userId: function(){
                return this.$store.getters['userId'];
            },
        },
        mounted(){

        },
        methods:{
            //list加载数据
            onLoad() {
                console.log('0009998887777666');
                let params = {
                    userId :this.userId,
                    currentPage: ++this.currentPage,
                    pageSize: this.pageSize
                }

                let temp1 = {
                    id: 'x1',
                    title: '养狗，你需要掌握这几类药，对狗狗有益处',
                    time: '2020-06-01',
                    imageUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20190325/2d99032a5d5f48688a5d823eb4fb75d3.jpeg'
                }
                let temp2 = {
                    id: 'x2',
                    title: '狗狗有这五个喂养条件，表明已具有长寿“特质”',
                    time: '2020-06-01',
                    imageUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20190325/393c01106c86447b851f27e8301b8167.jpeg'
                }
                let temp3 = {
                    id: 'x3',
                    title: '狗狗预苗为何要打三针？',
                    time: '2020-06-01',
                    imageUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20190325/eae5e722fd484b53bc12d6218fbc940c.jpeg'
                }
                this.dataList.push(temp1);
                this.dataList.push(temp2);
                this.dataList.push(temp3);
                this.interfaceUrl(params).then( res => {
                    console.log('interfaceUrl', res);
                });
                // queryDogServicePoint(params).then( res => {
                //     this.totalSize = res.data.totalCount;
                //     this.placeList = res.data.list.reduce((acc,item) => {
                //         let temp = {
                //             id: item.id,
                //             servicePointName: item.servicePointName,
                //             originLat: item.latitude,
                //             originLon: item.longitude,
                //             distance: item.distance,
                //             address: item.address,
                //             serviceTime: item.serviceBeginTime + '至' + item.serviceEndTime + ' ' + item.serviceTime
                //         }
                //         acc.push(temp);
                //         return acc
                //     },this.placeList);
                //     // 加载状态结束
                    this.loading = false;
                //     // 数据全部加载完成
                //     if (this.placeList.length >= this.totalSize) {
                        this.finished = true;
                //     }
                // });
            },
            itemClickHandle(item){
                this.$emit('itemClickHandle', item);
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
                img{
                    width: 100%;
                }
            }
        }
    }
</style>