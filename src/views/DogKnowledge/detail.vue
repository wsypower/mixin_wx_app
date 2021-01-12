<template>
    <div class="knowledge-detail-page">
        <page-header title="养犬知识"></page-header>
        <div class="page-main">
            <div class="page-top">
                <div class="title">{{articleInfo.title}}</div>
                <div flex="dir:left main:justify">
                    <span>{{articleInfo.documentNumber}}</span>
                    <span>{{articleInfo.publishTime|timeFormatter('YYYY-MM-DD')}}</span>
                </div>
            </div>
            <div v-html="articleInfo.content" class="content"></div>
            <div class="file-panel" v-show="fileList.length>0">
                <p flex="dir:left cross:center" v-for="(file, index) in fileList" :key="index">
                    <van-icon name="newspaper-o" />
                    <span class="copyDJFileUrl"
                          :class="file.classname"
                          :data-clipboard-text="file.aline"
                          @click="copyDJFileUrl(file.classname)">{{file.aname}}</span>
                </p>
            </div>
        </div>
        <van-popup v-model="showDialog" class="dialog-warp">
            <div class="dialog" flex="dir:top cross:center">
                <div class="dialog-header">温馨提示</div>
                <div class="dialog-main">附件链接已复制，请用浏览器打开链接并下载。</div>
                <div class="dialog-footer"><van-button type="info" size="mini" @click="showDialog=false">关闭</van-button></div>
            </div>
        </van-popup>
    </div>
</template>
<script type="text/ecmascript-6">
    import PageHeader from '@/components/pageHeader.vue';
    import Clipboard from 'clipboard';
    import {Button, Icon, Popup, Toast} from "vant";
    export default {
        name: 'knowledgeDetail',
        components:{
            PageHeader,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [Button.name]: Button
        },
        data(){
            return {
                fileList: [],
                //复制成功后的弹窗
                showDialog: false,
                articleInfo:{
                    title: '',
                    documentNumber: '',
                    publishTime: 0,
                    content: ''
                }
            }
        },
        mounted(){
            let info = this.$store.getters['article/articleInfo'];
            let fileNumNameArray = [];
            Object.keys(this.articleInfo).forEach(key => {
                if(key==='content'){
                    if(info[key].indexOf('@@@link@@@')>1){
                        let arr = info[key].split('@@@link@@@');
                        fileNumNameArray = arr.reduce((acc, ns,index) => {
                            if((index+1)%2===0){
                                acc.push('@@@link@@@' + ns + '@@@link@@@');
                            }
                            return acc
                        },[]);
                        console.log('fileNumNameArray',fileNumNameArray);
                    }
                    this.articleInfo[key] = info[key]; //.replace(/@@@link@@@/g,'')
                }else{
                    this.articleInfo[key] = info[key];
                }

            });

            let fileStringArr = this.getFileList(fileNumNameArray);
            if(fileStringArr.length>0){
                fileStringArr.forEach(item => {
                    this.articleInfo.content = this.articleInfo.content.replace(item,'<p>此处附件请在文章下方复制链接</p>');
                })
                console.log('fileStringArr', fileStringArr);
                this.fileList = fileStringArr.reduce((acc,item,index) => {
                    let alinkstartindex = item.indexOf('href="') + 6;
                    let alinkendindex = item.substring(alinkstartindex).indexOf('"') + alinkstartindex;
                    let link = item.substring(alinkstartindex, alinkendindex);
                    let atitlestartindex = item.indexOf('title="') + 7;
                    let atitleendindex = item.substring(atitlestartindex).indexOf('"') + atitlestartindex;
                    let title = item.substring(atitlestartindex, atitleendindex);
                    let temp = {
                        classname: 'line' + index+2,
                        aname: title,
                        aline: link
                    }
                    acc.push(temp);
                    return acc
                },[]);
            }
        },
        methods:{
            getFileList(fileNumNameArray){
                let fileStringArr = [];
                let sourceString = this.articleInfo.content;
                for(let i=0;i<fileNumNameArray.length;i++){
                    let sepIndex = sourceString.indexOf(fileNumNameArray[i]);
                    let subString1 = sourceString.substring(0,sepIndex);
                    let subString2 = sourceString.substring(sepIndex);
                    let firstIndex = subString1.lastIndexOf('<p');
                    let endIndex = subString2.indexOf('</p>')+ 4 + subString1.length;
                    let needString = sourceString.substring(firstIndex, endIndex);
                    fileStringArr.push(needString);
                }
                return fileStringArr
            },
            copyDJFileUrl(classname){
                const clipboard = new Clipboard('.' + classname);
                clipboard.on('success', () => {
                    this.showDialog = true;
                })
                clipboard.on('error', () => {
                    Toast({
                        message: '复制失败',
                        duration: 1000
                    });
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .knowledge-detail-page{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        .page-main{
            width: 100%;
            flex: auto;
            overflow-y: auto;
        }
        .page-top{
            height: 156px;
            width: 100%;
            border-bottom: 2px solid #e6e6e6;
            padding: 0px 32px 0px 32px;
            .title{
                padding: 30px 0px;
                font-family: PingFang-SC-Bold;
                font-size: 36px;
                line-height: 40px;
                color: #333333;
                text-align: center;
                font-weight: bold;
            }
            span{
                font-family: PingFang-SC-Medium;
                font-size: 28px;
                color: #666666;
            }
        }
        .content{
            padding: 25px 25px 0px 25px;
            ::v-deep img{
                max-width: 100%;
            }
            ::v-deep p{
                font-size: 24px;
                line-height: 32px;
                margin: 0px !important;
            }
            ::v-deep p img{
                margin: 0 auto;
                display: block;
            }
            ::v-deep span{
                font-size: 24px;
            }
        }
        .file-panel{
            padding: 30px 25px 25px 25px;
            p{
                line-height: 40px;
                font-size: 20px;
                color: #306CE7;
                .copyDJFileUrl{
                    margin-left: 10px;
                }
            }
        }
        .dialog-warp{
            border-radius: 20px;
        }
        .dialog{
            width: 500px;
            height: 380px;
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