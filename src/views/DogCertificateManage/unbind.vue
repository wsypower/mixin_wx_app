<template>
    <div class="unbind-page">
        <page-header title="犬证注销"></page-header>
        <div class="unbind-page-main" flex="dir:top main:justify">
            <van-form>
                <van-field v-model="submitData.phone" label="手机号码：" placeholder="请输入内容" input-align="right" readonly/>
                <van-field v-model="submitData.verificationCode" label="验证码：" placeholder="请输入短信验证码" @blur="checkSms">
                    <template #button>
                        <van-button v-show="sendAuthCode" plain type="info" size="mini" @click="getAuthCode">获取验证码</van-button>
                        <van-button v-show="!sendAuthCode" plain type="info" size="mini" >{{auth_time}} 秒后重发</van-button>
                    </template>
                </van-field>
                <div class="sep"></div>
                <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="submitData.cancelReason"
                        label="注册原因："
                        placeholder="死亡/其他"
                        @click="showReasonPicker = true"
                        input-align="right"
                        right-icon="arrow"
                />
                <van-popup v-model="showReasonPicker" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="ReasonColumns"
                            @confirm="onReasonConfirm"
                            @cancel="showReasonPicker = false"
                    />
                </van-popup>
                <div class="sep"></div>
                <div class="form-item-label">备注：</div>
                <van-field
                        class="textarea-c"
                        type="textarea"
                        v-model="submitData.remark"
                        rows="4"
                        autosize
                        :border="true"
                        placeholder="请输入备注信息"
                />
            </van-form>
            <div class="btn-panel" flex="dir:top cross:center main:center">
                <van-button type="info" class="btn" @click="unbindSubmit">提交</van-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Form, Field, Button, Popup, Picker, Toast } from 'vant';
    import PageHeader from '@/components/pageHeader.vue'
    import { sendSms, checkSms} from '@/api/common.js';
    import { dogCardCancelApply } from '@/api/dogManage.js'
    export default {
        name: 'unbind',
        components: {
            PageHeader,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [Toast.name]: Toast
        },
        data(){
            return {
                auth_time: 60,
                sendAuthCode: true,
                isCheckSms: false,
                showReasonPicker: false,
                ReasonColumns: ['死亡','其他'],
                submitData:{
                    userId: '',
                    phone: '',
                    verificationCode: '',
                    dogCardId: '',
                    cancelReason: '',
                    remark: ''
                }
            }
        },
        mounted(){
            this.submitData.userId = this.$store.getters['userId'];
            this.submitData.phone = this.$store.getters['dog/dogInfo'].phone;
            this.submitData.dogCardId = this.$store.getters['dog/dogInfo'].dogId;
        },
        methods:{
            //获取手机验证码，60s之后可再次请求
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
                    });
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
            onReasonConfirm(value){
                console.log(`当前选中值：`, value);
                this.submitData.cancelReason = value;
                //this.submitData.reason = this.ReasonColumns.findIndex(e => e === value);
                this.showReasonPicker = false;
            },
            unbindSubmit(){
                console.log('unbindSubmit', this.submitData)
                if( this.isCheckSms){
                    dogCardCancelApply(this.submitData).then( res => {
                        console.log(res, res);
                        if(res.errno === 0){
                            Toast.success({message: '注销成功'});
                            this.$router.push('/');
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
  .unbind-page{
      width: 100%;
      height: 100%;
      padding-top: 88px;
      background-color: #f5f5f5;
      &-main{
          .sep{
              width: 100%;
              height: 2px;
              background-color: #f5f5f5;
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
              padding: 0px 24px;
              .btn{
                  width: 100%;
                  height: 80px;
              }
          }
      }
  }
</style>
<style lang="scss">
   .unbind-page{
       .van-button--mini{
           width: 160px;
       }
       .textarea-c.van-cell{
           padding-top: 0px;
           padding-bottom: 40px;
       }
       .van-cell__value--alone{
           border-radius: 10px;
           border: solid 2px #dfdfdf;
       }
       .textarea-c .van-field__body{
           padding: 10px;
       }
   }
</style>