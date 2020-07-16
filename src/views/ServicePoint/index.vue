<template>
    <div class="service-point-page">
        <page-header title="服务点"></page-header>
        <div class="map-panel">
            <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="mapReadyHandler" ak="fyqKIIAp1Vg3BN5KGd4ZBbhpUeuYhZW7">
                <bm-marker :key="-1"
                           :position="{lng: pinLon, lat: pinLat}"
                           :icon="{url: require('@/assets/images/pin.png'), size: {width: 30, height: 30}}">
                </bm-marker>
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
        <div class="fixed-panel">
            <div class="pin-center-btn" @click="setCenter"></div>
            <div class="show-place">
                <div class="show-place-header" flex="dir:left cross:center main:justify">
                    <span class="show-place-name">{{firstPlace.servicePointName}}</span>
                    <span class="show-place-point"><span class="icon iconfont point">&#xe63e;</span>{{(firstPlace.distance/1000).toFixed(2)}}km</span>
                </div>
                <div class="text-panel"><span>地址：</span><span>{{firstPlace.address}}</span></div>
                <div class="text-panel"><span>电话：</span><span @click.stop="phoneToService(firstPlace.servicePhone)">{{firstPlace.servicePhone}}</span></div>
                <div class="text-panel"><span>服务时间：</span><span>{{firstPlace.serviceTime}}</span></div>
            </div>
        </div>
        <div class="hidden-place" ref="hiddenPanel" :class="{h1170:showAll}">
            <div class="hidden-place-header" flex="dir:top cross:center main:center"
                 @touchstart.stop.prevent="touchStart"
                 @touchend.stop.prevent="touchEnd">
                <div class="line"></div>
                <div class="header-text">已显示{{totalShowSize}}个结果</div>
            </div>
            <div class="hidden-place-body">
                <service-point-list :needMakePoint="true" :pageSize="10" @getServiceMapData="getServiceMapData" @itemClickHandle="toPoint"></service-point-list>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
    import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
    import BmLabel from 'vue-baidu-map/components/overlays/Label.vue'
    import ServicePointList from './components/servicePointList.vue';
    import externalMethods from '@/utils/externalMethods/index.js'
    export default {
        name: 'service',
        components:{
            PageHeader,
            BaiduMap,
            BmMarker,
            BmLabel,
            ServicePointList
        },
        data(){
            return {
                //地图使用参数
                BMap: null,
                map: null,
                center: {},  //{lng: 120.59, lat: 29.98}
                zoom: 3,
                showAll: false,
                firstPlace: {
                    id: ''
                },
                //当前的位置
                pinLon: '',
                pinLat: '',
                mapMaskerList: [],
                totalShowSize: 0,
                startY: 0
            }
        },
        mounted(){
            this.pinLon = this.$store.getters['curOriginLon'];
            this.pinLat = this.$store.getters['curOriginLat'];
            this.firstPlace = this.$store.getters['service/pointInfo'];
        },
        watch:{
            'firstPlace.id': function(){
                let tempArr = JSON.parse(JSON.stringify(this.mapMaskerList));
                this.mapMaskerList = tempArr.reduce((acc,item) => {
                    if(item.id !== this.firstPlace.id){
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
                //console.log('mapMaskerList', this.mapMaskerList);
            }
        },
        methods:{
            //地图ready之后操作
            mapReadyHandler({BMap, map}) {
                //console.log(BMap, map);
                console.log('ready map')
                this.BMap = BMap;
                this.map = map;
                // this.center.lng = this.firstPlace.originLon || this.$store.getters['originLon'];
                let lng = this.firstPlace.originLon || this.$store.getters['originLon'];
                // this.center.lat = this.firstPlace.originLat || this.$store.getters['originLat'];
                let lat = this.firstPlace.originLat || this.$store.getters['originLat'];
                this.center = {lng: lng, lat: lat};
                // let point = new BMap.Point(lng, lat);
                // map.centerAndZoom(point, 15);
                this.zoom = 15;
                //console.log('this.center',this.center.lng,  this.center.lat);
            },
            touchStart(e){
                //console.log('touchStart', e);
                let touch = e.touches[0]; //获取第一个触点
                this.startY = Number(touch.pageY);
            },
            touchEnd(e){
                let touch = e.changedTouches[0]; //获取最后一个触点
                let y = Number(touch.pageY);
                if(this.startY - y >0){
                    this.showAll = true;
                }
                else if(y - this.startY >0){
                    this.showAll = false;
                }
                else{
                    this.showAll = !this.showAll;
                }
            },
            //得到所有地图点位
            getServiceMapData(data){
                this.mapMaskerList = data.mapMaskerList;
                this.totalShowSize = data.totalShowSize;
                if(this.firstPlace.id===''){
                    this.firstPlace = data.firstPlace;
                    this.center.lng = this.firstPlace.originLon;
                    this.center.lat = this.firstPlace.originLat;
                    // let BMap = this.BMap;
                    // let map = this.map;
                    // let point = new BMap.Point(this.center.lng, this.center.lat);
                    // map.centerAndZoom(point, 15);
                }
            },
            //跳转到点击的点位
            toPoint(data){
                this.firstPlace = data;
                this.center.lng = this.firstPlace.originLon;
                this.center.lat = this.firstPlace.originLat;
                this.showAll = false;
                // let BMap = this.BMap;
                // let map = this.map;
                // let point = new BMap.Point(this.center.lng, this.center.lat);
                // map.centerAndZoom(point, 15);
            },
            //设置当前位置为中心位置
            setCenter(){
                this.center.lng = this.pinLon;
                this.center.lat = this.pinLat;
                // let BMap = this.BMap;
                // let map = this.map;
                // let point = new BMap.Point(this.center.lng, this.center.lat);
                // map.centerAndZoom(point, 15);
            },
            //打电话至服务点
            phoneToService(servicePhone){
                //服务中心电话
                externalMethods.telephone(servicePhone).then(()=>{})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .service-point-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        .map-panel{
            width: 100%;
            flex: auto;
            height: calc(100% - 88px);
            .bm-view{
                width: 100%;
                height: 100%;
            }
        }
        .fixed-panel{
            position: fixed;
            bottom: 138px;
            left: 24px;
            right: 24px;
            z-index: 2;
            .pin-center-btn{
                width: 80px;
                height: 80px;
                @include bg-image("~assets/images/center");
                background-size: 100% 100%;
                margin-bottom: 10px;
            }
            .show-place{
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
            transition: height 0.3s;
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