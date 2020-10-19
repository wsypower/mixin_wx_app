<template>
    <div class="step-four-page">
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">基本信息</span>
        </div>
        <van-form>
            <van-field name="radio" label="社区是否盖章：" class="label-width-200">
                <template #input>
                    <my-radio-group :initValue="submitData.isStamp.toString()" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isStamp', name)}"></my-radio-group>
                </template>
            </van-field>
            <div class="warn-note">（若未盖章，请在“添加其他材料项”中，上传“房产证/租房合同/居住证（三者任选一项）”信息。）</div>
            <van-divider class="large-line"></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <upload-image textValue="添加信息登记表"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="informationPic"
                              :initImageUrl="imageList.informationPic"></upload-image>
                <upload-image textValue="添加养犬承诺书"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="commitmentPic"
                              :initImageUrl="imageList.commitmentPic"></upload-image>
            </div>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <upload-image textValue="添加其他材料"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="otherPic"
                              :initImageUrl="imageList.otherPic"></upload-image>
            </div>
            <van-divider></van-divider>
            <div class="form-item-label">备注：</div>
            <van-field
                    class="textarea-c"
                    type="textarea"
                    v-model="submitData.remark"
                    rows="4"
                    autosize
                    :border="true"
                    placeholder="请输入备注信息"
            />
        </van-form>
        <div class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn pre-btn" @click="preStep">上一步</van-button>
            <van-button type="info" class="btn next-btn" @click="submit" :loading="submitLoading">提交</van-button>
        </div>
        <van-popup v-model="showDialog" class="dialog-warp">
            <div class="dialog" flex="dir:top cross:center">
                <div class="dialog-header">温馨提示</div>
                <div class="dialog-main">提交成功，请等待管理员审核。</div>
                <div class="dialog-footer"><van-button type="info" size="mini" @click="toHome">确定</van-button></div>
            </div>
        </van-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker, Toast } from 'vant';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import UploadImage from '../components/uploadImage.vue';
    import { bidDogCard } from '@/api/apply.js'
    import myMixin from '@/utils/mixin.js'
    export default{
        name: 'stepFour',
        components:{
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            MyRadioGroup,
            UploadImage
        },
        mixins: [myMixin],
        data(){
            return {
                //提交成功后的弹窗显示
                showDialog: false,
                //用于前端显示用
                imageList:{
                    //信息登记表
                    informationPic: '',
                    //养犬承诺书
                    commitmentPic: '',
                    //其他材料
                    otherPic: '',
                },
                //提交按钮提交时显示加载中
                submitLoading: false,
                submitData:{
                    userId: '',
                    // 图片上传的IP以及端口
                    imgHost: '',
                    //订单ID
                    dogOrderId: '',
                    //当前步骤
                    currentStep: 4,
                    //手机号码
                    phone: '',
                    //是否盖章
                    isStamp: 1,
                    //信息登记表
                    informationPic: '',
                    //养犬承诺书
                    commitmentPic: '',
                    //其他材料
                    otherPic: '',
                    //备注
                    remark: ''
                }
            }
        },
        mounted(){
            //从缓存中读入素有orderInfo数据，适用于新建与编辑
            const orderInfo = this.$store.getters['order/orderInfo'];
            Object.keys(this.submitData).forEach(key=>{
                this.submitData[key] = orderInfo[key]
            })
            this.imageList.informationPic = this.submitData.informationPic ?  this.submitData.imgHost + this.submitData.informationPic : '';
            this.imageList.commitmentPic = this.submitData.commitmentPic ? this.submitData.imgHost + this.submitData.commitmentPic : '';
            this.imageList.otherPic = this.submitData.otherPic ?  this.submitData.imgHost + this.submitData.otherPic : '';
            //在缓存中的currentStep是当时提交之后的下一步，故需要在这里重新指向当前步
            this.submitData.currentStep = 4;
            this.submitData.userId = this.$store.getters['userId'];
            this.submitData.isStamp = this.submitData.isStamp ? this.submitData.isStamp : 1;
        },
        methods:{
            //单选框实际值
            getRealValue(attrName,value){
                this.submitData[attrName] = parseInt(value);
            },
            //图片上传
            getResultImage(data){
                this.submitData[data.imageType] = data.url;
                this.imageList[data.imageType] = data.imgUrl;
            },
            //上一步
            preStep(){
                this.$router.push('/newApply/stepThree');
            },
            //最终提交
            submit(){
                this.submitLoading = true;
                console.log('submitData', this.submitData);
                let warnMessage = this.checkParams(4);
                if(warnMessage!=='success'){
                    Toast.fail({message: warnMessage,duration: 3000});
                    this.submitLoading = false;
                    return
                }
                this.$store.commit('updateIsLoading', true);
                bidDogCard(this.submitData).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    console.log(res, res);
                    this.submitLoading = false;
                    if(res.errno === 0){
                        this.$store.commit('order/updateOrderInfo', this.submitData);
                        this.showDialog = true;
                    }
                    else{
                        Toast.fail({message: res.errmsg,duration: 3000});
                    }
                });
            },
            toHome(){
                this.$router.push('/');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .step-four-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        .step-module-header{
            height: 90px;
            padding-left: 24px;
            .header-left{
                font-family: PingFang-SC-Medium;
                font-size: 30px;
                line-height: 40px;
                letter-spacing: 0px;
                color: #4d4d4d;
                border-left: 6px solid #306ce7;
                padding-left: 10px;
            }
        }
        .warn-note{
            font-family: PingFang-SC-Medium;
            font-size: 26px;
            line-height: 40px;
            color: #ef0000;
            background-color: #ffffff;
            padding: 0px 0px 20px 20px;
        }
        .upload-img{
            padding: 37px 45px;
            background-color: #ffffff;
        }
        .form-item-label{
            background-color: #ffffff;
            padding: 20px 32px;
            font-family: PingFang-SC-Medium;
            font-size: 28px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #4d4d4d;
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
            height: 320px;
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
<style lang="scss">
    .step-four-page{
        .van-cell:not(:last-child)::after{
            border-bottom-width: 0px;
        }
        .van-divider{
            margin: 0px;
        }
        .van-divider::after, .van-divider::before{
            height: 2px;
        }
        .large-line::after, .large-line::before{
            height: 10px;
        }
        .label-width-200{
            .van-field__label{
                width: 260px;
                padding-top: 10px;
            }
        }
        .textarea-c.van-cell{
            padding-top: 0px;
            padding-bottom: 40px;
        }
        .van-cell__value--alone{
            border-radius: 10px;
            border: solid 2px #dfdfdf;
        }
        .van-field__body{
            padding: 10px;
        }
    }
</style>