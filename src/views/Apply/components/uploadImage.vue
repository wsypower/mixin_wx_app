<template>
    <div class="upload-item" >
        <div class="has-img" v-if="imgUrl">
            <div class="img-panel" @click="previewImage">
                <img :src="imgUrl" />
            </div>
            <div class="close_btn" flex="cross:center main:center" @click="clearImage()">X</div>
        </div>
        <div v-else
             class="file_icon"
             :class="{zmIcon:uploadIconType==='1',jzzIcon:uploadIconType==='2',myjlIcon:uploadIconType==='3'}"
             @click="showMethodsPanel = true">
            <div v-if="loading" class="loading" flex="cross:center main:center">
                <van-loading size="24" />
            </div>
            <!--<div v-if="loading" class="loading" flex="cross:center main:center">-->
                <!--<van-loading size="24" />-->
            <!--</div>-->
        </div>
        <div class="file-zm_text" v-if="textValue">{{textValue}}</div>
        <van-popup v-model="showMethodsPanel" position="bottom">
            <div class="methods-panel" flex="dir:top cross:center">
                <div @click="getImage('pz')">拍照</div>
                <div @click="getImage('photo')">选择图片</div>
            </div>
        </van-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Popup, Loading, Toast, ImagePreview } from 'vant'
    import externalMethods from '@/utils/externalMethods/index.js'
    export default {
        name: 'uploadImage',
        components:{
            [Popup.name]: Popup,
            [Loading.name]: Loading,
            [ImagePreview.Component.name]: ImagePreview.Component
        },
        props:{
            textValue:{
                type: String,
                default: ''
            },
            uploadIconType:{
                type: String,
                default: ''
            },
            imageType:{
                type: String,
                default: ''
            }
        },
        data(){
            return{
                showMethodsPanel: false,
                loading : false,
                imgUrl: '',
            }
        },
        mounted(){

        },
        watch:{
            imgUrl: function(val){
                this.$emit('changeImage',{imageType:this.imageType, url:val});
            }
        },
        methods:{
            getImage(method){
                this.showMethodsPanel = false;
                this.loading = true;
                externalMethods.getImageUrl(method).then((res)=>{
                    console.log('upload Image components 000000000000000000000',res);
                    this.imgUrl = res.pics[0].path;
                    setTimeout(() => {
                        this.loading = false;
                    }, 200);
                }).catch((err)=>{
                    Toast(err);
                })
            },
            clearImage(){
                this.imgUrl = '';
            },
            previewImage(){
                ImagePreview([this.imgUrl]);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .upload-item{
        .file_icon{
            width: 298px;
            height: 222px;
            background-size: 100% 100%;
            position: relative;
            &.zmIcon{
                @include bg-image("~assets/images/file-zm");
            }
            &.jzzIcon{
                @include bg-image("~assets/images/jzz-fm");
            }
            &.myjlIcon{
                @include bg-image("~assets/images/myjl");
            }
            .loading{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
            }
        }
        .file-zm_text{
            margin-top: 24px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 23px;
            letter-spacing: 0px;
            color: #666666;
            text-align: center;
        }
        .has-img{
            width: 298px;
            height: 222px;
            position: relative;
            .img-panel{
                width: 100%;
                height: 100%;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .close_btn{
                position: absolute;
                top: -16px;
                right: -16px;
                width: 40px;
                height: 40px;
                border-radius: 40px;
                background-color: rgba(0,0,0,0.5);
                font-size: 36px;
                color: #ffffff;
            }
        }
        .methods-panel{
            width: 100%;
            >div{
                width: 100%;
                height: 120px;
                font-size: 40px;
                line-height: 120px;
                text-align: center;
            }
        }
    }
</style>
