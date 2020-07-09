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
    <div
      class="ceshi"
      @click="getLocation"
    >测试获取点位</div>
    <div
      class="ceshi"
      @click="updateAppMessageShareData"
    >测试分享</div>
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
  mounted() {
    native.getNetworkType().then(res => {
      console.log(res);
    });
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
      native.ty_album({ count, url }).then(res => {
        console.log("调用结果回调", res);
        this.imgs = res.map(v => v.newPath);
        console.log(this.imgs);
      });
    },
    clickHandlerCamera({
      url = "http://192.168.71.33:50000/file/file/uploadBase64"
    }) {
      native.ty_camera({ url }).then(res => {
        console.log("调用结果回调", res);
        this.imgs = res.map(v => v.newPath);
        console.log(this.imgs);
      });
    },
    getLocation() {
      native.ty_getLocation().then(res => {
        console.log("这是点位坐标点", res);
      });
    },
    updateAppMessageShareData() {
      native
        .updateTimelineShareData({
          title: "测试123123",
          link: "http://192.168.86.10:9527/#/",
          imgUrl: "../assets/images/no_data@2x.png"
        })
        .then(res => {
          console.log(res);
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