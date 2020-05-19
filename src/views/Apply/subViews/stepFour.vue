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
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">添加信息登记表</div>
                </div>
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">添加养犬承诺书</div>
                </div>
            </div>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">添加其他材料</div>
                </div>
            </div>
            <van-divider></van-divider>
            <div class="form-item-label">备注：</div>
            <van-field
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
            <van-button type="info" class="btn next-btn" @click="submit">提交</van-button>
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
    const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
    import { bidDogCard } from '@/api/apply.js'
    export default{
        name: 'stepFour',
        components:{
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            MyRadioGroup
        },
        data(){
            return {
                ynArray,
                showDialog: false,
                submitData:{
                    userId: '',
                    //订单ID
                    dogOrderId: '',
                    //当前步骤
                    currentStep: '4',
                    //手机号码
                    phone: '',
                    //是否盖章
                    isStamp: '1',
                    //信息登记表
                    informationPic: '',
                    //养犬承诺书
                    commitmentPic: '',
                    //其他材料
                    otherFilePic: '',
                    //备注
                    remark: ''
                }
            }
        },
        mounted(){
            this.submitData.dogOrderId = this.$store.getters['apply/dogOrderId'];
            this.submitData.userId = this.$store.getters['userId'];
        },
        beforeRouteEnter(to,from,next) {
            console.log('beforeRouteEnter', to, from);
            next(vm=>{
                const orderInfo = vm.$store.getters['order/orderInfo'];
                Object.keys(vm.submitData).forEach(key=>{
                    vm.submitData[key] = orderInfo[key]
                })
                vm.submitData.currentStep = 4;
            })
        },
        methods:{
            getRealValue(attrName,value){
                this.submitData[attrName] = parseInt(value);
            },
            preStep(){
                //如果在history里面有，则使用缓存数据，没有则去获取数据
                this.$router.push('/newApply/stepThree');
            },
            submit(){
                this.submitData.informationPic = 'http://p8.itc.cn/images03/20200514/7ff57354e0324e86a776b3d7f3bf79e1.jpeg';
                this.submitData.commitmentPic = 'http://cs.wenming.cn/2/fr/201903/W020190314630706200502.jpg';
                console.log('submitData', this.submitData);
                bidDogCard(this.submitData).then( res => {
                    console.log(res, res);
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
            .upload-item{
                .file-zm_icon{
                    width: 298px;
                    height: 222px;
                    @include bg-image("~assets/images/file-zm");
                    background-size: 100% 100%;
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
            }
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
            height: 300px;
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
            }
        }
        .van-cell{
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