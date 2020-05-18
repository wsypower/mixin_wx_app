<template>
    <div class="step-three-page">
        <div class="warn-note">（提示：请将以下两张表格，打印出来，并至“社区居（村）委会”盖章。若未盖章，请在“下一步”的“添加其他材料”项中，上传“房产证/租房合同/居住证（三者任选一项）”信息，谢谢。</div>
        <div class="step-module-header" flex="dir:left cross:center main:justify">
            <span class="header-left">信息登记表</span>
            <div class="header-right" flex="dir:left cross:center">
                <van-button type="info" size="mini" class="copyDJFileUrl" :data-clipboard-text="djFileUrl" @click="copyDJFileUrl">复制链接</van-button>
                <van-button type="info" size="mini" v-if="isWX">分享</van-button>
            </div>
        </div>
        <div class="file-one">
            <img :src="djFileUrl" @click="previewImage(0)"/>
        </div>
        <div class="step-module-header" flex="dir:left cross:center main:justify">
            <span class="header-left">个人养犬承诺书</span>
            <div class="header-right" flex="dir:left cross:center">
                <van-button type="info" size="mini"  class="copyCNFileUrl" :data-clipboard-text="cnFileUrl" @click="copyCNFileUrl">复制链接</van-button>
                <van-button type="info" size="mini" v-if="isWX">分享</van-button>
            </div>
        </div>
        <div class="file-two">
            <img :src="cnFileUrl" @click="previewImage(1)"/>
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
        <!--<van-image-preview v-model="showPreviewImage" :images="image"></van-image-preview>-->
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button, ImagePreview, Popup, Toast } from 'vant';
    import Clipboard from 'clipboard';
    //http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512154426798109.jpeg
    //http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512144215651871.jpeg
    //http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512150855204691.jpeg
    export default{
        name: 'stepThree',
        components:{
            [Button.name]: Button ,
            [Popup.name]: Popup,
            // [ImagePreview.name]: ImagePreview
        },
        data(){
           return {
               djFileUrl: 'http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512154426798109.jpeg',
               cnFileUrl: 'http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512144215651871.jpeg',
               showPreviewImage: false,
               image: [],
               showDialog: false,
           }
        },
        computed:{
            isWX: function(){
                return this.$store.getters['isWX']
            }
        },
        mounted(){
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
            copyCNFileUrl(){
                const clipboard = new Clipboard('.copyCNFileUrl');
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
            previewImage(index){
                ImagePreview({
                    images: [
                        'http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512154426798109.jpeg',
                        'http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512144215651871.jpeg'
                    ],
                    startPosition: index,
                    onClose() {
                        // do something
                    }
                });
            },
            preStep(){
                //如果在history里面有，则使用缓存数据，没有则去获取数据
                this.$router.push('/newApply/stepTwo');
            },
            nextStep(){
                this.$router.push('/newApply/stepFour');
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
            height: 874px;
            padding: 24px;
            background-color: #ffffff;
            img{
                width: 100%;
                height:100%;
            }
        }
        .file-two{
            width: 100%;
            height: 432px;
            padding: 24px;
            background-color: #ffffff;
            img{
                width: 100%;
                height:100%;
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
            height: 350px;
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
    }
</style>