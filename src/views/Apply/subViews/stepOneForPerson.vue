<template>
    <div class="step-one-page">
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">基本信息</span>
        </div>
        <van-form>
            <van-field name="radio" label="犬主是否本人：" class="label-width-200">
                <template #input>
                    <my-radio-group :initValue="submitData.isOwner.toString()" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isOwner', name)}"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field name="radio" label="是否备案犬证：" class="label-width-200" v-show="false">
                <template #input>
                    <my-radio-group :initValue="submitData.isRecord.toString()" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isRecord', name)}"></my-radio-group>
                </template>
            </van-field>
            <div class="warn-note" v-show="submitData.isOwner===0">（备案犬证后，后续您也可以对犬证进行管理）</div>
            <van-divider v-show="submitData.isOwner===0"></van-divider>
            <van-field name="radio" label="证件类型：">
                <template #input>
                    <my-radio-group :initValue="submitData.idType.toString()" :radioGroup="fileTypeArray" @getRealValue="(name)=>{getRealValue('idType', name)}"></my-radio-group>
                </template>
            </van-field>
            <van-divider class="mini-line"></van-divider>
            <template v-if="submitData.idType === 1">
                <div class="upload-img sfz-file" flex="dir:left cross:center main:justify">
                    <photo-for-message textValue="拍摄身份证人像面"
                                       uploadIconType="1"
                                       @getMessage="getResultMessage"
                                       imageType="idCardFront"
                                       @clearImage="clearImage"></photo-for-message>
                    <photo-for-message textValue="拍摄身份证反面"
                                       uploadIconType="2"
                                       @getMessage="getResultMessage"
                                       imageType="idCardBack"
                                       @clearImage="clearImage"></photo-for-message>
                </div>
                <van-divider></van-divider>
                <van-field v-model="submitData.ownerName" label="犬主姓名：" placeholder="请输入" input-align="right"/>
                <van-divider></van-divider>
                <van-field v-model="submitData.idCard" label="身份证号：" placeholder="请输入" input-align="right"/>
            </template>
            <template v-if="submitData.idType === 2">
                <div class="upload-img" flex="dir:left cross:center main:justify">
                    <photo-for-message textValue="拍摄证件照片像面"
                                       uploadIconType="1"
                                       @getMessage="getResultMessage"
                                       imageType="driverLicense"
                                       @clearImage="clearImage"></photo-for-message>
                </div>
                <van-divider></van-divider>
                <van-field v-model="submitData.ownerName" label="犬主姓名：" placeholder="请输入" input-align="right"/>
            </template>
            <template v-if="submitData.idType === 3">
                <div class="upload-img" flex="dir:left cross:center main:justify">
                    <photo-for-message textValue="拍摄证件照片像面"
                                       uploadIconType="1"
                                       @getMessage="getResultMessage"
                                       imageType="passport"
                                       @clearImage="clearImage"></photo-for-message>
                </div>
                <van-divider></van-divider>
                <van-field v-model="submitData.firstName" label="First name：" placeholder="请输入内容" input-align="right"/>
                <van-divider></van-divider>
                <van-field v-model="submitData.lastName" label="Last name：" placeholder="请输入内容" input-align="right"/>
                <van-divider></van-divider>
                <van-field v-model="submitData.country" label="国家：" placeholder="请输入国家" input-align="right"/>
                <van-divider></van-divider>
                <van-field v-model="submitData.passport" label="护照号：" placeholder="请输入护照号" input-align="right"/>
                <van-divider></van-divider>
                <van-field name="radio" label="性别：" input-align="right">
                    <template #input>
                        <my-radio-group :initValue="submitData.sex.toString()" :radioGroup="sexArray" @getRealValue="(name)=>{getRealValue('sex', name)}" style="width:unset"></my-radio-group>
                    </template>
                </van-field>
            </template>
            <van-divider></van-divider>
            <van-field v-model="submitData.phone" type="number" label="联系电话：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.verificationCode" label="验证码：" placeholder="请输入短信验证码" @blur="checkSms">
                <template #button>
                    <van-button v-show="sendAuthCode" plain type="info" size="small" @click="getAuthCode">获取验证码</van-button>
                    <van-button v-show="!sendAuthCode" plain type="info" size="small" >{{auth_time}} 秒后重发</van-button>
                </template>
            </van-field>
        </van-form>
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">居住信息</span>
        </div>
        <van-form>
            <van-field
                readonly
                clickable
                name="picker"
                :value="submitData.region"
                label="现居住区县"
                placeholder="请选择区县"
                @click="showRegionPicker = true"
                input-align="right"
                right-icon="arrow"
            />
            <van-popup v-model="showRegionPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="regionColumns"
                        @confirm="onRegionConfirm"
                        :loading="adLoading"
                        @cancel="showRegionPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.street"
                    label="街道"
                    placeholder="请选择街道"
                    @click="showStreetPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showStreetPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="streetColumns"
                        @confirm="onStreetConfirm"
                        :loading="adLoading"
                        @cancel="showStreetPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.community"
                    label="社区"
                    placeholder="请选择社区"
                    @click="showCommunityPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showCommunityPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="communityColumns"
                        @confirm="onCommunityConfirm"
                        :loading="adLoading"
                        @cancel="showCommunityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field v-model="submitData.address" label="详细地址：" placeholder="请填写详细地址" input-align="right"/>
            <van-divider></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <upload-image textValue="上传居住证明" uploadIconType="1" @changeImage="getResultImage" imageType="residencyProofFront"></upload-image>
                <upload-image textValue="上传居住证明" uploadIconType="2" @changeImage="getResultImage" imageType="residencyProofBack"></upload-image>
            </div>
        </van-form>
        <div class="btn-panel" flex="dir:top cross:center main:center">
            <van-button type="info" class="next-btn" @click="nextStep">下一步</van-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker, Toast } from 'vant';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import UploadImage from '../components/uploadImage.vue';
    import PhotoForMessage from '../components/photoForMessage.vue';
    const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
    const fileTypeArray = [{labelName: '身份证',value: '1'},{labelName: '驾驶证',value: '2'},{labelName: '护照',value: '3'}];
    const sexArray = [{labelName: '男',value: '1'},{labelName: '女',value: '0'}];
    import { queryAddressByParentId } from '@/api/common.js';
    import { sendSms, checkSms, bidDogCard } from '@/api/apply.js'
    export default{
        name: 'stepOneForPerson',
        components:{
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [Toast.name]: Toast,
            MyRadioGroup,
            PhotoForMessage,
            UploadImage
        },
        data(){
            return {
                ynArray,
                fileTypeArray,
                sexArray,
                //获取验证码的两个参数
                sendAuthCode:true,/*布尔值，通过v-show控制显示‘按钮’还是‘倒计时’ */
                auth_time: 0, /*倒计时 计数器*/
                //是否验证通过
                isCheckSms: false,
                showRegionPicker: false,
                regionColumns:[],
                showStreetPicker: false,
                streetColumns: [],
                showCommunityPicker: false,
                communityColumns: [],
                adLoading: false,
                submitData:{
                    userId: null,
                    //个人
                    userType: 0,
                    //新办
                    cardType: 0,
                    //当前步骤
                    currentStep: 1,
                    //是否犬主本人
                    isOwner: 1,
                    //是否备案
                    isRecord: 1,
                    //什么类型证件：1身份证2驾驶证3护照
                    idType: 1,
                    //身份证正面图片路径/驾驶证照片/护照照片
                    idCardFront: '',
                    //身份证反面图片路径
                    idCardBack: '',

                    //犬主名称
                    ownerName: '',
                    //身份证号
                    idCard: '',
                    //护照firstName
                    firstName: '',
                    //护照lastName
                    lastName: '',
                    //国家
                    country: '',
                    //护照号
                    passport: '',
                    //性别
                    sex: 0,
                    //联系电话
                    phone: '',
                    //验证码
                    verificationCode: '',
                    //现居住区县名称
                    region: '',
                    //现居住区县ID
                    regionId: '',
                    //现居住街道名称
                    street: '',
                    //现居住街道ID
                    streetId: '',
                    //现居住社区名称
                    community: '',
                    //现居住社区ID
                    communityId: '',
                    //详细地址
                    address: '',
                    //居住证照片正面
                    residencyProofFront: '',
                    //居住证照片反面
                    residencyProofBack: ''
                }
            }
        },
        mounted(){
            const orderInfo = this.$store.getters['order/orderInfo'];
            Object.keys(this.submitData).forEach(key=>{
                this.submitData[key] = orderInfo[key]
            })
            this.submitData.userId = this.$store.getters['userId'];
            this.getAddressData('3306','1');
            if(this.submitData.regionId){
                this.getAddressData(this.submitData.regionId, '2');
            }
            if(this.submitData.streetId){
                this.getAddressData(this.submitData.streetId, '3');
            }
        },
        watch:{
            'submitData.idType': function(value){
                console.log('watch submitData.isType',value);
                this.submitData.ownerName = '';
                this.submitData.idCard = '';
                this.submitData.idCardFront= '';
                this.submitData.idCardBack= '';
                this.submitData.firstName = '';
                this.submitData.lastName = '';
                this.submitData.country = '';
                this.submitData.passport = '';
                this.submitData.sex = 0;
            },
            'submitData.phone': function(){
                this.submitData.verificationCode = '';
                this.isCheckSms = false;
            }
        },
        methods:{
            getRealValue(attrName,value){
                this.submitData[attrName] = parseInt(value);
            },
            getResultMessage(data){
                let type = data.imageType;
                if(type === 'idCardFront'){
                    this.submitData.ownerName = data.data.name;
                    this.submitData.idCard = data.data.idCardNumber;
                    this.submitData.idCardFront = data.data.imageUrl;
                }
                else if(type === 'idCardBack'){
                    this.submitData.idCardBack = data.data.imageUrl;
                }
                else if(type === 'driverLicense'){
                    this.submitData.ownerName = data.data.name;
                    this.submitData.idCardFront = data.data.imageUrl;
                }
                else{
                    this.submitData.idCardFront = data.data.imageUrl;
                    this.submitData.firstName = data.data.firstName;
                    this.submitData.lastName = data.data.lastName;
                    this.submitData.country = data.data.country;
                    this.submitData.passport = data.data.passportNumber;
                    this.submitData.sex = data.data.sex;
                }
            },
            clearImage(data){
                if(data.imageType === 'idCardBack'){
                    this.submitData.idCardBack = '';
                }
                else{
                    this.submitData.idCardFront = '';
                }
            },
            getResultImage(data){
                this.submitData[data.imageType] = data.url;
            },
            getAuthCode:function () {
                this.sendAuthCode = false;
                if(this.submitData.phone){
                    let params = {
                        userId: this.submitData.userId,
                        phoneNumber: this.submitData.phone
                    }
                    sendSms(params).then( res => {
                        if(res.errno!==0){
                            Toast.fail({message: res.errmsg});
                        }
                    })
                    this.auth_time = 60;
                    var auth_timetimer =  setInterval(()=>{
                        this.auth_time--;
                        if(this.auth_time<=0){
                            this.sendAuthCode = true;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);
                }
                else{
                    Toast('请填写手机号码！');
                }
            },
            checkSms(){
                let params = {
                    userId: this.submitData.userId,
                    phoneNumber: this.submitData.phone,
                    smsCode:  this.submitData.verificationCode
                }
                checkSms(params).then( res => {
                    if(res.errno===0){
                        this.isCheckSms = true;
                    }
                    else{
                        Toast.fail({message: res.errmsg});
                    }
                });
            },
            getAddressData(parentId, type){
                let params = {
                    userId: this.submitData.userId,
                    parentId,
                    type
                }
                this.adLoading = true;
                queryAddressByParentId(params)
                    .then( res => {
                        console.log('res',res)
                        let resultArr = res.data.reduce((acc, cur)=>{
                            let temp = {
                                text: cur.name,
                                id: cur.id
                            }
                            acc.push(temp)
                            return acc
                        },[]);
                        if(type==='1'){
                            this.regionColumns = resultArr;
                            console.log('this.regionColumns',this.regionColumns);
                        }
                        if(type==='2'){
                            this.streetColumns = resultArr;
                            console.log('this.streetColumns',this.streetColumns);
                        }
                        if(type==='3'){
                            this.communityColumns = resultArr;
                            console.log('this.communityColumns',this.communityColumns);
                        }
                        this.adLoading = false;
                    }
                 );
            },
            onRegionConfirm(value){
                console.log(`当前选中值:`,value);
                if(value.id!==this.submitData.regionId) {
                    this.streetColumns = [];
                    this.submitData.street = '';
                    this.communityColumns = [];
                    this.submitData.community = '';
                    this.getAddressData(value.id, '2');
                }
                this.submitData.region = value.text;
                this.submitData.regionId = value.id;
                this.showRegionPicker = false;
            },
            onStreetConfirm(value){
                console.log(`当前选中值：`, value);
                if(value.id!==this.submitData.streetId){
                    this.communityColumns = [];
                    this.submitData.community = '';
                    this.getAddressData(value.id, '3');
                }
                this.submitData.street = value.text;
                this.submitData.streetId = value.id;
                this.showStreetPicker = false;
            },
            onCommunityConfirm(value){
                console.log(`当前选中值：`,value);
                this.submitData.community = value.text;
                this.submitData.communityId = value.id;
                this.showCommunityPicker = false;
            },

            nextStep(){
                console.log('submitData', this.submitData);
                if(this.isCheckSms){
                    bidDogCard(this.submitData).then( res => {
                        console.log(res, res);
                        if(res.errno === 0){
                            this.$store.commit('order/updateOrderInfo', this.submitData);
                            this.$store.commit('order/updateOrderInfo', {dogOrderId: res.data.orderId});
                            this.$router.push('/newApply/stepTwo');
                        }
                        else{
                            Toast.fail({message: res.errmsg,duration: 3000});
                        }
                    });
                }
                else{
                    Toast.fail({message: '短信验证未通过'});
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
.step-one-page{
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
    .sfz-file{
        .upload-item .file-fm_icon{
            @include bg-image("~assets/images/sfz-fm");
        }
    }
    .btn-panel{
        height: 170px;
        width: 100%;
        .next-btn{
            width: 702px;
            height: 80px;
        }
    }
}
</style>
<style lang="scss">
    .step-one-page{
        .van-cell:not(:last-child)::after{
            border-bottom-width: 0px;
        }
        .van-divider{
            margin: 0px;
        }
        .van-divider::after, .van-divider::before{
            height: 2px;
        }
        .mini-line::after, .mini-line::before{
            height: 1px;
        }
        .label-width-200{
            .van-field__label{
                width: 260px;
            }
        }
    }
</style>