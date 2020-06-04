<template>
    <div class="operate" flex="dir:left cross:center">
        <div v-for="item in operateList" :key="item.name" class="operate-item" flex="dir:top cross:center" @click="gotoModulePage(item.path)">
            <div class="operate-item_icon" :class="item.iconClass"></div>
            <div class="operate-item_name">{{item.name}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast } from 'vant';
    export default {
        name: 'operate',
        components: {

        },
        data(){
            return {
                operateList:[{
                    iconClass: 'qzsb',
                    name: '犬证申办',
                    path: '/apply'
                },{
                    iconClass: 'jdcx',
                    name: '进度查询',
                    path: '/process'
                },{
                    iconClass: 'qzgl',
                    name: '犬证管理',
                    path: '/dogCertificateManage'
                },{
                    iconClass: 'cwly',
                    name: '宠物领养',
                    path: ''
                },{
                    iconClass: 'zdfg',
                    name: '制度法规',
                    path: ''
                },{
                    iconClass: 'yqzs',
                    name: '养犬知识',
                    path: ''
                },{
                    iconClass: 'fwjg',
                    name: '服务机构',
                    path: '/service'
                },{
                    iconClass: 'tsjb',
                    name: '投诉举报',
                    path: ''
                }]
            }
        },
        mounted(){

        },
        methods:{
            gotoModulePage(path){
                if(path===''){
                    Toast('还没开发');
                }
                else{
                    if(path==='/service'){
                        let pointInfo = {
                            id: '',
                            servicePointName: '',
                            distance: '',
                            address: 0,
                            serviceTime: '',
                            originLon: '',
                            originLat: '',
                        }
                        this.$store.commit('service/updatePointInfo',pointInfo);
                    }
                    this.$router.push(path);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.operate{
    margin-top: 20px;
    width: 100%;
    height: 300px;
    background-color: #ffffff;
    box-shadow: 0px 3px 7px 0px rgba(209, 209, 209, 0.35);
    border-radius: 10px;
    flex-wrap: wrap;
    padding-left: 15px;
    .operate-item{
        width: 165px;
        height: 150px;
        /*&:nth-child(4n-3){*/
            /*margin-left: 20px;*/
        /*}*/
        .operate-item_icon{
            width:  100px;
            height: 100px;
            background-size: 100% 100%;
            &.qzsb{
                @include bg-image("~assets/images/operate1");
            }
            &.jdcx{
                @include bg-image("~assets/images/operate2");
            }
            &.qzgl{
                @include bg-image("~assets/images/operate3");
            }
            &.cwly{
                @include bg-image("~assets/images/operate4");
            }
            &.zdfg{
                @include bg-image("~assets/images/operate5");
            }
            &.yqzs{
                @include bg-image("~assets/images/operate6");
            }
            &.fwjg{
                @include bg-image("~assets/images/operate7");
            }
            &.tsjb{
                @include bg-image("~assets/images/operate8");
            }
        }
        .operate-item_name{
            font-family: PingFang-SC-Medium;
            font-size: 28px;
            line-height: 23px;
            letter-spacing: 0px;
            color: #666666;
        }
    }
}
</style>