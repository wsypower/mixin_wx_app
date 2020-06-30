<template>
    <div class="home">
        <page-header title="养犬管理" :leftArrow="false">
            <div class="header-left" slot="left">
<!--                <span class="icon iconfont point">&#xe63e;</span>-->
                <span class="icon iconfont icon-dingwei point"></span>
                <span class="address" @click="()=>{this.isNone=false;this.isDown=!this.isDown}">{{areaName}}</span>
                <span class="icon iconfont icon-arrowBottom-fill jt-down" :class="{rotate90: isDown}"></span>
            </div>
        </page-header>
        <div class="main">
            <div class="mask" v-show="isDown" @click="isDown=false"></div>
            <ul class="city-choice animate__animated animate__faster" :class="{animate__fadeInDown: isDown, animate__fadeOutUp: !isDown, none: isNone}">
                <li v-for="city in cityData"
                    :key="city.code"
                    :class="{active: city.code===isActiveCode}"
                @click="changeCity(city)">{{city.name}}</li>
            </ul>
            <top :dogCards="dogCards"></top>
            <operate></operate>
            <service-place></service-place>
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
    import { queryDogCard } from '@/api/dogManage.js'
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
                isNone: true,
                isDown: false,
                cityData:[
                    {
                        name: '越城区',
                        code: '330602',
                        latitude: '29.98895',
                        longitude: '120.5819'
                    },
                    {
                        name: '柯桥区',
                        code: '330603',
                        latitude: '30.08763',
                        longitude: '120.492736'
                    },
                    {
                        name: '上虞区',
                        code: '330604',
                        latitude: '30.078038',
                        longitude: '120.476075'
                    },
                    {
                        name: '诸暨市',
                        code: '330681',
                        latitude: '29.71358',
                        longitude: '120.23629'
                    },
                    {
                        name: '嵊州市',
                        code: '330683',
                        latitude: '29.58854',
                        longitude: '120.82174'
                    },
                    {
                        name: '新昌县',
                        code: '330624',
                        latitude: '29.49991',
                        longitude: '120.90435'
                    }
                ]
            }
        },
        computed: {
            areaName: function(){
                return this.$store.getters['areaName']
            },
            isActiveCode: function(){
                return this.$store.getters['areaCode']
            }
        },
        mounted(){
            //定位只使用一次
            if(this.isActiveCode==='330106'){
                externalMethods.getPosition().then(res =>{
                    console.log('position', res)
                    //当定位区域不在这个cityData范围内，则默认定位到越城区
                    let index = this.cityData.findIndex(item => item.name === res.district);
                    if(index<0){
                        this.$store.commit('updateOriginLat','29.98895');
                        this.$store.commit('updateOriginLon','120.5819');
                        this.$store.commit('updateAreaCode','330602');
                        this.$store.commit('updateAreaName','越城区');
                    }
                    else{
                        this.$store.commit('updateOriginLat',res.latitude);
                        this.$store.commit('updateOriginLon',res.longitude);
                        this.$store.commit('updateAreaCode',res.adcode);
                        this.$store.commit('updateAreaName',res.district);
                    }
                    this.$store.commit('updateCurOriginLat',res.latitude);
                    this.$store.commit('updateCurOriginLon',res.longitude);
                    this.getData();
                }).catch(err => {
                    console.log('getPosition', err);
                    this.getData();
                });
                // this.getData();
                // this.cycleTime();
            }
            else{
                this.getData();
            }
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
            changeCity(city){
                this.$store.commit('updateOriginLat',city.latitude);
                this.$store.commit('updateOriginLon',city.longitude);
                this.$store.commit('updateAreaCode',city.code);
                this.$store.commit('updateAreaName',city.name);
                this.isDown = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .home{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
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
            .jt-down{
                display: inline-block;
                font-size: 28px;
                transition: transform 0.3s;
                &.rotate90{
                    transform:rotate(180deg);
                    -ms-transform:rotate(180deg); 	/* IE 9 */
                    -moz-transform:rotate(180deg); 	/* Firefox */
                    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                    -o-transform:rotate(180deg); 	/* Opera */
                }
            }
        }
        .main{
            width: 100%;
            padding: 20px 24px;
            flex: auto;
            overflow-y: auto;
            .mask{
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 2;
                background-color: transparent;
            }
            .city-choice{
                position: absolute;
                z-index: 3;
                left: 44px;
                top: 88px;
                width: 130px;
                background-color: #ffffff;
                box-shadow: 0px 3px 7px 0px rgba(153, 153, 153, 0.5);
                border-radius: 0px 0px 4px 4px;
                &.none{
                    display: none;
                }
                li{
                    height: 59px;
                    width: 100%;
                    line-height: 59px;
                    border-bottom: 2px solid #e6e6e6;
                    text-align: center;
                    font-family: PingFang-SC-Regular;
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #666666;
                    &.active{
                        color: #306ce7;
                    }
                    &:last-child{
                        border-bottom: 0px;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    @-webkit-keyframes fadeOutUp {
        from {
            display: block;
        }

        to {
            display:none;
            -webkit-transform: translate3d(0, -150%, 0);
            transform: translate3d(0, -150%, 0);
        }
    }
    @keyframes fadeOutUp {
        from {
            display: block;
        }

        to {
            display:none;
            -webkit-transform: translate3d(0, -150%, 0);
            transform: translate3d(0, -150%, 0);
        }
    }
    @-webkit-keyframes fadeInDown {
        from {
            display:none;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }

        to {
            display: block;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes fadeInDown {
        from {
            display:none;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }

        to {
            display: block;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
</style>