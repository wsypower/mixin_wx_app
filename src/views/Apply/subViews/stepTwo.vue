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
                    <my-radio-group :initValue="submitData.sex" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isOwner', name)}" style="width:unset"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field v-model="submitData.dogType" label="宠物品种：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.cityValue"
                    label="出生日期："
                    placeholder="请选择出生日期"
                    @click="showCityPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showCityPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="cityColumns"
                        @confirm="onCityConfirm"
                        @cancel="showCityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.cityValue"
                    label="领养日期："
                    placeholder="请选择领养日期"
                    @click="showCityPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showCityPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="cityColumns"
                        @confirm="onCityConfirm"
                        @cancel="showCityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field name="radio" label="绝育状态：" input-align="right">
                <template #input>
                    <my-radio-group :initValue="submitData.sex" :radioGroup="ynArray" @getRealValue="(name)=>{getRealValue('isOwner', name)}" style="width:unset"></my-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field v-model="submitData.dogType" label="宠物体重：" placeholder="请输入(kg)" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.dogType" label="毛色：" placeholder="请输入颜色" input-align="right"/>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.cityValue"
                    label="犬用途："
                    placeholder="请选择用途"
                    @click="showCityPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showCityPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="cityColumns"
                        @confirm="onCityConfirm"
                        @cancel="showCityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">上传宠物正面照</div>
                </div>
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
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
                    :value="submitData.cityValue"
                    label="免疫地点："
                    placeholder="请选择地点"
                    @click="showCityPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showCityPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="cityColumns"
                        @confirm="onCityConfirm"
                        @cancel="showCityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field v-model="submitData.dogType" label="免疫证编号：" placeholder="请输入编号" input-align="right"/>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.communityValue"
                    label="免疫登记日期"
                    placeholder="请选择日期"
                    @click="showCommunityPicker = true"
                    input-align="right"
                    right-icon="arrow"
            />
            <van-popup v-model="showCommunityPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="communityColumns"
                        @confirm="onCommunityConfirm"
                        @cancel="showCommunityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field v-model="submitData.ownerName" label="详细地址：" placeholder="请填写详细地址" input-align="right"/>
            <van-divider></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">添加免疫证首页</div>
                </div>
                <div class="upload-item">
                    <div class="file-fm_icon"></div>
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
                :value="submitData.communityValue"
                label="办证地点："
                placeholder="请选择意向办证地点"
                @click="showCommunityPicker = true"
                input-align="right"
                right-icon="arrow"
        />
        <van-popup v-model="showCommunityPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="communityColumns"
                    @confirm="onCommunityConfirm"
                    @cancel="showCommunityPicker = false"
            />
        </van-popup>
        <div class="btn-panel" flex="dir:left cross:center main:justify">
            <van-button type="info" class="btn pre-btn" @click="preStep">上一步</van-button>
            <van-button type="info" class="btn next-btn" @click="nextStep">下一步</van-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker } from 'vant';
    import MyRadioGroup from '@/components/myRadioGroup.vue';
    const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
    const fileTypeArray = [{labelName: '身份证',value: '1'},{labelName: '驾驶证',value: '2'},{labelName: '护照',value: '3'}];
    const sexArray = [{labelName: '男',value: '1'},{labelName: '女',value: '0'}];
    export default{
        name: 'stepTwo',
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
                fileTypeArray,
                sexArray,
                showCityPicker: false,
                cityColumns:[
                    {
                        text: '浙江',
                        children: [
                            {
                                text: '杭州',
                                children: [{ text: '西湖区' }, { text: '余杭区' }],
                            },
                            {
                                text: '温州',
                                children: [{ text: '鹿城区' }, { text: '瓯海区' }],
                            },
                        ],
                    },
                    {
                        text: '福建',
                        children: [
                            {
                                text: '福州',
                                children: [{ text: '鼓楼区' }, { text: '台江区' }],
                            },
                            {
                                text: '厦门',
                                children: [{ text: '思明区' }, { text: '海沧区' }],
                            },
                        ],
                    },
                ],
                showStreetPicker: false,
                streetColumns: ['aaa街道', 'bbb街道', 'ccc街道', 'ddd街道', 'eee街道'],
                showCommunityPicker: false,
                communityColumns: ['xxx','yyy'],
                submitData:{
                    isOwner: '1',
                    isBeiAn: '0',
                    fileType: '1',
                    ownerName: '',
                    cardCode: '',
                    firstName: '',
                    lastName: '',
                    country: '',
                    hzcode: '',
                    sex: '1',
                    phone: '',
                    qrCode: '',
                    cityValue: '',
                    streetValue: '',
                    communityValue: ''
                }
            }
        },
        methods:{
            onCityConfirm(value,index){
                console.log(`当前选中值：${value}，它的索引：${index}`);
                this.submitData.cityValue = value.join('-');
                this.showCityPicker = false;
            },
            onStreetConfirm(value,index){
                console.log(`当前选中值：${value}，它的索引：${index}`);
                this.submitData.streetValue = value;
                this.showStreetPicker = false;
            },
            onCommunityConfirm(value,index){
                console.log(`当前选中值：${value}，它的索引：${index}`);
                this.submitData.communityValue = value;
                this.showCommunityPicker = false;
            },
            getRealValue(attrName,value){
                this.submitData[attrName] = value;
            },
            preStep(){

            },
            nextStep(){
                console.log('submitData', this.submitData);
                this.$router.push('/newApply/stepThree');
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
    }
</style>