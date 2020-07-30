const typeArray = [{labelName: '个人',value:'0'},{labelName: '单位',value:'1'}];
const methodArray = [{labelName: '新办',value:'0'},{labelName: '续办',value:'1'}];
const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
const fileTypeArray = [{labelName: '身份证',value: '1'},{labelName: '驾驶证',value: '2'},{labelName: '护照',value: '3'}];
const sexArray = [{labelName: '男',value: '1'},{labelName: '女',value: '0'}];
const animalSexArray = [{labelName: '公',value: '1'},{labelName: '母',value: '0'}];
const jyArray = [{labelName: '已绝育',value: '1'},{labelName: '未绝育',value: '0'}];
const mixin = {
    data: function () {
        return {
            typeArray,
            methodArray,
            ynArray,
            fileTypeArray,
            sexArray,
            animalSexArray,
            jyArray
        }
    },
    methods:{
        checkParams(currentStep){
            if(currentStep===1){
                return this.checkFirstStep();
            }
            else if(currentStep===2){
                return this.checkSecondStep();
            }
            else if(currentStep===3){
                return this.checkThirdStep();
            }
            else if(currentStep===4){
                return this.checkFourthStep();
            }
            else{
                return this.checkFifthStep();
            }
        },
        checkFirstStep(){
            console.log('checkFirstStep');
            if(this.submitData.userType===0){
                if(this.submitData.idType===1){
                    if(this.submitData.idCardFront===''){
                        return '身份证正面照片必填'
                    }
                    if(this.submitData.idCardBack===''){
                        return '身份证反面照片必填'
                    }
                    if(this.submitData.ownerName===''){
                        return '犬主姓名必填'
                    }
                    if(this.submitData.idCard===''){
                        return '身份证号必填'
                    }
                }
                if(this.submitData.idType===2){
                    if(this.submitData.idCardFront===''){
                        return '驾驶证照片必填'
                    }
                    if(this.submitData.ownerName===''){
                        return '犬主姓名必填'
                    }
                    if(this.submitData.idCard===''){
                        return '身份证号必填'
                    }
                }
                if(this.submitData.idType===3){
                    if(this.submitData.firstName===''){
                        return 'First name必填'
                    }
                    if(this.submitData.lastName===''){
                        return 'Last name必填'
                    }
                    if(this.submitData.country===''){
                        return '国家必填'
                    }
                    if(this.submitData.passport===''){
                        return '护照号必填'
                    }
                }
                if(this.submitData.residencyProofFront===''){
                    return '居住证正面照片必填'
                }
                if(this.submitData.residencyProofBack===''){
                    return '居住证反面照片必填'
                }
            }
            else{
                if(this.submitData.idCardFront===''){
                    return '身份证正面照片必填'
                }
                if(this.submitData.idCardBack===''){
                    return '身份证反面照片必填'
                }
                if(this.submitData.ownerName===''){
                    return '犬主姓名必填'
                }
                if(this.submitData.idCard===''){
                    return '身份证号必填'
                }
                if(this.submitData.businessLicensePic===''){
                    return '单位营业执照照片必填'
                }
                if(this.submitData.company===''){
                    return '单位名称必填'
                }
            }

            if(this.submitData.phone===''){
                return '手机号码必填'
            }
            if(this.submitData.verificationCode===''){
                return '验证码必填'
            }
            if(this.submitData.regionId===''){
                return '现居住区县必填'
            }
            if(this.submitData.streetId===''){
                return '现居住街道必填'
            }
            if(this.submitData.communityId===''){
                return '先居住社区必填'
            }
            if(this.submitData.address===''){
                return '详细地址必填'
            }
            return 'success'
        },
        checkSecondStep(){
            if(this.submitData.dogName===''){
                return '昵称必填'
            }
            if(this.submitData.breed===''){
                return '犬类品种必选'
            }
            if(this.submitData.birthdate===null){
                return '出生日期必填'
            }
            if(this.submitData.adoptTime===null){
                return '领养日期必填'
            }
            if(this.submitData.weight===''){
                return '体重必填'
            }
            if(this.submitData.hairColor===''){
                return '毛色必填'
            }
            if(this.submitData.purposeName===''){
                return '犬用途必选'
            }
            if(this.submitData.dogPhotoFront===''){
                return '犬正面照必填'
            }
            if(this.submitData.dogPhotoBack===''){
                return '犬侧面照必填'
            }
            if(this.submitData.immuneAddress===''){
                return '免疫地点必选'
            }
            if(this.submitData.immuneNumber===''){
                return '免疫证编号必填'
            }
            if(this.submitData.immuneTime===null){
                return '免疫登记日期必填'
            }
            if(this.submitData.immunePhotos===''){
                return '免疫证照片必填'
            }
            if(this.submitData.immuneRecord===''){
                return '免疫记录页照片必填'
            }
            if(this.submitData.intentionRegistrationSite===''){
                return '意向服务点必选'
            }
            return 'success'
        },
        checkThirdStep(){
            return 'success'
        },
        checkFourthStep(){
            if(this.submitData.informationPic===''){
                return '信息登记表必填'
            }
            if(this.submitData.commitmentPic===''){
                return '养犬承诺书必填'
            }
            if(this.submitData.isStamp===0){
                if(this.submitData.otherPic===''){
                    return '没有盖章其他材料必填'
                }
            }
            return 'success'
        },
        checkFifthStep(){
            if(this.submitData.dogCardNumber===''){
                return '犬证编号必填'
            }
            if(this.submitData.immuneAddress===''){
                return '免疫地点必选'
            }
            if(this.submitData.immuneNumber===''){
                return '免疫证编号必填'
            }
            if(this.submitData.immuneTime===null){
                return '免疫登记日期必填'
            }
            if(this.submitData.immunePhotos===''){
                return '免疫证照片必填'
            }
            if(this.submitData.immuneRecord===''){
                return '免疫记录页照片必填'
            }
            return 'success'
        }
    }
}

export default mixin