<template>
    <div class="step-two-page">
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">宠物信息</span>
        </div>
        <van-form>
            <van-field v-model="submitData.dogName" label="宠物昵称：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field name="radio" label="宠物性别：" input-align="right">
                <template #input>
                    <my-radio-group :initValue="submitData.dogSex.toString()" :radioGroup="sexArray" @getRealValue="(name)=>{getRealValue('dogSex', name)}" style="width:unset"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field v-model="submitData.breed" label="宠物品种：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="timeObj.birthdate"
                    label="出生日期："
                    placeholder="请选择出生日期"
                    @click="showBirthdatePicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showBirthdatePicker" position="bottom">
                <van-datetime-picker
                        type="date"
                        @confirm="onBirthdateConfirm"
                        @cancel="showBirthdatePicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="timeObj.adoptTime"
                    label="领养日期："
                    placeholder="请选择领养日期"
                    @click="showAdoptTimePicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showAdoptTimePicker" position="bottom">
                <van-datetime-picker
                        type="date"
                        @confirm="onAdoptTimeConfirm"
                        @cancel="showAdoptTimePicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field name="radio" label="绝育状态：" input-align="right">
                <template #input>
                    <my-radio-group :initValue="submitData.isSterilization.toString()" :radioGroup="jyArray" @getRealValue="(name)=>{getRealValue('isSterilization', name)}" style="width:unset"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field v-model="submitData.weight" label="宠物体重：" placeholder="请输入(kg)" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.hairColor" label="毛色：" placeholder="请输入颜色" input-align="right"/>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.purposeName"
                    label="犬用途："
                    placeholder="请选择用途"
                    @click="showPurposePicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showPurposePicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="purposeColumns"
                        @confirm="onPurposeConfirm"
                        @cancel="showPurposePicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <div class="upload-item" >
                    <div class="has-img" v-if="submitData.dogPhotoFront">
                        <img :src="submitData.dogPhotoFront"/>
                        <div class="close_btn" flex="cross:center main:center" @click="clearImage('dogPhotoFront')">X</div>
                    </div>
                    <div class="file-zm_icon" v-else @click="openMethodPanel('dogPhotoFront')"></div>
                    <div class="file-zm_text">上传宠物正面照</div>
                </div>
                <div class="upload-item">
                    <div class="has-img" v-if="submitData.dogPhotoBack">
                        <img :src="submitData.dogPhotoBack"/>
                        <div class="close_btn" flex="cross:center main:center" @click="clearImage('dogPhotoBack')">X</div>
                    </div>
                    <div class="file-zm_icon" v-else @click="openMethodPanel('dogPhotoBack')"></div>
                    <div class="file-zm_text">上传宠物侧面照</div>
                </div>
            </div>
            <van-divider></van-divider>
        </van-form>
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">免疫信息</span>
        </div>
        <van-form>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.immuneAddress"
                    label="免疫地点："
                    placeholder="请选择地点"
                    @click="showImmuneAddressPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showImmuneAddressPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="immuneAddressColumns"
                        @confirm="onImmuneAddressConfirm"
                        @cancel="showImmuneAddressPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field v-model="submitData.immuneNumber" label="免疫证编号：" placeholder="请输入编号" input-align="right"/>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="timeObj.immuneTime"
                    label="免疫登记日期："
                    placeholder="请选择日期"
                    @click="showImmuneTimePicker = true"
                    input-align="right"
                    right-icon="arrow"
                    class="label-width-200"
            />
            <van-popup v-model="showImmuneTimePicker" position="bottom">
                <van-datetime-picker
                        type="date"
                        @confirm="onImmuneTimeConfirm"
                        @cancel="showImmuneTimePicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <div class="upload-item">
                    <div class="has-img" v-if="submitData.immunePhotos">
                        <img :src="submitData.immunePhotos"/>
                        <div class="close_btn" flex="cross:center main:center" @click="clearImage('immunePhotos')">X</div>
                    </div>
                    <div class="file-zm_icon" v-else @click="openMethodPanel('immunePhotos')"></div>
                    <div class="file-zm_text">添加免疫证首页</div>
                </div>
                <div class="upload-item">
                    <div class="has-img" v-if="submitData.immuneRecord">
                        <img :src="submitData.immuneRecord"/>
                        <div class="close_btn" flex="cross:center main:center" @click="clearImage('immuneRecord')">X</div>
                    </div>
                    <div class="file-fm_icon" v-else @click="openMethodPanel('immuneRecord')"></div>
                    <div class="file-zm_text">添加宠物免疫记录</div>
                </div>
            </div>
        </van-form>
        <div class="step-module-header" flex="dir:left cross:center">
            <span class="header-left">办证信息</span>
        </div>
        <van-field
                readonly
                clickable
                name="picker"
                :value="submitData.intentionRegistrationSite"
                label="办证地点："
                placeholder="请选择意向办证地点"
                @click="showSitePicker = true"
                input-align="right"
                right-icon="arrow"
        />
        <van-popup v-model="showSitePicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="siteColumns"
                    @confirm="onSiteConfirm"
                    @cancel="showSitePicker = false"
            />
        </van-popup>
        <div class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn pre-btn" @click="preStep">上一步</van-button>
            <van-button type="info" class="btn next-btn" @click="nextStep">下一步</van-button>
        </div>
        <van-popup v-model="showMethodsPanel" position="bottom">
            <div class="methods-panel" flex="dir:top cross:center">
                <div @click="getImage('pz')">拍照</div>
                <div @click="getImage('photo')">选择图片</div>
            </div>
        </van-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker, DatetimePicker, Toast } from 'vant';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import externalMethods from '@/utils/externalMethods/index.js'
    import { queryImmuneSite } from '@/api/common.js'
    import { queryDogServicePoint } from '@/api/home.js'
    const sexArray = [{labelName: '公',value: '1'},{labelName: '母',value: '0'}];
    const jyArray = [{labelName: '已绝育',value: '1'},{labelName: '未绝育',value: '0'}];
    const purposeColumns = ['观赏犬','导盲犬','看守犬'];
    import { formatDate } from '@/utils/index';
    import { bidDogCard } from '@/api/apply.js'
    export default{
        name: 'stepTwo',
        components:{
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            MyRadioGroup
        },
        data(){
            return {
                sexArray,
                jyArray,
                imageType: '',
                showMethodsPanel: false,

                showBirthdatePicker: false,
                showAdoptTimePicker: false,

                showPurposePicker: false,
                purposeColumns,

                showImmuneAddressPicker: false,
                immuneAddressColumns: ['xxx','yyy'],

                showImmuneTimePicker: false,

                showSitePicker: false,
                siteColumns: ['xxx','yyy'],

                timeObj:{
                    //出生日期
                    birthdate: '',
                    //领养日期
                    adoptTime: '',
                    //免疫登记日期
                    immuneTime:'',
                },
                submitData:{
                    dogOrderId: '',
                    userType: 0,
                    userId: '',
                    //当前步骤
                    currentStep: 2,
                    //手机号码
                    phone: '',
                    //昵称
                    dogName: '',
                    //性别
                    dogSex: 1,
                    //犬品种
                    breed: '',
                    //出生日期
                    birthdate: null,
                    //领养日期
                    adoptTime: null,
                    //是否绝育
                    isSterilization: 0,
                    //体重
                    weight: '',
                    //毛色
                    hairColor: '',
                    //犬用途
                    purposeName: '',
                    purpose: undefined,
                    //犬正面照
                    dogPhotoFront: '',
                    //犬侧面照
                    dogPhotoBack: '',
                    //免疫地点
                    immuneAddress: '',
                    //免疫证编号
                    immuneNumber: '',
                    //免疫登记日期
                    immuneTime: null,
                    //意向地点
                    intentionRegistrationSite: '',
                    //服务点id
                    serviceCode:'',
                    //免疫证照片
                    immunePhotos: '',
                    //免疫记录照片
                    immuneRecord: ''
                }
            }
        },
        mounted(){
            let userId = this.$store.getters['userId'];
            let originLon = this.$store.getters['originLon'];
            let originLat = this.$store.getters['originLat'];
            let params = {
                userId,
                originLon,
                originLat,
                areaCode: '3306'
            }
            queryImmuneSite(params).then( res => {
                this.immuneAddressColumns = res.data;
            })
            queryDogServicePoint(params).then( res => {
                this.siteColumns = res.data.reduce((acc, item) => {
                    let temp = {
                        text: item.servicePointName,
                        id: item.id
                    }
                    acc.push(temp);
                    return acc
                }, []);
            })
        },
        beforeRouteEnter(to,from,next) {
            console.log('beforeRouteEnter', to, from);
            next(vm=>{
                const orderInfo = vm.$store.getters['order/orderInfo'];
                Object.keys(vm.submitData).forEach(key=>{
                    vm.submitData[key] = orderInfo[key]
                })
                vm.submitData.userId = vm.$store.getters['userId'];
                vm.submitData.currentStep = 2;
                console.log('currentStep 2:', vm.submitData)
                if( vm.submitData.birthdate){
                    vm.timeObj.birthdate = formatDate(new Date(vm.submitData.birthdate), 'yyyy-MM-dd');
                }
                if( vm.submitData.adoptTime){
                    vm.timeObj.adoptTime = formatDate(new Date(vm.submitData.adoptTime), 'yyyy-MM-dd');
                }
                if( vm.submitData.immuneTime){
                    vm.timeObj.immuneTime = formatDate(new Date(vm.submitData.immuneTime), 'yyyy-MM-dd');
                }
                vm.submitData.purposeName = purposeColumns[vm.submitData.purpose];
                vm.submitData.dogSex = vm.submitData.dogSex ? vm.submitData.dogSex : 1;
                vm.submitData.isSterilization = vm.submitData.isSterilization ? vm.submitData.isSterilization : 1;
            })
        },
        methods:{
            onBirthdateConfirm(value){
                console.log(`当前选中值：`,value);
                this.timeObj.birthdate  = formatDate(value, 'yyyy-MM-dd');
                this.submitData.birthdate = value.getTime();
                this.showBirthdatePicker = false;
            },
            onAdoptTimeConfirm(value){
                console.log(`当前选中值：`, value);
                this.timeObj.adoptTime = formatDate(value, 'yyyy-MM-dd');
                this.submitData.adoptTime = value.getTime();
                this.showAdoptTimePicker = false;
            },
            onPurposeConfirm(value){
                console.log(`当前选中值：`, value);
                this.submitData.purposeName = value;
                this.submitData.purpose = purposeColumns.findIndex(e => e === value);
                this.showPurposePicker = false;
            },
            onImmuneAddressConfirm(value){
                this.submitData.immuneAddress = value;
                this.showImmuneAddressPicker = false;
            },
            onImmuneTimeConfirm(value){
                this.timeObj.immuneTime = formatDate(value, 'yyyy-MM-dd');
                this.submitData.immuneTime = value.getTime();
                this.showImmuneTimePicker = false;
            },
            onSiteConfirm(value){
                this.submitData.intentionRegistrationSite = value.text;
                this.submitData.serviceCode = value.id;
                this.showSitePicker = false;
            },
            getRealValue(attrName,value){
                this.submitData[attrName] = parseInt(value);
            },
            openMethodPanel(imageType){
                this.imageType = imageType;
                this.showMethodsPanel = true;
            },
            getImage(method){
                this.showMethodsPanel = false;
                externalMethods.getImageUrl(method).then((res)=>{
                    console.log('000000000000000000000',res);
                    this.submitData[this.imageType] = res.pics[0].path;
                }).catch((err)=>{
                    Toast(err);
                })
            },
            clearImage(imageType){
                this.submitData[imageType] = '';
            },
            preStep(){
                //如果在history里面有，则使用缓存数据，没有则去获取数据
                if(this.submitData.userType===0){
                    this.$router.push('/newApply/stepOneForPerson');
                }
                else{
                    this.$router.push('/newApply/stepOneForCompany');
                }

            },
            nextStep(){
                console.log('submitData', this.submitData);
                this.$store.commit('updateIsLoading', true);
                bidDogCard(this.submitData).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    console.log(res, res);
                    if(res.errno === 0){
                        let sData = Object.assign({},this.submitData, { picPath: res.data.picPath});
                        this.$store.commit('order/updateOrderInfo', sData);
                        this.$router.push('/newApply/stepThree');
                    }
                    else{
                        Toast.fail({message: res.errmsg,duration: 3000});
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .step-two-page{
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
                    @include bg-image("~assets/images/myjl");
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
                .has-img{
                    width: 298px;
                    height: 222px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
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
<style lang="scss">
    .step-two-page{
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