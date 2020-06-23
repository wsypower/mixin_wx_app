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
            <div class="warn-note" v-show="false">（备案犬证后，后续您也可以对犬证进行管理）</div>
            <van-divider v-show="false"></van-divider>
            <van-field name="radio" label="证件类型：">
                <template #input>
                    <my-radio-group :initValue="submitData.idType.toString()" :radioGroup="fileTypeArray" @getRealValue="(name)=>{getRealValue('idType', name)}"></my-radio-group>
                </template>
            </van-field>
            <van-divider class="mini-line"></van-divider>
            <div v-show="submitData.idType === 1">
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
                <van-field name="radio" label="性别：" input-align="right">
                    <template #input>
                        <my-radio-group :initValue="submitData.sex.toString()" :radioGroup="sexArray" @getRealValue="(name)=>{getRealValue('sex', name)}" style="width:unset"></my-radio-group>
                    </template>
                </van-field>
            </div>
            <div v-show="submitData.idType === 2">
                <div class="upload-img" flex="dir:left cross:center main:justify">
                    <photo-for-message textValue="拍摄证件照片像面"
                                       uploadIconType="1"
                                       @getMessage="getResultMessage"
                                       imageType="driverLicense"
                                       @clearImage="clearImage"
                                       :initImageUrl="imageList.idCardFront"></photo-for-message>
                </div>
                <van-divider></van-divider>
                <van-field v-model="submitData.ownerName" label="犬主姓名：" placeholder="请输入" input-align="right"/>
                <van-divider></van-divider>
                <van-field v-model="submitData.idCard" label="身份证号：" placeholder="请输入" input-align="right"/>
                <van-divider></van-divider>
                <van-field name="radio" label="性别：" input-align="right">
                    <template #input>
                        <my-radio-group :initValue="submitData.sex.toString()" :radioGroup="sexArray" @getRealValue="(name)=>{getRealValue('sex', name)}" style="width:unset"></my-radio-group>
                    </template>
                </van-field>
            </div>
            <div v-show="submitData.idType === 3">
                <div class="upload-img" flex="dir:left cross:center main:justify">
                    <photo-for-message textValue="拍摄证件照片像面"
                                       uploadIconType="1"
                                       @getMessage="getResultMessage"
                                       imageType="passport"
                                       @clearImage="clearImage"
                                       :initImageUrl="imageList.idCardFront"></photo-for-message>
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
            </div>
            <van-divider></van-divider>
            <van-field v-model="submitData.phone" type="number" label="联系电话：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.verificationCode" label="验证码：" placeholder="请输入短信验证码" @blur="checkSms">
                <template #button>
                    <van-button v-show="sendAuthCode" plain type="info" size="mini" @click="getAuthCode">获取验证码</van-button>
                    <van-button v-show="!sendAuthCode" plain type="info" size="mini" >{{auth_time}} 秒后重发</van-button>
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
                <upload-image textValue="上传居住证明"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="residencyProofFront"
                              :initImageUrl="imageList.residencyProofFront"></upload-image>
                <upload-image textValue="上传居住证明"
                              uploadIconType="2"
                              @changeImage="getResultImage"
                              imageType="residencyProofBack"
                              :initImageUrl="imageList.residencyProofBack"></upload-image>
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
    import { bidDogCard } from '@/api/apply.js';
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
        mixins: [myMixin],
        data(){
            return {
                //获取验证码的两个参数
                sendAuthCode:true,/*布尔值，通过v-show控制显示‘按钮’还是‘倒计时’ */
                auth_time: 60, /*倒计时 计数器*/
                //是否验证通过
                isCheckSms: false,
                //出现区县选择区域
                showRegionPicker: false,
                regionColumns:[],
                //出现街道选择区域
                showStreetPicker: false,
                streetColumns: [],
                //出现社区选择区域
                showCommunityPicker: false,
                communityColumns: [],
                //第一次进来时证件类型修改不会触发watch内部的操作
                isEditInit: false,
                //选择项数据加载
                adLoading: false,
                //用于前端显示用
                imageList:{
                    idCardFront: '',
                    idCardBack: '',
                    residencyProofFront: '',
                    residencyProofBack: ''
                },
                submitData:{
                    userId: null,
                    // 图片上传的IP以及端口
                    imgHost: '',
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
            //从缓存中读入所有orderInfo数据，适用于新建与编辑
            const orderInfo = this.$store.getters['order/orderInfo'];
            console.log('orderInfo', orderInfo);
            Object.keys(this.submitData).forEach(key=>{
                this.submitData[key] = orderInfo[key]
            })
            if(this.submitData.idCardFront){
                this.imageList.idCardFront = this.submitData.imgHost + this.submitData.idCardFront;
            }
            if(this.submitData.idCardBack) {
                this.imageList.idCardBack = this.submitData.imgHost + this.submitData.idCardBack;
            }
            if(this.submitData.residencyProofFront) {
                this.imageList.residencyProofFront = this.submitData.imgHost + this.submitData.residencyProofFront;
            }
            if(this.submitData.residencyProofBack) {
                this.imageList.residencyProofBack = this.submitData.imgHost + this.submitData.residencyProofBack;
            }

            if(this.submitData.idType!==1){
                this.isEditInit = true;
            }
            if(orderInfo.dogOrderId){
                this.submitData.dogOrderId = orderInfo.dogOrderId;
            }
            this.submitData.userType = 0;
            //当前步骤为第一步，为防万一，设定一下
            this.submitData.currentStep = 1;
            this.submitData.userId = this.$store.getters['userId'];
            //当前步骤为第一步，为防万一，设定一下
            this.submitData.currentStep = 1;
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
            //当证件类型改变时，清理与证件相关的所有数据
            'submitData.idType': function(value){
                console.log('watch submitData.isType',value);
                if(!this.isEditInit){
                    this.submitData.ownerName = '';
                    this.submitData.idCard = '';
                    this.submitData.idCardFront= '';
                    this.submitData.idCardBack= '';
                    this.submitData.firstName = '';
                    this.submitData.lastName = '';
                    this.submitData.country = '';
                    this.submitData.passport = '';
                    this.submitData.sex = 0;
                }
                else{
                    this.isEditInit = false;
                }

            },
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
            //身份证正面、反面、驾驶证、护照拍照识别信息后返回获取相应的值
            getResultMessage(data){
                let type = data.imageType;
                if(type === 'idCardFront'){
                    this.submitData.ownerName = data.data.name;
                    this.submitData.idCard = data.data.idCardNumber;
                    this.submitData.idCardFront = data.data.originPath;
                    this.submitData.sex = data.data.sex;
                    this.imageList.idCardFront = data.data.imageUrl;
                }
                else if(type === 'idCardBack'){
                    this.submitData.idCardBack = data.data.originPath;
                    this.imageList.idCardBack = data.data.imageUrl;
                }
                else if(type === 'driverLicense'){
                    this.submitData.ownerName = data.data.name;
                    this.submitData.idCard = data.data.idCardNumber;
                    this.submitData.idCardFront = data.data.originPath;
                    this.submitData.sex = data.data.sex;
                    this.imageList.idCardFront = data.data.imageUrl;
                }
                else{
                    this.submitData.idCardFront = data.data.originPath;
                    this.submitData.firstName = data.data.firstName;
                    this.submitData.lastName = data.data.lastName;
                    this.submitData.country = data.data.country;
                    this.submitData.passport = data.data.passportNumber;
                    this.submitData.sex = data.data.sex;
                    this.imageList.idCardFront = data.data.imageUrl;
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
                if(this.submitData.idType===3&&this.submitData.country==='CHN'){
                    Toast.fail({message: '中国籍人员请使用身份证申请',duration: 3000});
                    return
                }
                let warnMessage = this.checkParams(1);
                if(warnMessage!=='success'){
                    Toast.fail({message: warnMessage,duration: 3000});
                    return
                }
                //身份证判断
                let params = {
                    userId: this.submitData.userId,
                    idCard: this.submitData.idCard||this.submitData.passport
                }
                //新办时得到imgHost
                let imgHost = this.imageList.idCardFront.split(this.submitData.idCardFront)[0];
                queryDogByOwnerIdCard(params).then(res => {
                    if(res.errno===0){
                        //验证码判断
                        if(this.isCheckSms){
                            this.$store.commit('updateIsLoading', true);
                            bidDogCard(this.submitData).then( res => {
                                this.$store.commit('updateIsLoading', false);
                                console.log(res, res);
                                if(res.errno === 0){
                                    this.submitData.imgHost = imgHost;
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
                    else{
                        Toast.fail({message: res.errmsg,duration: 3000});
                        // if(this.submitData.idType!==3){
                        //     Toast.fail({message: '该身份证下已有犬只',duration: 3000});
                        // }
                        // else{
                        //     Toast.fail({message: '该护照号下已有犬只',duration: 3000});
                        // }

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