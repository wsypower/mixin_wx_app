import { hesc } from 'hesc-jsapi'
const APP = {}
APP.getPosition = () =>{
    return new Promise((resolve, reject)=>{
        hesc.device.geolocation.get({
            tiandi:true,
            key:'8730e769e5f114d59325884bf3b7a2e9',
            poi:true,
            onSuccess : function(result) {
                //alert(JSON.stringify(result))
                resolve(result)
            },
            onFail : function(err) {
                // alert("位置调用错误" + err)
                reject(err)
            }
        });
    })

}
APP.getImageUrlAndMoreMessage = (type) => {
    let params = "{'type':'"+ type +"','mediaUrl':'" + URL_CONFIG.fileUrl +"'}";
    return new Promise((resolve, reject)=>{
        hesc.biz.native.method({
            url: params,
            onSuccess : function(result) {
                //alert("原生方法返回:"+JSON.stringify(result))
                resolve(result)
            },
            onFail : function(err) {
                reject(err)
            }
        })
    })
}
/**
 * method: 上传图片类型：拍照还是选择图片
 * */
APP.getImageUrl = (method) =>{
    console.log('APP.getImageUrl',method);
    if(method==='pz'){
        console.log(1)
        return new Promise((resolve, reject)=>{
            hesc.device.media.capture({
                custome:true, //true 自定义相机  false 系统相机
                compress:true,//true 进行压缩
                thumbnail:true,//true 优先返回缩略图base64，后台上传图片，false不需要缩略图，直接后台上传图片
                mediaUrl: URL_CONFIG.fileUrl,//附件服务器地址
                onThumbnail : function(result) {
                    console.log(2)
                    let resArr = [];
                    for (let item in result.thumbnails) {
                        let hearder = "data:image/png;base64,";
                        let arrNew = new Array()
                        arrNew.push(hearder)
                        arrNew.push(result.thumbnails[item])
                        resArr.push(arrNew.join(''))
                    }
                },
                onSuccess : function(result) {
                    resolve(result)
                },
                onFail : function(err) {
                    reject(err)
                }
            })
        })
    }
    else{
        return new Promise((resolve, reject)=> {
            hesc.device.media.select({
                image: {multiple: false, compress: false, max: 1},//multiple true进行多选compress true进行压缩，max最多选9张，如果multiple设置为false，max默认赋值1
                thumbnail: false,//true 优先返回缩略图base64，后台上传图片，false不需要缩略图，直接后台上传图片
                mediaUrl: URL_CONFIG.fileUrl,//附件服务器地址
                onThumbnail: function (result) {
                    let resArr = []
                    for (let item in result.thumbnails) {
                        let hearder = "data:image/png;base64,";
                        let arrNew = new Array()
                        arrNew.push(hearder)
                        arrNew.push(result.thumbnails[item])
                        resArr.push(arrNew.join(''))
                    }
                },
                onSuccess: function (result) {
                    resolve(result)
                },
                onFail: function (err) {
                    reject(err)
                }
            })
        })
    }
}

/**
 * 电话拨出
 */
APP.telephone = (phone) => {
    return new Promise((resolve, reject) => {
        hesc.biz.telephone.call({
            phone: phone, //电话号码
            onSuccess: function (result) {
                resolve(result)
            },
            onFail: function (err) {
                reject(err)
            }
        })
    })
}

export default APP