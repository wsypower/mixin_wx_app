<template>
    <div class="step-one-page">
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">监管人信息</span>
        </div>
        <van-form>
            <van-field name="radio" label="犬主是否本人：" class="label-width-200">
                <template #input>
                    <my-radio-group :initValue="submitData.isOwner" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isOwner', name)}"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field name="radio" label="是否备案犬证：" class="label-width-200">
                <template #input>
                    <my-radio-group :initValue="submitData.isRecord" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isRecord', name)}"></my-radio-group>
                </template>
            </van-field>
            <div class="warn-note">（备案犬证后，后续您也可以对犬证进行管理）</div>
            <van-divider></van-divider>
            <div class="upload-img sfz-file" flex="dir:left cross:center main:justify">
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">拍摄身份证人像面</div>
                </div>
                <div class="upload-item">
                    <div class="file-fm_icon"></div>
                    <div class="file-zm_text">拍摄身份证反面</div>
                </div>
            </div>
            <van-divider></van-divider>
            <van-field v-model="submitData.ownerName" label="犬主姓名：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.idCard" label="身份证号：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.phone" label="联系电话：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.verificationCode" label="验证码：" placeholder="请输入短信验证码" >
                <template #button>
                    <van-button v-show="sendAuthCode" plain type="info" size="small" @click="getAuthCode">获取验证码</van-button>
                    <van-button v-show="!sendAuthCode" plain type="info" size="small" >{{auth_time}} 秒后重发</van-button>
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
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">上传单位营业执照</div>
                </div>
            </div>
        </van-form>
        <div class="btn-panel" flex="dir:top cross:center main:center">
            <van-button type="info" class="next-btn" @click="nextStep">下一步</van-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker } from 'vant';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
    import { queryAddressByParentId } from '@/api/common.js';
    import { bidDogCard } from '@/api/apply.js'
    export default{
        name: 'stepOneForCompany',
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
                //获取验证码的两个参数
                sendAuthCode:true,/*布尔值，通过v-show控制显示‘按钮’还是‘倒计时’ */
                auth_time: 0, /*倒计时 计数器*/

                showRegionPicker: false,
                regionColumns:[],
                showStreetPicker: false,
                streetColumns: [],
                showCommunityPicker: false,
                communityColumns: [],
                adLoading: false,
                submitData:{
                    userId: null,
                    //单位
                    userType: '1',
                    //新办
                    cardType: '0',
                    //当前步骤
                    currentStep: '1',
                    //是否犬主本人
                    isOwner: '1',
                    //是否备案
                    isRecord: '0',
                    //什么类型证件：1身份证2驾驶证3护照
                    idType: '1',
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
            this.submitData.userId = this.$store.getters['userId'];
            this.getAddressData('3306','1');
        },
        methods:{
            getRealValue(attrName,value){
                this.submitData[attrName] = value;
            },
            getAuthCode:function () {
                this.sendAuthCode = false;
                this.auth_time = 60;
                var auth_timetimer =  setInterval(()=>{
                    this.auth_time--;
                    if(this.auth_time<=0){
                        this.sendAuthCode = true;
                        clearInterval(auth_timetimer);
                    }
                }, 1000);
            },
            getAddressData(parentId, type){
                let params = {
                    userId: 6,
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
                this.submitData.idCardFront = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589368147966&di=6a4bbaf6d6966c45e26f6791fb470471&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171025%2Fe7f95b3b97bf4770b2ac06f22819803c.jpeg';
                this.submitData.idCardBack = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589368126527&di=830749a463a0acc209fc2d51974005ab&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200409%2F94880ee7acde45abb2f13b9d05024279.jpeg';
                this.submitData.businessLicense = 'http://5b0988e595225.cdn.sohucs.com/images/20190222/0f462d915b3f470a86037782f2880b36.jpeg';
                bidDogCard(this.submitData).then( res => {
                    console.log(res, res);
                    if(res.errno === 0){
                        this.$store.commit('apply/updateDogOrderId', res.data.orderId);
                        this.$router.push('/newApply/stepTwo');
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
        .upload-item{
            .file-zm_icon{
                width: 298px;
                height: 222px;
                @include bg-image("~assets/images/file-zm");
                background-size: 100% 100%;
            }
            .file-fm_icon{
                width: 298px;
                height: 222px;
                @include bg-image("~assets/images/jzz-fm");
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