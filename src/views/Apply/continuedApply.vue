<template>
    <div class="continued-step-page">
        <page-header title="犬证续办"></page-header>
        <van-form>
            <van-field v-model="submitData.firstName" label="犬证编号：" placeholder="请输入犬证编号" input-align="right"/>
            <van-divider></van-divider>
            <van-field v-model="submitData.firstName" label="犬证芯片号：" placeholder="请输入芯片号（非必填）" input-align="right"/>
            <van-divider></van-divider>
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
                    class="remark"
                    type="textarea"
                    v-model="submitData.message"
                    rows="4"
                    autosize
                    :border="true"
                    placeholder="请输入备注信息"
            />
        </van-form>
        <div class="btn-panel" flex="dir:left cross:center main:center">
            <van-button type="info" class="btn next-btn" @click="submit">提交</van-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Divider, Form, Field, Button, Popup, Picker } from 'vant';
    import PageHeader from '@/components/pageHeader.vue';
    const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
    export default{
        name: 'stepFour',
        components:{
            PageHeader,
            [Divider.name]: Divider,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,

        },
        data(){
            return {
                ynArray,
                submitData:{
                    isSeal: '1',
                    message: ''
                }
            }
        },
        methods:{
            getRealValue(attrName,value){
                this.submitData[attrName] = value;
            },
            preStep(){

            },
            submit(){
                console.log('submitData', this.submitData);
                // this.$router.push('/applyStep/stepThree');
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
            .next-btn{
                width: 702px;
                height: 80px;
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