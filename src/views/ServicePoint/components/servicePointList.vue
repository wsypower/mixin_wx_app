<template>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
        <div class="place-item" v-for="item in placeList" :key="item.id" @click="itemClickHandle(item)">
            <div class="first" flex="dir:left cross:center main:justify">
                <span class="place-item-name">{{item.servicePointName}}</span>
                <span class="place-item-point"><span class="icon iconfont point">&#xe63e;</span>{{(item.distance/1000).toFixed(2)}}km</span>
            </div>
            <div class="text-panel"><span>地址：</span><span>{{item.address}}</span></div>
            <div class="text-panel"><span>服务时间：</span><span>{{item.serviceTime}}</span></div>
        </div>
    </van-list>
</template>
<script type="text/ecmascript-6">
    import { List } from 'vant';
    import { queryDogServicePoint } from '@/api/home.js'
    export default {
        name: 'servicePointList',
        components: {
            [List.name]: List,
        },
        props:{
            needMakePoint:{
                type: Boolean,
                default: false,
            },
            pageSize:{
                type: Number,
                default: 10
            }
        },
        data(){
            return {
                placeList: [],
                loading: false,
                finished: false,
                currentPage: 0,
                totalSize: 0,
            }
        },
        computed:{
            totalShowSize: function(){
                return this.placeList.length;
            },
            userId: function(){
                return this.$store.getters['userId'];
            },
        },
        watch:{
            userId: function(newValue){
                if(newValue!=='xxx'){
                    this.onLoad();
                }
            }
        },
        methods:{
            //list加载数据
            onLoad() {
                console.log('777777777777777777777777');
                if(this.userId === 'xxx'){
                    // 加载状态结束
                    this.loading = false;
                    return
                }
                // let Bmap = this.BMap;
                //获取范围内的服务点
                let originLon = this.$store.getters['originLon'];
                let originLat = this.$store.getters['originLat'];
                let areaCode = this.$store.getters['areaCode'];
                let params = {
                    userId :this.userId,
                    originLon,
                    originLat,
                    areaCode,
                    currentPage: ++this.currentPage,
                    pageSize: this.pageSize
                }
                queryDogServicePoint(params).then( res => {
                    this.totalSize = res.data.totalCount;
                    this.placeList = res.data.list.reduce((acc,item) => {
                        let temp = {
                            id: item.id,
                            servicePointName: item.servicePointName,
                            originLat: item.latitude,
                            originLon: item.longitude,
                            distance: item.distance,
                            address: item.address,
                            serviceTime: item.serviceBeginTime + '至' + item.serviceEndTime + ' ' + item.serviceTime
                        }
                        acc.push(temp);
                        return acc
                    },this.placeList);
                    // 加载状态结束
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.placeList.length >= this.totalSize) {
                        this.finished = true;
                    }
                    if(this.needMakePoint){
                        let firstPlace = this.placeList[0];
                        let mapMaskerList = this.placeList.reduce((acc,item) => {
                            if(item.id !== firstPlace.id){
                                item.active = false;
                                item.zIndex = 0;
                            }
                            else{
                                item.active = true;
                                item.zIndex = 10;
                            }
                            acc.push(item);
                            return acc
                        },[]);
                        this.$emit('getServiceMapData', {firstPlace,mapMaskerList,totalShowSize:this.totalShowSize});
                    }
                });
            },
            itemClickHandle(point){
                this.$emit('itemClickHandle', point);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .place-item{
        width: 100%;
        min-height: 190px;
        background-color: #ffffff;
        box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        .first{
            .place-item-name{
                font-family: PingFang-SC-Bold;
                font-size: 28px;
                line-height: 50px;
                letter-spacing: 0px;
                font-weight: bold;
                color: #333333;
            }
            .place-item-point{
                font-family: PingFang-SC-Medium;
                font-size: 28px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #4d4d4d;
                .point{
                    font-size: 30px;
                    color: #306ce7;
                    margin-right: 10px;
                }
            }
        }
        .text-panel{
            &:nth-child(n+1){
                line-height: 45px;
            }
            span:first-child{
                font-family: PingFang-SC-Medium;
                font-size: 26px;
                line-height: 28px;
                letter-spacing: 0px;
                color: #1e1e1e;
            }
            span:last-child{
                font-family: PingFang-SC-Regular;
                font-size: 26px;
                letter-spacing: 0px;
                color: #4d4d4d;
            }
        }
    }
</style>