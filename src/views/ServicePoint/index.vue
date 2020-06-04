<template>
    <div class="service-point-page">
        <page-header title="服务点"></page-header>
        <div class="map-panel">
            <baidu-map class="bm-view" ak="fyqKIIAp1Vg3BN5KGd4ZBbhpUeuYhZW7" :center="center" :zoom="zoom" @ready="mapReadyHandler">
                <template v-for="place in mapMaskerList">
                    <bm-marker v-if="!place.active"
                               :key="place.id"
                               :position="{lng: place.originLon, lat: place.originLat}"
                               :icon="{url: require('@/assets/images/position@2x.png'), size: {width: 30, height: 30}}" @click="toPoint(place)"
                                ref="bmMarker">
                    </bm-marker>
                    <bm-marker v-else :key="place.id"
                               :position="{lng: firstPlace.originLon, lat: firstPlace.originLat}"
                               :icon="{url: require('@/assets/images/position_active@2x.png'), size: {width: 40, height: 40}}"
                               ref="bmMarker"
                                :zIndex="10">
                        <bm-label :content="firstPlace.servicePointName"
                                  :labelStyle="{color: '#ffffff', fontSize : '14px',borderColor:'#306ce7',backgroundColor:'#306ce7',borderRadius:'5px',padding: '0px 10px' }"
                                  :offset="{width: -22, height: 45}"/>
                    </bm-marker>
                </template>
            </baidu-map>
        </div>
        <div class="show-place">
            <div class="show-place-header" flex="dir:left cross:center main:justify">
                <span class="show-place-name">{{firstPlace.servicePointName}}</span>
                <span class="show-place-point"><span class="icon iconfont point">&#xe63e;</span>{{(firstPlace.distance/1000).toFixed(2)}}km</span>
            </div>
            <div class="text-panel"><span>地址：</span><span>{{firstPlace.address}}</span></div>
            <div class="text-panel"><span>服务时间：</span><span>{{firstPlace.serviceTime}}</span></div>
        </div>
        <div class="hidden-place" ref="hiddenPanel" :class="{h1170:showAll}">
            <div class="hidden-place-header" flex="dir:top cross:center main:center"
                 @touchstart.stop.prevent="touchStart"
                 @touchmove.stop.prevent="touchMove"
                 @touchend.stop.prevent="touchEnd">
                <div class="line"></div>
                <div class="header-text">已显示{{totalShowSize}}个结果</div>
            </div>
            <div class="hidden-place-body">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div class="place-item" v-for="item in placeList" :key="item.id" @click="toPoint(item)">
                            <div class="first" flex="dir:left cross:center main:justify">
                                <span class="place-item-name">{{item.servicePointName}}</span>
                                <span class="place-item-point"><span class="icon iconfont point">&#xe63e;</span>{{(item.distance/1000).toFixed(2)}}km</span>
                            </div>
                            <div class="text-panel"><span>地址：</span><span>{{item.address}}</span></div>
                            <div class="text-panel"><span>服务时间：</span><span>{{item.serviceTime}}</span></div>
                        </div>
                    </van-list>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { List } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
    import bmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
    import bmLabel from 'vue-baidu-map/components/overlays/Label.vue'
    import { queryDogServicePoint } from '@/api/home.js'
    export default {
        name: 'servicePoint',
        components:{
            [List.name]: List,
            PageHeader,
            BaiduMap,
            bmMarker,
            bmLabel
        },
        data(){
            return {
                //地图使用参数
                center: {lng: 0, lat: 0},
                zoom: 3,
                showAll: false,
                firstPlace: {},
                placeList: [],
                mapMaskerList: [],
                loading: false,
                finished: false,
                pageSize: 10,
                currentPage: 0,
                totalSize: 0,
                startY: 0,
                clientHeight: 0
            }
        },
        computed:{
            totalShowSize: function(){
                return this.placeList.length;
            }
        },
        mounted(){
            this.firstPlace = this.$store.getters['service/pointInfo'];
            this.firstPlace.zIndex = 10;
            this.clientHeight = `${document.documentElement.clientHeight}`;
        },
        watch:{
            'firstPlace.id': function(newValue){
                let tempArr = JSON.parse(JSON.stringify(this.mapMaskerList));
                this.mapMaskerList = tempArr.reduce((acc,item) => {
                    if(item.id !== newValue){
                        item.active = false;
                        item.zIndex = 0;
                    }
                    else{
                        item.active = true;
                        item.zIndex = 10;
                    }
                    acc.push(item);
                    return acc
                }, []);
                console.log('mapMaskerList', this.mapMaskerList);
                this.center.lng = this.firstPlace.originLon;
                this.center.lat = this.firstPlace.originLat;
            }
        },
        methods:{
            //地图ready之后操作
            mapReadyHandler({BMap, map}) {
                console.log(BMap, map);
                this.center.lng = this.firstPlace.originLon || this.$store.getters['originLon'];
                this.center.lat = this.firstPlace.originLat || this.$store.getters['originLat'];
                this.zoom = 15;
                console.log('this.center.lng',this.center.lng,  this.center.lat);
            },
            //list加载数据
            onLoad() {
                console.log('777777777777777777777777');
                // let Bmap = this.BMap;
                //获取范围内的服务点
                let originLon = this.$store.getters['originLon'];
                let originLat = this.$store.getters['originLat'];
                let areaCode = this.$store.getters['areaCode'];
                let userId = this.$store.getters['userId'];
                let params = {
                    userId,
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
                    this.mapMaskerList = res.data.list.reduce((acc,item) => {
                        let temp = {
                            id: item.id,
                            servicePointName: item.servicePointName,
                            originLat: item.latitude,
                            originLon: item.longitude,
                            distance: item.distance,
                            address: item.address,
                            serviceTime: item.serviceBeginTime + '至' + item.serviceEndTime + ' ' + item.serviceTime
                        }
                        if(item.id !== this.firstPlace.id){
                            temp.active = false;
                            temp.zIndex = 0;
                        }
                        else{
                            temp.active = true;
                            temp.zIndex = 10;
                        }
                        acc.push(temp);
                        return acc
                    },this.mapMaskerList);
                    if(this.firstPlace.id === ''){
                        this.firstPlace = this.placeList[0];
                        console.log('firstPlace',this.firstPlace);
                    }
                    // 加载状态结束
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.placeList.length >= this.totalSize) {
                        this.finished = true;
                    }
                });
            },
            toPoint(point){
                console.log('to point',this.$refs.bmMarker);
                this.firstPlace = point;
                this.showAll = false;
            },
            touchStart(e){
                console.log('touchStart', e);
                let touch = e.touches[0]; //获取第一个触点
                this.startY = Number(touch.pageY);
            },
            touchEnd(e){
                console.log('touchEnd', e);
                let touch = e.changedTouches[0]; //获取最后一个触点
                let y = Number(touch.pageY);
                console.log(this.startY - y);
                let panelHeight = this.$refs.hiddenPanel.offsetHeight;
                if(this.startY - y >0){
                    this.showAll = true;
                }
                else if(y - this.startY >0){
                    this.showAll = false;
                }
                else{
                    if(panelHeight<100){
                        this.showAll = true;
                    }
                    else{
                        this.showAll = false;
                    }
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .service-point-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding-top: 88px;
        .map-panel{
            width: 100%;
            height: 100%;
            .bm-view{
                width: 100%;
                height: 100%;
            }
        }
        .show-place{
            position: fixed;
            bottom: 138px;
            left: 24px;
            right: 24px;
            z-index: 2;
            min-height: 190px;
            background-color: #ffffff;
            box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
            border-radius: 10px;
            padding: 20px;
            .show-place-header{
                .show-place-name{
                    font-family: PingFang-SC-Bold;
                    font-size: 28px;
                    font-weight: bold;
                    line-height: 50px;
                    letter-spacing: 0px;
                    color: #333333;
                }
                .show-place-point{
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
        .hidden-place{
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            height: 100px;
            z-index: 5;
            background-color: #f0f1f8;
            box-shadow: 0px 10px 18px 2px rgba(0, 0, 0, 0.8);
            border-radius: 20px 20px 0px 0px;
            transition: height 0.5s;
            &.h1170{
                height: 1170px;
            }
            .hidden-place-header{
                width: 100%;
                height: 100px;
                .line{
                    width: 100px;
                    height: 8px;
                    background-color: #306ce7;
                    border-radius: 4px;
                }
                .header-text{
                    margin-top: 24px;
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    line-height: 40px;
                    color: #808080;
                }
            }
            .hidden-place-body{
                width: 100%;
                height: 1070px;
                padding: 0px 24px;
                overflow-y: auto;
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
    }
</style>
<style lang="scss">
    .BMap_Marker{
        img{
            height: 100%;
        }
    }
</style>