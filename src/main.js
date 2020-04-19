import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import helpers from './helpers';

Vue.use(Buefy);
Vue.mixin(helpers);

new Vue({
  el: '#app',
  render: h => h(App)
});
