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
                    <my-radio-group :initValue="submitData.dogSex.toString()" :radioGroup="animalSexArray" @getRealValue="(name)=>{getRealValue('dogSex', name)}" style="width:unset"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <!--<van-field v-model="submitData.breed" label="宠物品种：" placeholder="请输入" input-align="right"/>-->
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.breed"
                    label="宠物品种："
                    placeholder="请选择品种"
                    @click="showBreedPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showBreedPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="breedColumns"
                        @confirm="onBreedConfirm"
                        @cancel="showBreedPicker = false"
                />
            </van-popup>
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
                <upload-image textValue="上传宠物正面照"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="dogPhotoFront"
                              :initImageUrl="imageList.dogPhotoFront"></upload-image>
                <upload-image textValue="上传宠物侧面照"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="dogPhotoBack"
                              :initImageUrl="imageList.dogPhotoBack"></upload-image>
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
<!--            <van-field v-model="submitData.immuneNumber" label="免疫证编号：" placeholder="请输入编号" input-align="right"/>-->
<!--            <van-divider></van-divider>-->
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
                <upload-image textValue="添加免疫证首页"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="immunePhotos"
                              :initImageUrl="imageList.immunePhotos"></upload-image>
                <upload-image textValue="添加宠物免疫记录"
                              uploadIconType="3"
                              @changeImage="getResultImage"
                              imageType="immuneRecord"
                              :initImageUrl="imageList.immuneRecord"></upload-image>
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
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker, DatetimePicker, Toast } from 'vant';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    import UploadImage from '../components/uploadImage.vue';
    import { formatDate } from '@/utils/index';
    import { queryImmuneSite, queryDogType, queryDogByOwnerIdCard } from '@/api/common.js'
    import { queryDogServicePoint } from '@/api/home.js'
    import { bidDogCard } from '@/api/apply.js'
    import myMixin from '@/utils/mixin.js'
    const purposeColumns = ['观赏犬','导盲犬','看守犬'];
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
            MyRadioGroup,
            UploadImage
        },
        mixins: [myMixin],
        data(){
            return {
                // 所有区县的集合
                cityData:[
                    {
                        name: '越城区',
                        code: '330602',
                        latitude: '29.98895',
                        longitude: '120.5819'
                    },
                    {
                        name: '柯桥区',
                        code: '330603',
                        latitude: '30.08763',
                        longitude: '120.492736'
                    },
                    {
                        name: '上虞区',
                        code: '330604',
                        latitude: '30.078038',
                        longitude: '120.476075'
                    },
                    {
                        name: '诸暨市',
                        code: '330681',
                        latitude: '29.71358',
                        longitude: '120.23629'
                    },
                    {
                        name: '嵊州市',
                        code: '330683',
                        latitude: '29.58854',
                        longitude: '120.82174'
                    },
                    {
                        name: '新昌县',
                        code: '330624',
                        latitude: '29.49991',
                        longitude: '120.90435'
                    }
                ],
                //展示时间选择（出生日期、领养日期、免疫登记日期）
                showBirthdatePicker: false,
                showAdoptTimePicker: false,
                showImmuneTimePicker: false,
                //宠物品种
                showBreedPicker: false,
                breedColumns: [],
                //展示犬用途弹窗
                showPurposePicker: false,
                purposeColumns,
                //免疫地点选择
                showImmuneAddressPicker: false,
                immuneAddressColumns: [],
                //意向办证点选择
                showSitePicker: false,
                siteColumns: [],
                //前端显示与后端需要的数据存在格式上的不同，故此字段用于前端显示
                timeObj:{
                    //出生日期
                    birthdate: '',
                    //领养日期
                    adoptTime: '',
                    //免疫登记日期
                    immuneTime:'',
                },
                //用于前端显示用
                imageList:{
                    dogPhotoFront: '',
                    dogPhotoBack: '',
                    immunePhotos: '',
                    immuneRecord: ''
                },
                submitData:{
                    dogOrderId: '',
                    // 图片上传的IP以及端口
                    imgHost: '',
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
                    isSterilization: 2,
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
            //获取免疫点数据：免疫地点不受区县的限制，所以areaCode传空代表查询全部数据
            let paramsImmuneSite = {
                userId,
                areaCode: ''
            }
            queryImmuneSite(paramsImmuneSite).then( res => {
                this.immuneAddressColumns = res.data.reduce((acc,item) => {
                    acc.push(item.servicePointName);
                    return acc
                },[]);
            });
            //获取犬类数据
            queryDogType().then( res => {
                this.breedColumns = res.data.reduce((acc,item) => {
                    acc.push(item.name);
                    return acc
                },[]);
            });
            //获取意向点数据：数据范围根据现居住地改变
            let region = this.$store.getters['order/orderInfo'].region;
            let city = this.cityData.find(item => item.name===region);
            let paramsService = {
                userId,
                originLon: city.longitude,
                originLat: city.latitude,
                areaCode: city.code,
                currentPage: -1,
                pageSize: -1
            }
            queryDogServicePoint(paramsService).then( res => {
                this.siteColumns = res.data.reduce((acc, item) => {
                    let temp = {
                        text: item.servicePointName,
                        id: item.serviceCode
                    }
                    acc.push(temp);
                    return acc
                }, []);
            })
        },
        beforeRouteEnter(to,from,next) {
            console.log('beforeRouteEnter', to, from);
            next(vm=>{
                //从缓存中读入素有orderInfo数据，适用于新建与编辑
                const orderInfo = vm.$store.getters['order/orderInfo'];
                Object.keys(vm.submitData).forEach(key=>{
                    vm.submitData[key] = orderInfo[key]
                })
                if(vm.submitData.dogPhotoFront){
                    vm.imageList.dogPhotoFront = vm.submitData.imgHost + vm.submitData.dogPhotoFront;
                }
                if(vm.submitData.dogPhotoBack) {
                    vm.imageList.dogPhotoBack = vm.submitData.imgHost + vm.submitData.dogPhotoBack;
                }
                if(vm.submitData.immunePhotos) {
                    vm.imageList.immunePhotos = vm.submitData.imgHost + vm.submitData.immunePhotos;
                }
                if(vm.submitData.immuneRecord) {
                    vm.imageList.immuneRecord = vm.submitData.imgHost + vm.submitData.immuneRecord;
                }

                vm.submitData.userId = vm.$store.getters['userId'];
                //在缓存中的currentStep是当时提交之后的下一步，故需要在这里重新指向当前步
                vm.submitData.currentStep = 2;
                console.log('currentStep 2:', vm.submitData)
                //有出生日期时，进行格式转化，用于前端显示
                if( vm.submitData.birthdate){
                    vm.timeObj.birthdate = formatDate(new Date(vm.submitData.birthdate), 'yyyy-MM-dd');
                }
                //有领养日期时，进行格式转化，用于前端显示
                if( vm.submitData.adoptTime){
                    vm.timeObj.adoptTime = formatDate(new Date(vm.submitData.adoptTime), 'yyyy-MM-dd');
                }
                //有免疫登记日期时，进行格式转化，用于前端显示
                if( vm.submitData.immuneTime){
                    vm.timeObj.immuneTime = formatDate(new Date(vm.submitData.immuneTime), 'yyyy-MM-dd');
                }
                //获取犬用途，用于前端显示
                vm.submitData.purposeName = purposeColumns[vm.submitData.purpose];
                //设置性别默认值
                vm.submitData.dogSex = vm.submitData.dogSex ? vm.submitData.dogSex : 1;
                //设置是否绝育默认值
                vm.submitData.isSterilization = vm.submitData.isSterilization ? vm.submitData.isSterilization : 2;
            })
        },
        methods:{
            //获取出生日期
            onBirthdateConfirm(value){
                console.log(`当前选中值：`,value);
                this.timeObj.birthdate  = formatDate(value, 'yyyy-MM-dd');
                this.submitData.birthdate = value.getTime();
                this.showBirthdatePicker = false;
            },
            //获取领养日期
            onAdoptTimeConfirm(value){
                console.log(`当前选中值：`, value);
                this.timeObj.adoptTime = formatDate(value, 'yyyy-MM-dd');
                this.submitData.adoptTime = value.getTime();
                this.showAdoptTimePicker = false;
            },
            //获取犬品种
            onBreedConfirm(value){
                this.submitData.breed = value;
                this.showBreedPicker = false;
            },
            //获取犬用途
            onPurposeConfirm(value){
                console.log(`当前选中值：`, value);
                this.submitData.purposeName = value;
                this.submitData.purpose = purposeColumns.findIndex(e => e === value);
                this.showPurposePicker = false;
            },
            //获取免疫地点
            onImmuneAddressConfirm(value){
                this.submitData.immuneAddress = value;
                this.showImmuneAddressPicker = false;
            },
            //获取免疫登记日期
            onImmuneTimeConfirm(value){
                this.timeObj.immuneTime = formatDate(value, 'yyyy-MM-dd');
                this.submitData.immuneTime = value.getTime();
                this.showImmuneTimePicker = false;
            },
            //获取办证意向地点
            onSiteConfirm(value){
                this.submitData.intentionRegistrationSite = value.text;
                this.submitData.serviceCode = value.id;
                this.showSitePicker = false;
            },
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
                //如果是个人，则跳转到个人的第一步，否则进入单位的第一步
                if(this.submitData.userType===0){
                    this.$router.push('/newApply/stepOneForPerson');
                }
                else{
                    this.$router.push('/newApply/stepOneForCompany');
                }
            },
            //提交进入下一步
            nextStep() {
                console.log('submitData', this.submitData);
                let warnMessage = this.checkParams(2);
                if (warnMessage !== 'success') {
                    Toast.fail({message: warnMessage, duration: 3000});
                    return
                }
                this.$store.commit('updateIsLoading', true);
                //身份证判断
                let params = {
                    userId: this.submitData.userId,
                    idType: this.$store.getters['order/orderInfo'].idType,
                    idCard: this.$store.getters['order/orderInfo'].idCard || this.$store.getters['order/orderInfo'].passport,
                    phone: this.submitData.phone
                }
                queryDogByOwnerIdCard(params).then(res => {
                    if (res.errno === 0) {
                        bidDogCard(this.submitData).then(res => {
                            this.$store.commit('updateIsLoading', false);
                            console.log(res, res);
                            if (res.errno === 0) {
                                //pdf地址是提交成功之后生成的，所以需要额外引入
                                let sData = Object.assign({}, this.submitData, {picPath: res.data.picPath});
                                this.$store.commit('order/updateOrderInfo', sData);
                                this.$router.push('/newApply/stepThree');
                            } else {
                                Toast.fail({message: res.errmsg, duration: 3000});
                            }
                        });
                    } else {
                        this.$store.commit('updateIsLoading', false);
                        Toast.fail({message: res.errmsg, duration: 3000});
                    }
                })
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