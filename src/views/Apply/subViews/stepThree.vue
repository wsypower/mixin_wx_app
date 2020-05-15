<template>
    <div class="step-three-page">
        <div class="warn-note">（提示：请将以下两张表格，打印出来，并至“社区居（村）委会”盖章。若未盖章，请在“下一步”的“添加其他材料”项中，上传“房产证/租房合同/居住证（三者任选一项）”信息，谢谢。</div>
        <div class="step-module-header" flex="dir:left cross:center main:justify">
            <span class="header-left">信息登记表</span>
            <div class="header-right" flex="dir:left cross:center">
                <van-button type="info" size="mini">复制链接</van-button>
                <van-button type="info" size="mini" v-if="isWX">分享</van-button>
            </div>
        </div>
        <div class="file-one">
            <img src="http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512154426798109.jpeg" @click="previewImage(0)"/>
        </div>
        <div class="step-module-header" flex="dir:left cross:center main:justify">
            <span class="header-left">个人养犬承诺书</span>
            <div class="header-right" flex="dir:left cross:center">
                <van-button type="info" size="mini">复制链接</van-button>
                <van-button type="info" size="mini" v-if="isWX">分享</van-button>
            </div>
        </div>
        <div class="file-two">
            <img src="http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512144215651871.jpeg" @click="previewImage(1)"/>
        </div>
        <div class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn pre-btn" @click="preStep">上一步</van-button>
            <van-button type="info" class="btn next-btn" @click="nextStep">下一步</van-button>
        </div>
        <!--<van-image-preview v-model="showPreviewImage" :images="image"></van-image-preview>-->
    </div>
</template>
<script type="text/ecmascript-6">
    import { Button, ImagePreview } from 'vant';
    //http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512154426798109.jpeg
    //http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512144215651871.jpeg
    //http://zhcg.jhk.gov.cn:85//upload/file/2020/05/12/20200512150855204691.jpeg
    export default{
        name: 'stepThree',
        components:{
            [Button.name]: Button ,
            // [ImagePreview.name]: ImagePreview
        },
        data(){
           return {
               showPreviewImage: false,
               image: []
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
    }
</style>