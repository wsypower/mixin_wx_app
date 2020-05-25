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
    }
}

export default mixin