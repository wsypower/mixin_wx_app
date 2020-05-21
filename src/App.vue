
<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <Navigation> -->
      <router-view v-wechat-title="$route.meta.title" />
      <!-- </Navigation> -->
    </transition>
    <van-overlay :show="show" @click="show = false" class-name=bcolor>
      <div class="wrapper">
        <van-loading color="#1989fa" size="40px"/>
      </div>
    </van-overlay>
  </div>
</template>
<script type="text/ecmascript-6">
import { Overlay, Loading } from 'vant';
import defaultSetting from "./settings";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("pagesAnimation");
export default {
  name: "app",
    components:{
      [Overlay.name]: Overlay,
      [Loading.name]: Loading
    },
    data(){
      return {}
    },
  computed: {
    ...mapState({
      direction: state => state.direction
    }),
    transitionName() {
      return defaultSetting.needPageTrans ? this.direction : "";
    },
    show(){
      return this.$store.getters['isLoading'];
    }
  },
   mounted(){}
};
</script>
<style lang="scss">
@import "@/style/flex";
@import "@/style/animations/pageAnimations";

html,
body {
  width: 100%;
  height: 100%;
}
* {
    box-sizing: border-box;
}
* {
    padding: 0;
    margin: 0;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
}
  .bcolor{
    background-color: rgba(255,255,255,0.5)
  }
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
