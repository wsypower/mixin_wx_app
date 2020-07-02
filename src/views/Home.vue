<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div
      class="ceshi"
      @click="clickHandler"
    >测试打开相册</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import native from "@/plugins/environment";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    console.log("首页开始");
  },
  activated() {
    console.log("复用的页面");
  },
  deactivated() {
    console.log("复用组件停用");
  },
  methods: {
    clickHandler() {
      native.camera({ count: 5 });
    }
  }
};
</script>
<style scoped lang="scss">
.ceshi {
  background-color: red;
}
</style>