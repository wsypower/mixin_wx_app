<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view v-wechat-title="$route.meta.title" />
    </transition>
  </div>
</template>
<script>
import defaultSetting from "./settings";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("pagesAnimation");
export default {
  name: "app",
  computed: {
    ...mapState({
      direction: state => state.direction
    }),
    transitionName() {
      return defaultSetting.needPageTrans ? this.direction : "";
    }
  }
};
</script>
<style lang="scss">
@import "@/style/flex";
@import "@/style/animations/pageAnimations";
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
}
</style>
