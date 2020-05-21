<template>
  <div class="ceshi1">
    ceshi1ceshi1ceshi1
  </div>
</template>

<script>
export default {
  name: "ceshi1",
  created() {
    console.log(123);
  },
  activated() {
    console.log("复用的页面");
  }
};
</script>

<style lang="scss" scoped>
.ceshi1P {
  width: 100%;
  height: 500px;
  background-color: red;
  color: #000;
}
</style>