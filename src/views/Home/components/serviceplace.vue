<template>
    <div class="service-place">
        <div class="service-place-header" flex="dir:left cross:center main:justify">
            <span class="header-left">推荐服务点</span>
            <span class="header-right" @click="gotoMorePointPage">更多<span class="icon iconfont">&#xe60f;</span><span class="icon iconfont pright">&#xe60f;</span></span>
        </div>
        <div class="place-item" v-for="item in placeList" :key="item.id" @click="gotoPointDetail(item.id)">
            <div class="first" flex="dir:left cross:center main:justify">
                <span class="place-item-name">{{item.name}}</span>
                <span class="place-item-point"><span class="icon iconfont point">&#xe63e;</span>{{item.distance}}</span>
            </div>
            <div class="text-panel"><span>地址：</span><span>{{item.address}}</span></div>
            <div class="text-panel"><span>服务时间：</span><span>{{item.time}}</span></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast } from 'vant'
    export default {
        name: 'servicePlace',
        components: {

        },
        data(){
            return {
                placeList:[]
            }
        },
        mounted(){
            this.getPlaceListData();
        },
        methods:{
            getPlaceListData(){
                let placeTemp1 = {
                    id: 'ax126789007866xx',
                    name: '八公宠物医院',
                    distance: '1.7km',
                    address: '绍兴市越城区xx路xx号',
                    time: '周一至周五   8:30-11:00 ；13:30-17:00'
                }
                let placeTemp2 = {
                    id: 'bx126789007866xx',
                    name: '八公宠物医院',
                    distance: '3.2km',
                    address: '绍兴市越城区xx路xx号',
                    time: '周一至周五   8:30-11:00 ；13:30-17:00'
                }
                this.placeList.push(placeTemp1);
                this.placeList.push(placeTemp2);
            },
            gotoMorePointPage(){
                Toast('还没开发');
            },
            gotoPointDetail(placeId){
                console.log(`placeId: ${placeId}`);
                Toast('还没开发');
            }
        }
    }
</script>
<style lang="scss" scoped>
.service-place{
    width: 702px;
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
            line-height: 56px;
            letter-spacing: 0px;
            color: #666666;
            .pright{
                margin-left: -15px;
            }
        }
    }
    .place-item{
        width: 100%;
        min-height: 190px;
        background-color: #ffffff;
        box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
        border-radius: 10px;
        padding: 20px;
        &:nth-child(n+3){
            margin-top: 20px;
        }
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
</style>