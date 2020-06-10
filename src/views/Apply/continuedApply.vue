<template>
    <div class="continued-step-page">
        <page-header title="犬证续办"></page-header>
        <van-form>
            <van-field v-model="submitData.dogCardNumber" label="犬证编号：" placeholder="请输入犬证编号" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.chipNumber" label="犬证芯片号：" placeholder="请输入芯片号（非必填）" input-align="right"/>
            <van-divider></van-divider>
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
                    :value="immuneTime"
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
                              :initImageUrl="submitData.immunePhotos"></upload-image>
                <upload-image textValue="添加宠物免疫记录"
                              uploadIconType="3"
                              @changeImage="getResultImage"
                              imageType="immuneRecord"
                              :initImageUrl="submitData.immuneRecord"></upload-image>
            </div>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <upload-image textValue="添加其他材料"
                              uploadIconType="1"
                              @changeImage="getResultImage"
                              imageType="otherPic"
                              :initImageUrl="submitData.otherPic"></upload-image>
            </div>
            <van-divider></van-divider>
            <div class="form-item-label">备注：</div>
            <van-field
                    class="remark"
                    type="textarea"
                    v-model="submitData.remark"
                    rows="4"
                    autosize
                    :border="true"
                    placeholder="请输入备注信息"
            />
        </van-form>
        <div class="btn-panel" flex="dir:left cross:center main:center">
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
    import { Divider, Form, Field, Button, Popup, Picker, DatetimePicker, Toast } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    import UploadImage from './components/uploadImage.vue';
    import { formatDate } from '@/utils/index.js'
    import { queryImmuneSite } from '@/api/common.js'
    import { bidDogCard } from '@/api/apply.js'
    import { queryPidDogCard } from '@/api/process.js'
    export default{
        name: 'continuedApply',
        components:{
            PageHeader,
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            UploadImage
        },
        data(){
            return {
                //展示免疫地点选项
                showImmuneAddressPicker: false,
                immuneAddressColumns: [],
                //免疫登记日期，用于前端显示
                immuneTime: '',
                //显示免疫登记日期选择
                showImmuneTimePicker: false,
                submitData:{
                    userId: '',
                    //续办
                    currentStep: 5,
                    //犬证编号
                    dogCardNumber: '',
                    //犬证芯片号
                    chipNumber: '',
                    //免疫地点
                    immuneAddress: '',
                    //免疫证编号
                    immuneNumber: '',
                    //免疫登记日期
                    immuneTime: null,
                    //免疫证照片
                    immunePhotos: '',
                    //免疫记录照片
                    immuneRecord: '',
                    //其他材料
                    otherPic: '',
                    // 备注
                    remark: ''
                },
                //提交成功后的提示
                showDialog: false
            }
        },
        beforeRouteEnter(to,from,next) {
            console.log('beforeRouteEnter', to, from);
            next(vm => {
                if(to.query.orderId){
                    vm.$store.commit('updateIsLoading', true);
                    let params = {
                        userId : vm.$store.getters['userId'],
                        orderId: to.query.orderId
                    }
                    //获取orderId下的全部数据，然后放入缓存store中
                    queryPidDogCard(params).then( res => {
                        vm.$store.commit('updateIsLoading', false);
                        if(res.errno===0){
                            Object.keys(vm.submitData).forEach(key=>{
                                vm.submitData[key] = res.data[key]
                            })
                            if(res.data.dogOrderId){
                                vm.submitData.dogOrderId = res.data.dogOrderId;
                            }
                            //用于前端显示
                            if( vm.submitData.immuneTime){
                                vm.immuneTime = formatDate(new Date(vm.submitData.immuneTime), 'yyyy-MM-dd');
                            }
                            //防止缓存中的currentStep不正确，故需要在这里重新指向当前步
                            vm.submitData.currentStep = 5;
                            vm.submitData.userId = vm.$store.getters['userId'];
                        }
                        else{
                            Toast('数据获取失败');
                        }
                    });
                }
                if(to.query.dogCardNumber){
                    vm.submitData.dogCardNumber = to.query.dogCardNumber;
                    vm.submitData.chipNumber = to.query.chipNumber;
                }
            })
        },
        mounted(){
            this.submitData.userId = this.$store.getters['userId'];
            let areaCode = this.$store.getters['areaCode'];
            let paramsImmuneSite = {
                userId: this.submitData.userId,
                areaCode,
            }
            //获取免疫点数据
            queryImmuneSite(paramsImmuneSite).then( res => {
                this.immuneAddressColumns = res.data.reduce((acc,item) => {
                    acc.push(item.servicePointName);
                    return acc
                },[]);
            });
        },

        methods:{
            //上传图片
            getResultImage(data){
                this.submitData[data.imageType] = data.url;
            },
            //获取免疫地点
            onImmuneAddressConfirm(value){
                this.submitData.immuneAddress = value;
                this.showImmuneAddressPicker = false;
            },
            //获取免疫登记日期
            onImmuneTimeConfirm(value){
                this.immuneTime = formatDate(value, 'yyyy-MM-dd');
                this.submitData.immuneTime = value.getTime();
                this.showImmuneTimePicker = false;
            },
            //提交
            submit(){
                console.log('submitData', this.submitData);
                let warnMessage = this.checkParams(5);
                if(warnMessage!=='success'){
                    Toast.fail({message: warnMessage,duration: 3000});
                    return
                }
                this.$store.commit('updateIsLoading', true);
                bidDogCard(this.submitData).then( res => {
                    this.$store.commit('updateIsLoading', false);
                    console.log(res, res);
                    if(res.errno === 0){
                        this.showDialog = true;
                        this.$store.commit('order/updateOrderInfo', this.submitData);
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
    .continued-step-page{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding-top: 88px;
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
            .next-btn{
                width: 702px;
                height: 80px;
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
    .continued-step-page{
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
        .remark{
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
    }
</style>