<template>
    <div class="apply-step" flex="main:center">
        <div class="background_line"></div>
        <div class="line-animate" ref="anline"></div>
        <div class="apply-step-content" flex="dir:left cross:center main:justify">
            <div class="step-item"
                 v-for="(item, index) in stepList"
                 :key="item"
                 :class="{active: index <= activeStep}"
                 flex="dir:top cross:center">
                <div class="step-item_icon-wai" flex="cross:center main:center">
                    <div class="step-item_icon-nei" flex="cross:center main:center">{{index + 1}}</div>
                </div>
                <div class="step-item_text">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        name: 'applyStepHeader',
        props: {
            activeStep: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                stepList: ['犬主信息','犬只信息','申请材料','上传材料']
            }
        },
        watch:{
            activeStep: function(newValue){
                console.log(`activeStep:${newValue}`);
                this.$refs.anline.style.width = 95 * newValue + 'px';
            }
        }

    }
</script>
<style lang="scss" scoped>
    .apply-step{
        width: 100%;
        height: 160px;
        background-color: #ffffff;
        position: relative;
        .background_line{
            margin-top: 55px;
            width: 580px;
            height: 6px;
            background-color: #cad6f5;
        }
        .line-animate{
            position: absolute;
            top: 55px;
            left: 85px;
            height: 6px;
            width: 0px;
            background-color: #306ce7;
            transition: width 0.6s;
        }


        .apply-step-content{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            padding: 0px 20px;
            .step-item{
                width: 130px;
                &_icon-wai{
                    width: 62px;
                    height: 62px;
                    border-radius: 100%;
                    background-color: #c0d3f8;
                    transition: all 1.2s;
                }
                &_icon-nei{
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    border: solid 6px #a2bdf4;
                    background-color: #ffffff;
                    font-family: PingFang-SC-Bold;
                    font-size: 26px;
                    color: rgba(48, 108, 231, 0.9);
                    transition: all 1.2s;
                }
                &_text{
                    margin-top: 14px;
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    line-height: 34px;
                    color: #306ce7;
                    opacity: 0.95;
                    font-weight:500;
                    transition: all 1.2s;
                }
                &.active {
                    .step-item_icon-wai{
                        background-color: #306ce7;

                    }
                    .step-item_icon-nei{
                        border: solid 6px #83a7f1;
                        color: #306ce7;
                    }
                    .step-item_text{
                        font-weight: 600;
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>