
<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <Navigation> -->
      <router-view v-wechat-title="$route.meta.title" />
      <!-- </Navigation> -->
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
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
