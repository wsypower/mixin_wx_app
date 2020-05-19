// - entry-skeleton.js
import Vue from "vue";
import Skeleton1 from "./modules/home.vue";
import Skeleton2 from "./modules/list.vue";

export default new Vue({
  components: {
    Skeleton1,
    Skeleton2,
  },
  //render: h => h(Skeleton1,Skeleton2),
  template: `
       <div style='height: 100%;'>
           <skeleton1 id="skeleton1" style="display:none"/>
           <skeleton2 id="skeleton2" style="display:none"/>
       </div>
    `,
});
