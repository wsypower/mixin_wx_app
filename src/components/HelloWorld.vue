<template>
  <div class="hello">
    <van-button
      type="primary"
      @click="routerLink"
    >默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div
      class="ceshi"
      flex="main:center cross:center"
    >123123123</div>
    <h3>Ecosystem</h3>
    <div class="pdf">
      <!-- <pdf src="/api/upload/file/2020/05/18/20200518195301513703.pdf"></pdf> -->
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="src"
        :page="i"
        style="display: inline-block; width: 25%"
      ></pdf>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask(
  "/api/upload/file/2020/05/18/20200518195301513703.pdf"
);
export default {
  name: "HelloWorld",
  components: {
    [Button.name]: Button,
    pdf
  },
  data() {
    return {
      src: loadingTask,
      numPages: undefined
    };
  },
  props: {
    msg: String
  },
  mounted() {
    this.src.then(pdf => {
      this.numPages = pdf.numPages;
    });
    console.log(123);
  },
  activated() {
    console.log(456456);
  },
  methods: {
    routerLink() {
      this.$router.push("/router");
    }
  }
};
</script>

<style scoped lang="scss">
.hello {
  width: 100%;
  height: 100%;
  background-color: silver;
}
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
.pdf {
  width: 100%;
  height: 600px;
}
</style>
