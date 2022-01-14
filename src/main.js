import Vue from 'vue';
import App from '@/App.vue';
import BalmUI from 'balm-ui';
Vue.config.productionTip = false;
Vue.use(BalmUI);
new Vue({
  render: (h) => h(App)
}).$mount('#app');
