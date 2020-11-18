<template>
    <div class="dog-detail-page">
        <page-header title="电子犬证"></page-header>
        <div class="page-main">
            <dog-item :dogData="dogData" :needToDetail="false" :needShare="true" class="mt10"></dog-item>
            <div class="message-panel">
                <div class="row" flex="dir:left cross:center main:justify">
                    <div class="row_left">电子芯片：</div>
                    <div class="row_right" flex="dir:left cross:center">
                        <span>{{dogData.chipNumber}}</span>
                        <span class="sep"></span>
                        <span class="text_btn copyCode" :data-clipboard-text="dogData.chipNumber" @click="copyCode">复制</span>
                    </div>
                </div>
                <div class="row" flex="dir:left cross:center main:justify">
                    <div class="row_left">办理时间：</div>
                    <div class="row_right">{{dogData.makeTime|timeFormatter('YYYY-MM-DD')}}</div>
                </div>
                <div class="row" flex="dir:left cross:center main:justify" @click="goToPage('ns')">
                    <div class="row_left">年审记录：</div>
                    <div class="row_right">
                        <span class="icon iconfont icon-arrowRight-fill"></span>
                    </div>
                </div>
                <div class="row" flex="dir:left cross:center main:justify" @click="goToPage('wg')">
                    <div class="row_left">违规记录：</div>
                    <div class="row_right">
                        <span class="icon iconfont icon-arrowRight-fill"></span>
                    </div>
                </div>
            </div>
            <div v-if="dogData.dogCarStatus==='即将到期'||dogData.dogCarStatus==='已到期'" class="btn-panel" flex="dir:left cross:center main:center">
<!--                <van-button type="info" class="btn pre-btn" @click="unBind">注销</van-button>-->
                <van-button type="info" class="btn" @click="continuedApply">续办</van-button>
            </div>
<!--            <div v-if="dogData.dogCarStatus==='有效'" class="btn-panel" flex="dir:left cross:center main:justify">-->
<!--                <van-button type="info" class="btn" @click="unBind">注销</van-button>-->
<!--            </div>-->
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast, Button } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import DogItem from './components/dogItem.vue';
    import Clipboard from 'clipboard';
    import { queryDogCard } from '@/api/dogManage.js'
    export default {
        name: 'dogDetail',
        components:{
            [Button.name]: Button,
            PageHeader,
            DogItem
        },
        data(){
            return {
                //获取单个狗证详情的入参
                params:{
                    userId: '',
                    dogCardNumber: ''
                },
                dogData: {
                    qrCodePath: require('@/assets/images/no_data@2x.png')
                }
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.params.dogCardNumber = this.$route.params.dogCardNumber;
            console.log('dogCardNumber', this.params.dogCardNumber);
            this.getDogDetail();
        },
        methods:{
            //获取单个狗证详情
            getDogDetail(){
                this.$store.commit('updateIsLoading', true);
                queryDogCard(this.params).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    console.log('queryDogCard single', res);
                    if(res.errno===0){
                        this.dogData = {
                            id: res.data.id,
                            dogCarStatus: res.data.dogCarStatus,
                            dogCardNumber: res.data.dogCardNumber,
                            dogId: res.data.dogId,
                            dogName: res.data.dogName,
                            imgHost: res.data.imgHost,
                            dogPhotoFront: res.data.dogPhotoFront,
                            validityEnd: res.data.validityEnd,
                            validityStart: res.data.validityStart,
                            chipNumber: res.data.chipNumber,
                            ownerName: res.data.ownerName,
                            phone: res.data.phone,
                            qrCodePath: res.data.qrCodePath,
                            makeTime: res.data.makeTime
                        }
                        this.$store.commit('dog/updateDogInfo', this.dogData);
                    }
                    else{
                        Toast.fail({message: res.errmsg || '获取数据失败'});
                    }
                })
            },
            //复制pdf链接
            copyCode(){
                const clipboard = new Clipboard('.copyCode');
                clipboard.on('success', () => {
                    Toast.success({
                        message: '复制成功'
                    });
                })
                clipboard.on('error', () => {
                    Toast({
                        message: '复制失败',
                        duration: 2000
                    });
                })
            },
            //违规记录/年审记录
            goToPage(page){
                if(page==='wg'){
                    Toast({
                        message: '还未开发',
                        duration: 2000
                    });
                }
                else{
                    this.$router.push('/dogCertificateManage/annual');
                }
            },
            //跳转到注销页面
            unBind(){
                this.$router.push('/dogCertificateManage/unbind');
            },
            //跳转到续办页面
            continuedApply(){
                this.$router.push({
                    path:'/continuedApply',
                    query:{
                        dogCardNumber: this.dogData.dogCardNumber,
                        chipNumber: this.dogData.chipNumber
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
.dog-detail-page{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .page-main{
        width: 100%;
        padding: 0px 24px 0px 24px;
        .mt10{
            margin-top: 20px;
        }
        .message-panel{
            margin-top: 20px;
            background-color: #ffffff;
            width: 100%;
            box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
            border-radius: 10px;
            .row{
                width: 100%;
                height: 80px;
                border-bottom: 2px solid #f5f5f5;
                padding: 0px 30px 0px 40px;
                &:last-child{
                    border-width: 0;
                }
                .row_left{
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    color: #4d4d4d;
                }
                .row_right{
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    color: #666666;
                    .sep{
                        display: inline-block;
                        margin: 0px 20px;
                        width: 4px;
                        height: 30px;
                        background-color: #999999;
                    }
                    .text_btn{
                        color: #306ce7;
                    }
                    .icon-arrowRight-fill{
                        font-size: 28px;
                    }
                }
            }
        }
        .btn-panel{
            height: 240px;
            width: 100%;
            .btn{
                width: 100%;
                height: 80px;
            }
            .pre-btn{
                width: 340px;
                background-color: #6392f4;
            }
            .next-btn{
                width: 340px;
            }
        }
    }
}
</style>