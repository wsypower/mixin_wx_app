<template>
    <div class="step-one-page">
        <div class="step-one-page-header" flex="dir:left cross:center">
            <span class="header-left">基本信息</span>
        </div>
        <van-form>
            <van-field name="radio" label="犬主是否本人：">
                <template #input>
                    <van-radio-group v-model="submitData.isOwner" direction="horizontal">
                        <van-radio name="1">是</van-radio>
                        <van-radio name="0">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field name="radio" label="是否备案犬证：">
                <template #input>
                    <van-radio-group v-model="submitData.isBeiAn" direction="horizontal">
                        <van-radio name="1">是</van-radio>
                        <van-radio name="0">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <div class="warn-note">（备案犬证后，后续您也可以对犬证进行管理）</div>
            <van-divider></van-divider>
            <van-field name="radio" label="证件类型：">
                <template #input>
                    <van-radio-group v-model="submitData.fileType" direction="horizontal">
                        <van-radio name="1">身份证</van-radio>
                        <van-radio name="2">驾驶证</van-radio>
                        <van-radio name="3">护照</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-divider></van-divider>
            <van-field v-model="submitData.ownerName" label="犬主姓名：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.cardCode" label="身份证号：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.phone" label="联系电话：" placeholder="请输入" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.qrCode" label="验证码：" placeholder="请输入短信验证码" >
                <template #button>
                    <van-button plain type="info" size="small">获取验证码</van-button>
                </template>
            </van-field>
        </van-form>
        <div class="step-one-page-header" flex="dir:left cross:center">
            <span class="header-left">居住信息</span>
        </div>
        <van-form>
            <van-field
                readonly
                clickable
                name="picker"
                :value="submitData.cityValue"
                label="现居住区县"
                placeholder="请选择区县"
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
                    :value="submitData.streetValue"
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
                        @cancel="showStreetPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="submitData.communityValue"
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
                        @cancel="showCommunityPicker = false"
                />
            </van-popup>
            <van-divider></van-divider>
            <van-field v-model="submitData.ownerName" label="详细地址：" placeholder="请填写详细地址" input-align="right"/>
            <van-divider></van-divider>
            <div class="upload-img" flex="dir:left cross:center main:justify">
                <div class="upload-item">
                    <div class="file-zm_icon"></div>
                    <div class="file-zm_text">上传居住证明</div>
                </div>
                <div class="upload-item">
                    <div class="file-fm_icon"></div>
                    <div class="file-zm_text">上传居住证明</div>
                </div>
            </div>
        </van-form>
        <div class="btn-panel" flex="dir:top cross:center main:center">
            <van-button type="info" class="next-btn">下一步</van-button>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, RadioGroup, Radio, Button, Popup, Picker } from 'vant';
    export default{
        name: 'stepOne',
        components:{
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup
        },
        data(){
            return {
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
            }
        }
    }
</script>
<style lang="scss" scoped>
.step-one-page{
    width: 100%;
    height: 100%;
    .step-one-page-header{
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
                font-family: PingFangSC-Regular;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 23px;
                letter-spacing: 0px;
                color: #666666;
            }
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
    .van-cell:not(:last-child)::after{
        border-bottom-width: 0px;
    }
    .van-divider{
        margin: 0px;
    }
    .van-divider::after, .van-divider::before{
        height: 2px;
    }
</style>