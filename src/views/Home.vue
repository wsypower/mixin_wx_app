<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div
      class="imgesce"
      v-for="item in imgs"
      :key="item.id"
    >
      <img
        :src="item"
        alt=""
      >
    </div>
    <div
      class="ceshi"
      @click="clickHandler"
    >测试打开相册</div>
    <div
      class="ceshi"
      @click="clickHandlerCamera"
    >测试打开摄像机</div>
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
  data() {
    return {
      imgs: null
    };
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
    clickHandler({
      count = 1,
      url = "http://192.168.71.33:50000/file/file/uploadBase64"
    }) {
      native.album({ count, url }).then(res => {
        console.log("调用结果回调", res);
        this.imgs = res.map(v => v.newPath);
        console.log(this.imgs);
      });
    },
    clickHandlerCamera({
      count = 1,
      url = "http://192.168.71.33:50000/file/file/uploadBase64"
    }) {
      native.camera({ count, url }).then(res => {
        console.log("调用结果回调", res);
        this.imgs = res.map(v => v.newPath);
        console.log(this.imgs);
      });
    }
  }
};
</script>
<style scoped lang="scss">
.ceshi {
  background-color: red;
}
.imgesce {
  width: 150px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>