<template>
    <div class="step-three-page">
        <div class="warn-note">（提示：请将以下两张表格，打印出来，并至“社区居（村）委会”盖章。若未盖章，请在“下一步”的“添加其他材料”项中，上传“房产证/租房合同/居住证（三者任选一项）”信息，谢谢。</div>
        <div class="step-module-header" flex="dir:left cross:center main:justify">
            <span class="header-left">信息登记表及个人养犬承诺书</span>
            <div class="header-right" flex="dir:left cross:center">
                <van-button type="info" size="mini" class="copyDJFileUrl" :data-clipboard-text="pdfUrl" @click="copyDJFileUrl">复制链接</van-button>
                <van-button type="info" size="mini" v-if="isWX">分享</van-button>
            </div>
        </div>
        <div class="file-one" @click="openBigger">
            <pdf
                class="pdf-c"
                v-for="i in numPages"
                :key="i"
                :src="src"
                :page="i"
            ></pdf>
        </div>
        <div class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn pre-btn" @click="preStep">上一步</van-button>
            <van-button type="info" class="btn next-btn" @click="nextStep">下一步</van-button>
        </div>
        <van-popup v-model="showDialog" class="dialog-warp">
            <div class="dialog" flex="dir:top cross:center">
                <div class="dialog-header">温馨提示</div>
                <div class="dialog-main">表格链接已复制，请用浏览器打开链接并下载，然后打印出来盖章。</div>
                <div class="dialog-footer"><van-button type="info" size="mini" @click="showDialog=false">关闭</van-button></div>
            </div>
        </van-popup>
        <div class="mask" @click="closeBigger" v-show="showBigger">
            <pdf style="width:100%"
                v-for="i in numPages"
                :key="i"
                :src="src"
                :page="i"
            ></pdf>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button, ImagePreview, Popup, Toast } from 'vant';
    import Clipboard from 'clipboard';
    import pdf from 'vue-pdf'
    import { bidDogCard } from '@/api/apply.js'
    export default{
        name: 'stepThree',
        components:{
            [Button.name]: Button ,
            [Popup.name]: Popup,
            pdf
        },
        data(){
           return {
               submitData:{
                   dogOrderId: '',
                   userId: '',
                   //当前步骤
                   currentStep: 3,
                   //手机号码
                   phone: ''
               },
               src: '',
               pdfUrl: '',
               showDialog: false,
               numPages: undefined,
               showBigger: false,
           }
        },
        computed:{
            isWX: function(){
                return this.$store.getters['isWX'];
            }
        },
        created(){

        },
        mounted(){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    const orderInfo = this.$store.getters['order/orderInfo'];
                    this.pdfUrl = orderInfo.picPath;
                    console.log('three', orderInfo, this.pdfUrl);
                    const pdfUrlArr = this.pdfUrl.split('//');
                    this.src = pdf.createLoadingTask('/pdf/' + pdfUrlArr[pdfUrlArr.length-1]);// upload/file/2020/05/18/20200518195301513703.pdf
                    this.src.then(pdf => {
                        this.numPages = pdf.numPages;
                    });
                    Object.keys(this.submitData).forEach(key=>{
                        this.submitData[key] = orderInfo[key]
                    })
                    this.submitData.currentStep = 3;
                    this.submitData.userId = this.$store.getters['userId'];
                });
            })
        },

        methods:{
            copyDJFileUrl(){
                const clipboard = new Clipboard('.copyDJFileUrl');
                clipboard.on('success', () => {
                    console.log(1111111111111);
                    this.showDialog = true;
                })
                clipboard.on('error', () => {
                    Toast({
                        message: '复制失败',
                        duration: 1000
                    });
                })
            },
            openBigger(){
                this.showBigger = true;
            },
            closeBigger(){
                this.showBigger = false;
            },
            preStep(){
                this.$router.push('/newApply/stepTwo');
            },
            nextStep(){
                console.log('submitData', this.submitData);
                bidDogCard(this.submitData).then( res => {
                    console.log(res, res);
                    if(res.errno === 0){
                        this.$store.commit('order/updateOrderInfo', { currentStep : '3'});
                        this.$router.push('/newApply/stepFour');
                    }
                    else{
                        Toast.fail({message: res.errmsg,duration: 3000});
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .step-three-page {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        .warn-note{
            padding: 18px 24px 0px 24px;
            font-family: PingFang-SC-Medium;
            font-size: 26px;
            line-height: 40px;
            color: #ef0000;
        }
        .step-module-header {
            height: 90px;
            padding: 0px 24px;
            .header-left {
                font-family: PingFang-SC-Medium;
                font-size: 30px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #4d4d4d;
                border-left: 6px solid #306ce7;
                padding-left: 10px;
            }
            .header-right {
                button{
                    width: 110px;
                }
            }
        }
        .file-one{
            width: 100%;
            background-color: #ffffff;
            .pdf-c{
                width: 100%;
                /*height: 800px;*/
                overflow: hidden;
            }
        }
        .btn-panel{
            height: 170px;
            width: 100%;
            padding: 0px 24px;
            .btn{
                width: 340px;
                height: 80px;
            }
            .pre-btn{
                background-color: #6392f4;
            }
        }
        .dialog-warp{
            border-radius: 20px;
        }
        .dialog{
            width: 500px;
            height: 380px;
            .dialog-header{
                width: 500px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                background-color: #306ce7;
                color: #ffffff;
                font-family: PingFang-SC-Medium;
                font-size: 32px;
            }
            .dialog-main{
                width: 100%;
                padding: 20px 40px;
                flex: 1;
                color: #333333;
                font-family: PingFang-SC-Medium;
                font-size: 32px;
            }
            .dialog-footer{
                width: 100%;
                height: 120px;
                text-align: center;
            }
        }
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            background-color: rgba(0,0,0,0.5);
            width: 100%;
            padding:20px;
            height: 100%;
            overflow-y: auto;
        }
    }
</style>