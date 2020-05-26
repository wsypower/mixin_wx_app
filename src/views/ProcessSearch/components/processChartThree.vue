<template>
    <div class="process-icon-panel" flex="dir:left cross:center main:justify">
        <div class="process-panel" flex="dir:top cross:center" :class="{active: activeIndex>=0}">
            <div class="process-icon_wai" flex="dir:top cross:center main:center">
                <div class="process-icon_nei">1</div>
            </div>
            <div class="process-text">提交材料</div>
        </div>
        <div class="guodu-jt" :class="{active: activeIndex>0}">
            <span class="icon iconfont icon-arrowRight-fill"></span>
            <span class="icon iconfont icon-arrowRight-fill"></span>
        </div>
        <div class="process-panel" flex="dir:top cross:center" :class="{active: activeIndex>=1}">
            <div class="process-icon_wai" flex="dir:top cross:center main:center">
                <div class="process-icon_nei">2</div>
            </div>
            <div class="process-text">信息审核</div>
        </div>
        <div class="guodu-jt" :class="{active: activeIndex>1}">
            <span class="icon iconfont icon-arrowRight-fill"></span>
            <span class="icon iconfont icon-arrowRight-fill"></span>
        </div>
        <div class="process-panel" flex="dir:top cross:center" :class="{active: activeIndex>=3}">
            <div class="process-icon_wai" flex="dir:top cross:center main:center">
                <div class="process-icon_nei">3</div>
            </div>
            <div class="process-text">备案登记</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'processChart',
        props:{
            activeIndex: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .process-icon-panel {
        height: 156px;
        width: 100%;
        padding: 0px 60px;
        .process-panel {
            width: 110px;
            .process-icon_wai{
                width: 56px;
                height: 56px;
                border-radius: 10px;
                border: solid 2px #bfbfbf;
                .process-icon_nei{
                    width: 40px;
                    height: 40px;
                    background-color: #bfbfbf;
                    border-radius: 10px;
                    text-align: center;
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 40px;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
            }
            .process-text{
                margin-top: 10px;
                font-family: PingFang-SC-Medium;
                font-size: 26px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #999999;
            }
            &.active{
                .process-icon_wai{
                    border: solid 2px #306ce7;
                    .process-icon_nei{
                        background-color: #306ce7;
                    }
                }
                .process-text{
                    color: #306ce7;
                }
            }
        }
        .guodu-jt{
            margin-top: -60px;
            span{
                font-size: 36px;
                color: #b2b2b2;
                &:last-child{
                    margin-left: -36px;
                }
            }
            &.active{
                span{
                    color: #306ce7;
                }
            }
        }
    }
</style>