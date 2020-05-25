const ynArray = [{labelName: '是',value: '1'},{labelName: '否',value: '0'}];
const fileTypeArray = [{labelName: '身份证',value: '1'},{labelName: '驾驶证',value: '2'},{labelName: '护照',value: '3'}];
const sexArray = [{labelName: '男',value: '1'},{labelName: '女',value: '0'}];
const mixin = {
    data: function () {
        return {
            ynArray,
            fileTypeArray,
            sexArray
        }
    }
}

export default mixin