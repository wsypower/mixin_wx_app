const orderInitInfo = {
    dogOrderId: '',
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
    //身份证正面图片路径或驾驶证照片或护照照片
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
    residencyProofBack: '',
    //单位营业执照照片
    businessLicense: '',

    //犬只相关
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
    purpose: null,
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
    //免疫证照片
    immunePhotos: '',
    //免疫记录照片
    immuneRecord: '',

    //PDF文件链接
    picPath: '',

    //是否盖章
    isStamp: 1,
    //信息登记表
    informationPic: '',
    //养犬承诺书
    commitmentPic: '',
    //其他材料
    otherFilePic: '',
    //备注
    remark: ''
}

export default orderInitInfo