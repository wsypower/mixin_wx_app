<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    console.log("新页面");
  },
  activated() {
    console.log("复用的页面");
  },
  deactivated() {
    console.log("复用组件停用");
  }
};
</script>
