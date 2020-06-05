<template>
    <div class="service-place">
        <div class="service-place-header" flex="dir:left cross:center main:justify">
            <span class="header-left">推荐服务点</span>
        </div>
        <div class="service-place-body">
            <service-point-list :needMakePoint="false" :pageSize="5" @itemClickHandle="gotoPointDetail"></service-point-list>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import ServicePointList from '../../ServicePoint/components/servicePointList.vue';
    export default {
        name: 'servicePlace',
        components: {
            ServicePointList
        },
        data(){
            return {}
        },
        methods:{
            gotoPointDetail(place){
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
    }
}
</style>