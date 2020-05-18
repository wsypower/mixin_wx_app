<template>
  <div class="detail">
    详情
    <van-button
      type="danger"
      @click='LinkGo'
    >危险按钮</van-button>
    <div
      class="button"
      @click="ceshi1"
    >ceshi1</div>
    <div
      class="button"
      @click="ceshi2"
    >ceshi2</div>
    <div class="main">
      <transition name="van-slide-left">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "detail",
  components: {
    [Button.name]: Button
  },
  methods: {
    LinkGo() {
      this.$router.go(-1);
    },
    ceshi1() {
      this.$router.push("/detail/ceshi1");
    },
    ceshi2() {
      this.$router.push("/detail/ceshi2");
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: red;
}
.main {
  width: 100%;
  height: 1200px;
  background-color: sandybrown;
}
.button {
  width: 180px;
  height: 180px;
  color: #000;
  background-color: seagreen;
  margin-bottom: 80px;
}
</style>