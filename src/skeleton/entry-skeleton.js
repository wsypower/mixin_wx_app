/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   entry-skeleton.js                                         :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/19 18:24:24 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/19 18:24:24 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

/**
 * 可用 vue-content-loader 自动生成
 * https://github.com/egoist/vue-content-loader
 */

import Vue from "vue";
import Skeleton1 from "./modules/home.vue";
import Skeleton2 from "./modules/list.vue";
import { ContentLoader } from "vue-content-loader";
export default new Vue({
  components: {
    Skeleton1,
    Skeleton2,
    ContentLoader,
  },
  template: `
       <div style='height: 100%;'>
           <skeleton1 id="skeleton1" style="display:none"/>
           <skeleton2 id="skeleton2" style="display:none"/>
       </div>
    `,
});
