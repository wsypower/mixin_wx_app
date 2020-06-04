<template>
    <div class="dog-detail-page">
        <page-header title="电子犬证"></page-header>
        <dog-item :dogData="dogData" :needClick="false"></dog-item>
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
            <div class="row" flex="dir:left cross:center main:justify">
                <div class="row_left">年审记录：</div>
                <div class="row_right" @click="goToPage('ns')">
                    <span class="icon iconfont icon-arrowRight-fill"></span>
                </div>
            </div>
            <div class="row" flex="dir:left cross:center main:justify">
                <div class="row_left">违规记录：</div>
                <div class="row_right" @click="goToPage('wg')">
                    <span class="icon iconfont icon-arrowRight-fill"></span>
                </div>
            </div>
        </div>
        <div v-if="dogData.statusId===1||dogData.statusId===2" class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn pre-btn" @click="unBind">注销</van-button>
            <van-button type="info" class="btn next-btn" @click="continuedApply">续办</van-button>
        </div>
        <div v-if="dogData.statusId===0" class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn" @click="unBind">注销</van-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Toast, Button } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import DogItem from './components/dogItem.vue';
    import Clipboard from 'clipboard';
    import { queryDogCard } from '@/api/dogManage.js'
    const statusArr = ["有效","即将到期","已到期","注销"];
    export default {
        name: 'dogDetail',
        components:{
            [Button.name]: Button,
            PageHeader,
            DogItem
        },
        data(){
            return {
                params:{
                    userId: '',
                    dogCardNumber: ''
                },
                dogData: {}
            }
        },
        mounted(){
            this.params.userId = this.$store.getters['userId'];
            this.params.dogCardNumber = this.$route.params.dogCardNumber;
            console.log('dogCardNumber', this.params.dogCardNumber);
            this.getDogDetail();
        },
        methods:{
            getDogDetail(){
                queryDogCard(this.params).then( res => {
                    console.log('queryDogCard single', res);
                    if(res.errno===0){
                        this.dogData = {
                            id: res.data.id,
                            dogCarStatus: res.data.dogCarStatus,
                            statusId: statusArr.findIndex(it => it === res.data.dogCarStatus),
                            dogCardNumber: res.data.dogCardNumber,
                            dogId: res.data.dogId,
                            dogName: res.data.dogName,
                            dogPhotoFront: res.data.dogPhotoFront,
                            validityEnd: res.data.validityEnd,
                            validityStart: res.data.validityStart,
                            chipNumber: res.data.chipNumber,
                            ownerName: res.data.ownerName,
                            phone: res.data.phone,
                            qRCodePath: res.data.qRCodePath,
                            backgroundImage: '',
                            makeTime: res.data.makeTime
                        }

                        if(this.dogData.statusId===0){
                            this.dogData.backgroundImage = 'url(' + this.dogData.qRCodePath + '),linear-gradient(#0f0, #0f0)';
                        }
                        else if(this.dogData.statusId===1){
                            this.dogData.backgroundImage = 'url(' + this.dogData.qRCodePath + '),linear-gradient(#ffa200, #ffa200)';
                        }
                        else if(this.dogData.statusId===2){
                            this.dogData.backgroundImage = 'url(' + this.dogData.qRCodePath + '),linear-gradient(#f00, #f00)';
                        }
                        else {
                            this.dogData.backgroundImage = 'url(' + this.dogData.qRCodePath + '),linear-gradient(#999999, #999999)';
                        }
                        this.$store.commit('dog/updateDogInfo', this.dogData);
                    }
                    else{
                        Toast.fail({message: res.errmsg});
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
            unBind(){
                this.$router.push('/dogCertificateManage/unbind');
            },
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
    /*padding-top: 88px;*/
    background-color: #f5f5f5;
    padding: 88px 24px 0px 24px;
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
</style>