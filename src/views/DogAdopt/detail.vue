<template>
    <div class="adopt-detail-page">
        <page-header title="领养宠物信息"></page-header>
        <div class="page-main">
            <div class="row" flex="dir:left cross:center">
                <div class="col" flex="dir:left cross:center"><span>犬名：</span><span class="value-text">{{dogInfo.dogName}}</span></div>
                <div class="col" flex="dir:left cross:center"><span>性别：</span><span class="value-text">{{dogInfo.dogSex}}</span></div>
            </div>
            <div class="row" flex="dir:left cross:center">
                <div class="col" flex="dir:left cross:center"><span>犬种：</span><span class="value-text">{{dogInfo.breed}}</span></div>
                <div class="col" flex="dir:left cross:center"><span>毛色：</span><span class="value-text">{{dogInfo.hairColor}}</span></div>
            </div>
            <div class="row" flex="dir:left cross:center">
                <span>领养服务点：</span><span>{{dogInfo.adoptServiceName}}</span>
            </div>
            <div class="row" flex="dir:left cross:center">
                <span>联系电话：</span>
                <span>{{dogInfo.servicePhone}}</span>
            </div>
            <div class="row" flex="dir:left cross:center">
                <span>领养时间：</span>
                <span>{{dogInfo.adoptBeginTime|timeFormatter('YYYY-MM-DD')}}~{{dogInfo.adoptEndTime|timeFormatter('YYYY-MM-DD')}}</span>
            </div>
            <div class="row" flex="dir:top">
                <span>宠物照片：</span>
                <div class="photo-panel" flex="dir:top cross:center">
                    <img :src="dogInfo.dogPhotoFront" :onerror="defaultImg"/>
                    <img :src="dogInfo.dogPhotoBack" :onerror="defaultImg"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import PageHeader from '@/components/pageHeader.vue';
export default {
    name: 'detail',
    components:{
        PageHeader
    },
    data(){
        return{
            defaultImg: 'this.src="' + require('@/assets/images/default@3x.png') + '"',
        }
    },
    computed:{
        dogInfo: function(){
            return this.$store.getters['adoptdog/dogInfo'];
        }
    },
    mounted() {}
}
</script>
<style lang="scss" scoped>
.adopt-detail-page{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .page-main{
        background-color: #ffffff;
        flex: auto;
        overflow-y: auto;
        padding: 20px 24px;
        .row{
            width: 100%;
            padding: 20px 0px;
            .col{
                width: 50%;
                .value-text{
                    padding-right: 80px;
                    flex:1;
                    text-align: center;
                }
            }
            span{
                font-family: PingFang-SC-Medium;
                font-size: 28px;
                color: #4d4d4d;
            }
            .photo-panel{
                width: 100%;
                img{
                    width: 100%;
                    height: 350px;
                    background-color: #eeeeee;
                    border-radius: 20px;
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>