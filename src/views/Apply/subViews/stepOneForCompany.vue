<template>
    <div class="step-one-page">
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">监管人信息</span>
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
            <div class="warn-note" v-show="false">（备案犬证后，后续您也可以对犬证进行管理）</div>
            <van-divider v-show="false"></van-divider>
            <div class="upload-img sfz-file" flex="dir:left cross:center main:justify">
                <photo-for-message textValue="拍摄身份证人像面"
                                   uploadIconType="1"
                                   @getMessage="getResultMessage"
                                   imageType="idCardFront"
                                   @clearImage="clearImage"
                                   :initImageUrl="imageList.idCardFront"></photo-for-message>
                <photo-for-message textValue="拍摄身份证反面"
                                   uploadIconType="2"
                                   @getMessage="getResultMessage"
                                   imageType="idCardBack"
                                   @clearImage="clearImage"
                                   :initImageUrl="imageList.idCardBack"></photo-for-message>
            </div>
            <van-divider></van-divider>
            <van-field v-model="submitData.ownerName" label="犬主姓名：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.idCard" label="身份证号：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.phone" label="联系电话：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.verificationCode" label="验证码：" placeholder="请输入短信验证码" @blur="checkSms">
                <template #button>
                    <van-button v-show="sendAuthCode" plain type="info" size="mini" @click="getAuthCode">获取验证码</van-button>
                    <van-button v-show="!sendAuthCode" plain type="info" size="mini" >{{auth_time}} 秒后重发</van-button>
                </template>
            </van-field>
        </van-form>
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">单位信息</span>
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
                <upload-image textValue="上传单位营业执照"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="businessLicense"
                              :initImageUrl="imageList.businessLicense"></upload-image>
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
    import myMixin from '@/utils/mixin.js';
    import { queryAddressByParentId, sendSms, checkSms, queryDogByOwnerIdCard } from '@/api/common.js';
    import { bidDogCard } from '@/api/apply.js'
    export default{
        name: 'stepOneForCompany',
        components:{
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            MyRadioGroup,
            UploadImage,
            PhotoForMessage
        },
        mixins: [myMixin],
        data(){
            return {
                //获取验证码的两个参数
                sendAuthCode:true,/*布尔值，通过v-show控制显示‘按钮’还是‘倒计时’ */
                auth_time: 60, /*倒计时 计数器*/
                //是否验证通过
                isCheckSms: false,
                ///出现区县选择区域
                showRegionPicker: false,
                regionColumns:[],
                //出现街道选择区域
                showStreetPicker: false,
                streetColumns: [],
                //出现社区选择区域
                showCommunityPicker: false,
                communityColumns: [],
                //加载区域数据动效
                adLoading: false,
                //用于前端显示用
                imageList:{
                    idCardFront: '',
                    idCardBack: '',
                    businessLicense:''
                },
                submitData:{
                    userId: null,
                    // 图片上传的IP以及端口
                    imgHost: '',
                    //单位
                    userType: 1,
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
                    //身份证正面图片路径
                    idCardFront: '',
                    //身份证反面图片路径
                    idCardBack: '',
                    //犬主姓名
                    ownerName: '',
                    //身份证号码
                    idCard: '',
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
                    //单位营业执照照片
                    businessLicense: ''
                }
            }
        },
        mounted(){
            //从缓存中读入素有orderInfo数据，适用于新建与编辑
            const orderInfo = this.$store.getters['order/orderInfo'];
            Object.keys(this.submitData).forEach(key=>{
                this.submitData[key] = orderInfo[key]
            });
            if(this.submitData.idCardFront) {
                this.imageList.idCardFront = this.submitData.imgHost + this.submitData.idCardFront;
            }
            if(this.submitData.idCardBack) {
                this.imageList.idCardBack = this.submitData.imgHost + this.submitData.idCardBack;
            }
            if(this.submitData.businessLicense) {
                this.imageList.businessLicense = this.submitData.imgHost + this.submitData.businessLicense;
            }

            if(orderInfo.dogOrderId){
                this.submitData.dogOrderId = orderInfo.dogOrderId;
            }
            this.submitData.userType = 1;
            //当前步骤为第一步，为防万一，设定一下
            this.submitData.currentStep = 1;
            this.submitData.userId = this.$store.getters['userId'];
            this.getAddressData('3306','1');
            //编辑时，根据已有的区县Id获取街道选项数据
            if(this.submitData.regionId){
                this.getAddressData(this.submitData.regionId, '2');
            }
            //编辑时，根据已有的街道Id获取社区选项数据
            if(this.submitData.streetId){
                this.getAddressData(this.submitData.streetId, '3');
            }
        },
        watch:{
            //当手机号码改变时，清理与验证码相关的数据
            'submitData.phone': function(){
                this.submitData.verificationCode = '';
                this.isCheckSms = false;
            }
        },
        methods:{
            //单选实际值
            getRealValue(attrName,value){
                this.submitData[attrName] = parseInt(value);
            },
            //身份证正面、反面拍照识别信息后返回获取相应的值
            getResultMessage(data){
                let type = data.imageType;
                if(type === 'idCardFront'){
                    this.submitData.ownerName = data.data.name;
                    this.submitData.idCard = data.data.idCardNumber;
                    this.submitData.idCardFront = data.data.originPath;
                    this.imageList.idCardFront = data.data.imageUrl;
                }
                else if(type === 'idCardBack'){
                    this.submitData.idCardBack = data.data.originPath;
                    this.imageList.idCardBack = data.data.imageUrl;
                }
            },
            //删除照片
            clearImage(data){
                if(data.imageType === 'idCardBack'){
                    this.submitData.idCardBack = '';
                    this.imageList.idCardBack = '';
                }
                else{
                    this.submitData.idCardFront = '';
                    this.imageList.idCardFront = '';
                }
            },
            //图片上传
            getResultImage(data){
                this.submitData[data.imageType] = data.url;
                this.imageList[data.imageType] = data.imgUrl;
            },
            //获取手机验证码，60s之后可再次请求
            getAuthCode:function () {
                if(this.submitData.phone){
                    this.sendAuthCode = false;
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
            //检查验证码是否正确
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
            //获取区域信息
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
            //选中区县后赋值以及获取街道选项信息
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
            //选中街道后赋值以及获取社区选项信息
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
            //选中社区后赋值
            onCommunityConfirm(value){
                console.log(`当前选中值：`,value);
                this.submitData.community = value.text;
                this.submitData.communityId = value.id;
                this.showCommunityPicker = false;
            },
            //第一步数据提交：1、检查身份证是否已有犬只绑定；2、检查验证码是否通过；
            nextStep(){
                console.log('submitData', this.submitData);
                let warnMessage = this.checkParams(1);
                if(warnMessage!=='success'){
                    Toast.fail({message: warnMessage,duration: 3000});
                    return
                }
                let params = {
                    userId: this.submitData.userId,
                    idCard: this.submitData.idCard
                }
                queryDogByOwnerIdCard(params).then(res => {
                    if (res.errno === 0) {
                        //验证码判断
                        if (this.isCheckSms) {
                            this.$store.commit('updateIsLoading', true);
                            bidDogCard(this.submitData).then(res => {
                                this.$store.commit('updateIsLoading', false);
                                console.log(res, res);
                                if (res.errno === 0) {
                                    this.$store.commit('order/updateOrderInfo', {dogOrderId: res.data.orderId});
                                    this.$store.commit('order/updateOrderInfo', this.submitData);
                                    this.$router.push('/newApply/stepTwo');
                                }
                                else {
                                    Toast.fail({message: res.errmsg, duration: 3000});
                                }
                            });
                        }
                        else {
                            Toast.fail({message: '短信验证未通过'});
                        }
                    }
                    else {
                        Toast.fail({message: '该身份证下已有犬只', duration: 3000});
                    }
                });
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
        .van-button--mini{
            width: 140px;
        }
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