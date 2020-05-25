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
             :class="{zmIcon:uploadIconType==='1',fmIcon:uploadIconType==='2'}"
             @click="getImageUrlAndMoreMessage">
            <div v-if="loading" class="loading" flex="cross:center main:center">
                <van-loading size="24" />
            </div>
        </div>
        <div class="file-zm_text" v-if="textValue">{{textValue}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Loading, Toast, ImagePreview } from 'vant'
    import externalMethods from '@/utils/externalMethods/index.js'
    export default {
        name: 'photoForMessage',
        components:{
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
                default: '1'
            },
            imageType:{
                type: String,
                required: true,
                default: 'idCardFront'
            }
        },
        data(){
            return{
                loading : false,
                imgUrl: '',
            }
        },
        mounted(){

        },
        methods:{
            getImageUrlAndMoreMessage(){
                this.loading = true;
                externalMethods.getImageUrlAndMoreMessage(this.imageType).then(res => {
                    console.log('photo for message components: 9999999999999', res);
                    this.imgUrl = res.imageUrl;
                    this.$emit('getMessage',{imageType:this.imageType, data:res});
                    setTimeout(() => {
                        this.loading = false;
                    }, 200);
                }).catch(err => {
                    this.loading = true;
                    Toast(err);
                })
            },
            clearImage(){
                this.imgUrl = '';
                this.$emit('clearImage',{imageType:this.imageType});
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
            &.fmIcon{
                @include bg-image("~assets/images/sfz-fm");
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
    }
</style>