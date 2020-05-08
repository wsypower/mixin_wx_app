<template>
  <div class="hello">
    <van-button type="primary">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div
      class="ceshi"
      flex="main:center cross:center"
    >123123123</div>
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
        >babel</a></li>
      <li><a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a
          href="https://vuejs.org"
          target="_blank"
          rel="noopener"
        >Core Docs</a></li>
      <li><a
          href="https://forum.vuejs.org"
          target="_blank"
          rel="noopener"
        >Forum</a></li>
      <li><a
          href="https://chat.vuejs.org"
          target="_blank"
          rel="noopener"
        >Community Chat</a></li>
      <li><a
          href="https://twitter.com/vuejs"
          target="_blank"
          rel="noopener"
        >Twitter</a></li>
      <li><a
          href="https://news.vuejs.org"
          target="_blank"
          rel="noopener"
        >News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a
          href="https://router.vuejs.org"
          target="_blank"
          rel="noopener"
        >vue-router</a></li>
      <li><a
          href="https://vuex.vuejs.org"
          target="_blank"
          rel="noopener"
        >vuex</a></li>
      <li><a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a></li>
      <li><a
          href="https://vue-loader.vuejs.org"
          target="_blank"
          rel="noopener"
        >vue-loader</a></li>
      <li><a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
        >awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "HelloWorld",
  components: {
    [Button.name]: Button
  },
  props: {
    msg: String
  },
  mounted() {
    console.log(123);
  }
};
</script>

<style scoped lang="scss">
.ceshi {
  width: 750px;
  height: 70px;
  background-color: red;
  font-size: 30px;
  @include bg-image("~assets/images/no_data");
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
