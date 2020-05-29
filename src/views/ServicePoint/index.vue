<template>
    <div class="service-point-page">
        <page-header title="服务点"></page-header>
        <div class="map-panel">
            <baidu-map class="bm-view" ak="fyqKIIAp1Vg3BN5KGd4ZBbhpUeuYhZW7" :center="center" :zoom="zoom" @ready="mapReadyHandler">
                <bm-marker :position="{lng: firstPlace.originLon, lat: firstPlace.originLat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label :content="firstPlace.servicePointName"
                              :labelStyle="{color: '#ffffff', fontSize : '14px',borderColor:'#306ce7',backgroundColor:'#306ce7',borderRadius:'5px',padding: '0px 10px' }"
                              :offset="{width: -30, height: 30}"/>
                </bm-marker>
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
                <div class="header-text">已显示{{totalSize}}个结果</div>
            </div>
            <div class="hidden-place-body">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div class="place-item" v-for="item in placeList" :key="item.id">
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
                loading: false,
                finished: false,
                startY: 0,
                clientHeight: 0
            }
        },
        computed:{
            // firstPlace: function(){
            //     const initData = {
            //         id: 0,
            //         servicePointName: '',
            //         distance: 0,
            //         address: '',
            //         serviceTime: ''
            //     }
            //     return this.placeList[0]? this.placeList[0] : initData;
            // },
            totalSize: function(){
                return this.placeList.length;
            }
        },
        mounted(){
            this.firstPlace = this.$store.getters['service/pointInfo'];
            this.clientHeight = `${document.documentElement.clientHeight}`;
            //this.getPlaceListData();
            //this.onLoad();
        },
        methods:{
            mapReadyHandler({BMap, map}) {
                console.log(BMap, map)

                this.center.lng = this.firstPlace.originLon;
                this.center.lat = this.firstPlace.originLat;
                this.zoom = 15
            },
            onLoad() {
                console.log('777777777777777777777777');
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        let initData = {
                            id: this.placeList.length+1,
                            servicePointName: '八公宠物园' + (this.placeList.length+1) ,
                            distance: 0,
                            address: '',
                            serviceTime: ''
                        }
                        this.placeList.push(initData);
                    }

                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.placeList.length >= 40) {
                        this.finished = true;
                    }
                }, 1000);
            },
            getPlaceListData(){
                let temp1 = {
                    id: 1,
                    servicePointName: '八公宠物医院1',
                    distance: 124950,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp2 = {
                    id: 2,
                    servicePointName: '八公宠物医院2',
                    distance: 24950,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp3 = {
                    id: 3,
                    servicePointName: '八公宠物医院3',
                    distance: 20950,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp4 = {
                    id: 4,
                    servicePointName: '八公宠物医院4',
                    distance: 10495,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp5 = {
                    id: 5,
                    servicePointName: '八公宠物医院5',
                    distance: 11049,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp6 = {
                    id: 6,
                    servicePointName: '八公宠物医院6',
                    distance: 11049,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp7 = {
                    id: 7,
                    servicePointName: '八公宠物医院7',
                    distance: 11049,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp8 = {
                    id: 8,
                    servicePointName: '八公宠物医院8',
                    distance: 11049,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp9 = {
                    id: 9,
                    servicePointName: '八公宠物医院9',
                    distance: 11049,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                let temp10 = {
                    id: 10,
                    servicePointName: '八公宠物医院10',
                    distance: 11049,
                    address: '绍兴市越城区xx路xx号',
                    serviceTime: '周一至周五   8:30-11:00 ；13:30-17:00 '
                }
                this.placeList.push(temp1);
                this.placeList.push(temp2);
                this.placeList.push(temp3);
                this.placeList.push(temp4);
                this.placeList.push(temp5);
                this.placeList.push(temp6);
                this.placeList.push(temp7);
                this.placeList.push(temp8);
                this.placeList.push(temp9);
                this.placeList.push(temp10);
                this.loading = true;
            },
            touchStart(e){
                console.log('touchStart', e);
                let touch = e.touches[0]; //获取第一个触点
                this.startY = Number(touch.pageY);
            },
            touchMove(e){
                // console.log('touchMove', e);
                // let touch = e.touches[0]; //获取第一个触点
                // let y = Number(touch.pageY);
                // let panelHeight = this.$refs.hiddenPanel.offsetHeight;
                // if(this.startY - y >1){
                //     if(panelHeight<585){
                //         this.$refs.hiddenPanel.style.transition = 'unset';
                //         this.$refs.hiddenPanel.style.height = (this.clientHeight - y) + 'px';
                //     }
                // }
                // if(y - this.startY >1){
                //     if(panelHeight>50){
                //         this.$refs.hiddenPanel.style.transition = 'unset';
                //         this.$refs.hiddenPanel.style.height = (this.clientHeight - y) + 'px';
                //     }
                // }
            },
            touchEnd(e){
                console.log('touchEnd', e);
                let touch = e.changedTouches[0]; //获取最后一个触点
                let y = Number(touch.pageY);
                console.log(this.startY - y);
                let panelHeight = this.$refs.hiddenPanel.offsetHeight;
                if(this.startY - y >0){
                    // this.$refs.hiddenPanel.style.transition = 'height 0.4s';
                    // this.$refs.hiddenPanel.style.height = 585 + 'px';
                    this.showAll = true;
                }
                else if(y - this.startY >0){
                    // this.$refs.hiddenPanel.style.transition = 'height 0.4s';
                    // this.$refs.hiddenPanel.style.height = 50 + 'px';
                    this.showAll = false;
                }
                else{
                    if(panelHeight<100){
                        // this.$refs.hiddenPanel.style.transition = 'height 0.6s';
                        // this.$refs.hiddenPanel.style.height = 585 + 'px';
                        this.showAll = true;
                    }
                    else{
                        // this.$refs.hiddenPanel.style.transition = 'height 0.6s';
                        // this.$refs.hiddenPanel.style.height = 50 + 'px';
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
                    line-height: 50px;
                    letter-spacing: 0px;
                    font-weight: 600;
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
                            font-weight: 600;
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