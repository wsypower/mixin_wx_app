<template>
    <div class="home">
        <page-header title="养犬管理" :leftArrow="false">
            <div class="header-left" slot="left">
                <span class="icon iconfont point">&#xe63e;</span>
                <span class="address">{{areaName}}</span>
            </div>
        </page-header>
        <div class="main" flex="dir:top cross:center">
            <top :dogCards="dogCards"></top>
            <operate></operate>
            <service-place :servePlaces="servePlaceList"></service-place>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue'
    import Top from './components/top.vue'
    import Operate from './components/operate.vue'
    import ServicePlace from './components/serviceplace.vue'
    import { getURLParameters } from '@/utils/index';
    import externalMethods from '@/utils/externalMethods/index.js'
    import { AccountLogin } from '@/api/account/login.js';
    import { queryDogCard, queryDogServicePoint } from '@/api/home.js'
    export default {
        name: 'home',
        components:{
            PageHeader,
            Top,
            Operate,
            ServicePlace
        },
        data(){
            return {
                interval: null,
                dogCards: [],
                servePlaceList: [],
                areaName: '越城区',
            }
        },
        mounted(){
            externalMethods.getPosition().then(res =>{
                console.log('position', res)
                this.areaName = res.district;
                this.$store.commit('updateOriginLat',res.latitude);
                this.$store.commit('updateOriginLon',res.longitude);
                this.$store.commit('updateAreaCode',res.adcode);
                this.getData();
            }).catch(err => {
                console.log('getPosition', err);
                this.getData();
            });
            // this.getData();
            // this.cycleTime();
        },

        methods: {
            async getUserId(){
                let userId = this.$store.getters['userId'];
                if( userId === 'xxx'){
                    let token = getURLParameters('userid');
                    const p = await AccountLogin({token: token});
                    console.log('pppp',p,p.data.userId);
                    this.$store.commit('updateUserId', p.data.userId);
                    userId = p.data.userId;
                }
                return userId
            },
            async getData(){
                this.$store.commit('updateIsLoading',true);
                const userId = await this.getUserId();
                console.log(`userId: ${userId}`);
                this.getDogCard(userId);
                //获取范围内的服务点
                let originLon = this.$store.getters['originLon'];
                let originLat = this.$store.getters['originLat'];
                let areaCode = this.$store.getters['areaCode'];
                let params = {
                    userId,
                    originLon,
                    originLat,
                    areaCode
                }
                queryDogServicePoint(params).then( res => {
                    console.log('queryDogServicePoint',res.data);
                    this.servePlaceList = res.data;
                });
            },
            getDogCard(userId){
                //获取已有的犬证
                queryDogCard({userId: userId}).then( res => {
                    this.dogCards = res.data;
                    this.$store.commit('updateIsLoading',false)
                });
            },
            cycleTime() {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.getDogCard(this.$store.getters['userId'])
                }, 1800000);
            },
        }
    }
</script>
<style lang="scss" scoped>
    .home{
        height: 100%;
        width: 100%;
        padding-top: 88px;
        .header-left{
            color: #fff;
            .point{
                margin-left: 10px;
                font-size: 28px;
            }
            .address{
                font-family: PingFang-SC-Medium;
                font-size: 28px;
                letter-spacing: 1px;
            }
        }
        .main{
            height: 100%;
            width: 100%;
            padding: 20px 24px;
        }
    }
</style>