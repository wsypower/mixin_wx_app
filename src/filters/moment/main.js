import timeFormatter from './timeformatterfilters'

const vueFiltersDate = {
  install: function(Vue, options) {
    Vue.filter('timeFormatter',timeFormatter);
  }
}
// 自动注册插件
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueFiltersDate)
}

export default vueFiltersDate
