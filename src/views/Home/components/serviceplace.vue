<template>
    <div class="service-place">
        <div class="service-place-header" flex="dir:left cross:center main:justify">
            <span class="header-left">推荐服务点</span>
            <!--<span class="header-right" @click="gotoMorePointPage">更多<span class="icon iconfont icon-youjiantou"></span></span>-->
        </div>
        <div class="service-place-body">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <div class="place-item" v-for="item in placeList" :key="item.id" @click="gotoPointDetail(item)">
                    <div class="first" flex="dir:left cross:center main:justify">
                        <span class="place-item-name">{{item.servicePointName}}</span>
                        <span class="place-item-point"><span class="icon iconfont icon-dingwei point"></span>{{(item.distance/1000).toFixed(2)}}km</span>
                    </div>
                    <div class="text-panel"><span>地址：</span><span>{{item.address}}</span></div>
                    <div class="text-panel"><span>服务时间：</span><span>{{item.serviceTime}}</span></div>
                </div>
            </van-list>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { List, Toast } from 'vant'
    import { queryDogServicePoint } from '@/api/home.js'
    export default {
        name: 'servicePlace',
        components: {
            [List.name]: List
        },
        data(){
            return {
                placeList: [],
                loading: false,
                finished: false,
                pageSize: 5,
                currentPage: 0,
                totalSize: 0,
            }
        },
        computed:{
            userId: function(){
                return this.$store.getters['userId'];
            },
            originLon: function(){
                return this.$store.getters['originLon'];
            },
            originLat: function(){
                return this.$store.getters['originLat'];
            },
            areaCode: function(){
                return this.$store.getters['areaCode'];
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
            onLoad() {
                console.log('home get service');
                if(this.userId === 'xxx'){
                    // 加载状态结束
                    this.loading = false;
                    return
                }
                //获取范围内的服务点
                let params = {
                    userId: this.userId,
                    originLon: this.originLon,
                    originLat: this.originLat,
                    areaCode: this.areaCode,
                    currentPage: ++this.currentPage,
                    pageSize: this.pageSize
                }
                queryDogServicePoint(params).then( res => {
                    console.log('queryDogServicePoint',res.data);
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
                });
            },
            gotoPointDetail(place){
                //Toast('还没开发');
                let pointInfo = {
                    id: place.id,
                    servicePointName: place.servicePointName,
                    distance: place.distance,
                    address: place.address,
                    serviceTime: place.serviceTime,
                    originLon: place.originLon,
                    originLat: place.originLat,
                }
                this.$store.commit('service/updatePointInfo',pointInfo);
                this.$router.push('/service');
            }
        }
    }
</script>
<style lang="scss" scoped>
.service-place{
    width: 100%;
    height: calc(100% - 620px);
    .service-place-header{
        height: 90px;
        .header-left{
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            line-height: 40px;
            letter-spacing: 0px;
            color: #4d4d4d;
            border-left: 6px solid #306ce7;
            padding-left: 10px;
        }
        .header-right{
            font-family: PingFang-SC-Medium;
            font-size: 26px;
            //line-height: 56px;
            letter-spacing: 0px;
            color: #666666;
            .icon-youjiantou{
                margin-left: 6px;
                font-size: 26px;
                color: #999999;
            }
        }
    }
    .service-place-body{
        width: 100%;
        min-height: calc(100% - 90px);
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
    }
}
</style>