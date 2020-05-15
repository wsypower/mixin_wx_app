<template>
  <div class="detail">
    详情
    <van-button
      type="danger"
      @click='LinkGo'
    >危险按钮</van-button>
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
</style>