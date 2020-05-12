<template>
    <div class="apply-main_type" flex="dir:top cross:center">
        <div class="top-bg"></div>
        <div class="top-text-bg-part1"></div>
        <div class="top-text-bg-part2"></div>
        <div class="type-body">
            <slot name="content"></slot>
        </div>
        <div class="top-title" flex="cross:center main:center"><span>类型选择</span></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'cardLayout'
    }
</script>
<style lang="scss" scoped>
    .apply-main_type{
        width: 702px;
        height: 430px;
        position: relative;
        .top-bg{
            width:620px;
            height:0;
            border-bottom: 100px solid #5e8ff3;
            border-right: 37px solid transparent;
            border-left:37px solid transparent;
        }
        .top-text-bg-part1{
            position: absolute;
            top: 0px;
            z-index: 2;
            /*height: 85px;*/
            /*width: 460px;*/
            /*background-color: #3873eb;*/
            /*border-bottom-left-radius: 43px;*/
            /*border-bottom-right-radius: 43px;*/
            /*<!--transform: perspective(200px) rotateX(-40deg) rotateY(0deg) translateZ(0);-->*/
            /*text-align: center;*/
            //background-color:#3873eb;
            height:0px;
            width:545px;
            border-top: 48px solid #3873eb;
            border-right: 62px solid transparent;
            border-left:62px solid transparent;
            //border-radius:0 0 300px 300px;
        }
        .top-text-bg-part2{
            position: absolute;
            top: 16px;
            z-index: 2;
            height:50px;
            width:425px;
            background-color:#3873eb;
            /*border-top: 30px solid #3873eb;*/
            /*border-right: 10px solid transparent;*/
            /*border-left:10px solid transparent;*/
            border-radius:150px / 50px;
        }
        .type-body{
            position: absolute;
            top: 36px;
            z-index:1;
            width: 702px;
            height: 380px;
            background-color: #ffffff;
            box-shadow: 0px 3px 7px 0px rgba(192, 192, 192, 0.35);
            border-radius: 10px;
            padding: 90px 30px 30px 30px;
        }
        .top-title{
            position: absolute;
            top: 0px;
            z-index: 4;
            height: 66px;
            span{
                font-family: PingFang-SC-Medium;
                font-size: 30px;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }
    }
</style>