<template>
    <div class="dog-detail-page">
        <page-header title="电子犬证"></page-header>
        <dog-item :dogData="dogData"></dog-item>
        <div class="message-panel">
            <div class="row" flex="dir:left cross:center main:justify">
                <div class="row_left">电子芯片：</div>
                <div class="row_right" flex="dir:left cross:center">
                    <span>3213214124124</span>
                    <span class="sep"></span>
                    <span class="text_btn copyCode" :data-clipboard-text="code" @click="copyCode">复制</span>
                </div>
            </div>
            <div class="row" flex="dir:left cross:center main:justify">
                <div class="row_left">办理时间：</div>
                <div class="row_right">2020-12-26</div>
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
    export default {
        name: 'dogDetail',
        components:{
            [Button.name]: Button,
            PageHeader,
            DogItem
        },
        data(){
            return {
                dogData: {},
                code: 3213214124124
            }
        },
        mounted(){
            this.getDogDetail();
        },
        methods:{
            getDogDetail(){
                this.dogData = {
                    address: null,
                    businessLicense: null,
                    chipNumber: "121212",
                    company: null,
                    createtime: null,
                    dogCarStatus: "已到期",
                    statusId: 2,
                    dogCardNumber: "32323232",
                    dogId: 105,
                    dogName: "米朵",
                    dogPhotoFront: "http://220.191.224.215/upload/file/2020/05/21/20200521184255564113.jpg",
                    id: 4,
                    isRecord: 1,
                    makeTime: 1590058337795,
                    ownerId: 44,
                    ownerName: "颜碧莲",
                    phone: "13306511009",
                    qRCodePath: null,
                    sort: null,
                    state: "1",
                    status: null,
                    updateTime: null,
                    userId: 44,
                    userType: 0,
                    validityEnd: 1590461053000,
                    validityStart: 1590058337795
                }
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
            },
            unBind(){
                this.$router.push('/dogCertificateManage/unbind');
            },
            continuedApply(){

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