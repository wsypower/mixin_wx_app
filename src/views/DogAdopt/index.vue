<template>
    <div class="adopt-page">
        <page-header title="宠物领养"></page-header>
        <div class="page-main">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    class="list-panel"
            >
                <div class="dog-adopt-item" flex="dir:left cross:center main:justify" v-for="item in adoptDogList" :key="item.id" @click="itemClickHandle(item)">
                    <div class="top-flag">
                        <span>进行中</span>
                    </div>
                    <div class="message" flex="dir:top main:justify">
                        <div flex="dir:left main:justify"><span class="title">{{item.dogName}}</span><span class="message-text">品种：{{item.breed}}</span></div>
                        <div class="message-text">领养服务点：{{item.address}}</div>
                    </div>
                    <div class="img-panel" flex="cross:center main:center">
                        <img :src="item.dogPhoto[0]" :onerror="defaultImg"/>
                    </div>
                </div>
            </van-list>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import { List } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import { queryAllAdoptDog } from '@/api/dogAdopt.js'
    export default {
        name: 'dogAdopt',
        components: {
            PageHeader,
            [List.name]: List
        },
        data(){
            return {
                adoptDogList: [],
                loading: false,
                finished: false,
                totalSize: 0,
                defaultImg: 'this.src="' + require('@/assets/images/default@3x.png') + '"',
                params:{
                    userId: '',
                    areaCode: '',
                    currentPage: 0,
                    pageSize: 10
                }
            }
        },
        mounted() {
            this.params.userId = this.$store.getters['userId'];
        },
        methods:{
            //list加载数据
            onLoad() {
                console.log('adopt dog list data');
                this.params.currentPage = this.params.currentPage + 1;
                let temp1 = {
                    id: '001',
                    dogName: '花花1',
                    breed: '柴犬',
                    dogSex: '母',
                    hairColor: '红色',
                    address: 'xxxx服务点',
                    phone: '18909867876',
                    time: '2020-07-07',
                    starttime: '2020-07-07',
                    endtime: '',
                    dogPhoto: ['123','']
                }
                let temp2 = {
                    id: '002',
                    dogName: '花花公子',
                    breed: '阿拉斯加',
                    dogSex: '公',
                    hairColor: '土黄色',
                    address: 'xxxxx服务点',
                    phone: '18765789090x',
                    starttime: '2020-07-07',
                    endtime: '',
                    dogPhoto: ['123']
                }
                let temp3 = {
                    id: '003',
                    dogName: '花花3',
                    breed: '田园犬',
                    dogSex: '公',
                    hairColor: '黄白相间',
                    address: 'yyyy服务点',
                    phone: '12098979000',
                    starttime: '2020-07-07',
                    endtime: '',
                    dogPhoto: ['123']
                }
                this.adoptDogList.push(temp1);
                this.adoptDogList.push(temp2);
                this.adoptDogList.push(temp3);
                this.totalSize = 3;
                this.loading = false;
                this.finished = true;
                // queryArticle(this.params).then( res => {
                //     this.totalSize = res.data.count;
                //     this.dataList = res.data.queryList.reduce((acc, item) => {
                //         item.picPath = item.picPath||'123';
                //         acc.push(item);
                //         return acc
                //     },this.dataList);
                //     // 加载状态结束
                //     this.loading = false;
                //     // 数据全部加载完成
                //     if (this.dataList.length >= this.totalSize) {
                //         this.finished = true;
                //     }
                // });
            },
            itemClickHandle(item){
                this.$store.commit('adoptdog/updateDogInfo',item);
                this.$router.push('/dogAdopt/detail');
            }
        }
    }
</script>
<style lang="scss" scoped>
.adopt-page{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .page-main{
        flex: auto;
        overflow-y: auto;
    }
    .list-panel{
        padding: 20px 24px;
        .dog-adopt-item{
            width: 100%;
            height: 190px;
            background-color: #ffffff;
            box-shadow: 0px 3px 7px 0px rgba(127, 127, 127, 0.35);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            .top-flag{
                position: absolute;
                top: 0px;
                left: 0px;
                z-index: 1;
                width: 90px;
                height: 34px;
                line-height: 34px;
                background-color: #009944;
                border-radius: 10px 0px 0px 0px;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #ffffff;
                text-align: center;
            }
            &:last-child{
                margin-bottom: 0px;
            }
            .message{
                height: 100%;
                padding: 40px 0px 16px 0px;
                .title{
                    width: 218px;
                    font-family: PingFang-SC-Bold;
                    font-size: 28px;
                    color: #333333;
                    font-weight: bold;
                }
                .message-text{
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    letter-spacing: 0px;
                    color: #4d4d4d;
                }
            }
            .img-panel{
                width: 200px;
                height: 150px;
                background-color: #aaaaaa;
                border-radius: 10px;
                overflow: hidden;
                background-size: 100% 100%;
                img{
                    height: 100%;
                }
            }
        }
    }
}
</style>