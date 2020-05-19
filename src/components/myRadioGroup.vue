<template>
    <van-radio-group v-model="value" direction="horizontal" @change="onChangeHandle" style="width:100%" class="my-class">
        <van-radio v-for="item in radioGroup" :key="item.value" :name="item.value" icon-size="14px" >{{item.labelName}}
            <template #icon="props">
                <span v-if="props.checked" class="icon iconfont icon-Time icon_radio checked"></span>
                <span v-else class="icon iconfont icon-danxuanxuanzhong icon_radio"></span>
            </template>
        </van-radio>
    </van-radio-group>
</template>
<script type="text/ecmascript-6">
    import { RadioGroup, Radio } from 'vant';
    export default{
        name: 'myRadioGroup',
        components: {
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio
        },
        props: {
            radioGroup: {
                type: Array,
                default(){
                    return []
                }
            },
            initValue: {
                type:String,
                default: ''
            }
        },
        data(){
            return{
                value: ''
            }
        },
        mounted(){
            this.value = this.initValue;
        },
        watch:{
            initValue:function(){
                this.value = this.initValue;
            }
        },
        methods:{
            onChangeHandle(name){
                this.$emit('getRealValue',name);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .icon_radio{
        font-size: 36px;
        color: #999999;
        &.checked{
            color: #306ce7;
        }
    }
</style>
<style lang="scss">
    .my-class{
        .van-radio{
            flex:1
        }
        .van-radio__label{
            font-family: PingFang-SC-Medium;
            font-size: 30px;
            color: #4d4d4d;
        }
    }
</style>