<template>
    <div class="service-point-page">
        <page-header title="服务点"></page-header>
        <div class="map-panel"></div>
        <div class="show-place">
            <div class="show-place-header" flex="dir:left cross:center main:justify">
                <span class="show-place-name">{{firstPlace.servicePointName}}</span>
                <span class="show-place-point"><span class="icon iconfont point">&#xe63e;</span>{{(firstPlace.distance/1000).toFixed(2)}}km</span>
            </div>
            <div class="text-panel"><span>地址：</span><span>{{firstPlace.address}}</span></div>
            <div class="text-panel"><span>服务时间：</span><span>{{firstPlace.serviceTime}}</span></div>
        </div>
        <div class="hidden-place" :class="{h1170: showAll}" ref="hiddenPanel">
            <div class="hidden-place-header" flex="dir:top cross:center main:center"
                 @touchstart.stop.prevent="touchStart"
                 @touchmove.stop.prevent="touchMove"
                 @touchend.stop.prevent="touchEnd">
                <div class="line"></div>
                <div class="header-text">已显示20个结果</div>
            </div>
            <div class="hidden-place-body">
                <div class="place-item" v-for="item in placeList" :key="item.id">
                    <div class="first" flex="dir:left cross:center main:justify">
                        <span class="place-item-name">{{item.servicePointName}}</span>
                        <span class="place-item-point"><span class="icon iconfont point">&#xe63e;</span>{{(item.distance/1000).toFixed(2)}}km</span>
                    </div>
                    <div class="text-panel"><span>地址：</span><span>{{item.address}}</span></div>
                    <div class="text-panel"><span>服务时间：</span><span>{{item.serviceTime}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Popup } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    export default {
        name: 'servicePoint',
        components:{
            [Popup.name]: Popup,
            PageHeader
        },
        data(){
            return {
                showAll: false,
                placeList: [],
                startY: 0,
                screenY: 667
            }
        },
        computed:{
            firstPlace: function(){
                const initData = {
                    id: 0,
                    servicePointName: '',
                    distance: 0,
                    address: '',
                    serviceTime: ''
                }
                return this.placeList[0]? this.placeList[0] : initData;
            }
        },
        mounted(){
            this.getPlaceListData();
        },
        methods:{
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
                this.placeList.push(temp1);
                this.placeList.push(temp2);
                this.placeList.push(temp3);
                this.placeList.push(temp4);
                this.placeList.push(temp5);
            },
            // showAllPlace(){
            //     this.showAll = !this.showAll;
            // },
            touchStart(e){
                console.log('touchStart', e);
                let touch = e.touches[0]; //获取第一个触点
                this.startY = Number(touch.pageY);
            },
            touchMove(e){
                console.log('touchMove', e);
                let touch = e.touches[0]; //获取第一个触点
                let y = Number(touch.pageY);
                let panelHeight = this.$refs.hiddenPanel.offsetHeight;
                if(this.startY - y >10){
                    if(panelHeight<585){
                        this.$refs.hiddenPanel.style.transition = 'unset';
                        this.$refs.hiddenPanel.style.height = (667 - y) + 'px';
                    }
                }
                if(y - this.startY >10){
                    if(panelHeight>50){
                        this.$refs.hiddenPanel.style.transition = 'unset';
                        this.$refs.hiddenPanel.style.height = (667 - y) + 'px';
                    }
                }
            },
            touchEnd(e){
                console.log('touchEnd', e);
                let touch = e.changedTouches[0]; //获取最后一个触点
                let y = Number(touch.pageY);
                console.log(this.startY - y);
                let panelHeight = this.$refs.hiddenPanel.offsetHeight;
                if(panelHeight<200 && this.startY - y >=0){
                    this.$refs.hiddenPanel.style.height = 585 + 'px';
                }
                if(panelHeight>200 && y - this.startY >=0){
                    this.$refs.hiddenPanel.style.height = 50 + 'px';
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
            /*height: 1170px;*/
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
                padding: 0px 24px;
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