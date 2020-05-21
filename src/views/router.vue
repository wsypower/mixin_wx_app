<template>
  <div class="router">
    <header @click="routerGo"> 测试页面 </header>
    <header @click="routerGoIndex"> 回到首页 </header>
    <main>
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="linkGo"
        >{{item}}</li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "ceshi",
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]
    };
  },
  methods: {
    linkGo() {
      this.$router.push("/detail");
    },
    routerGo() {
      this.$router.go(-1);
    },
    routerGoIndex() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.router {
  width: 100%;
  height: 100%;
  background-color: skyblue;
  main {
    li {
      width: 100%;
      height: 110px;
      background-color: salmon;
      margin-bottom: 15px;
    }
  }
}
</style>