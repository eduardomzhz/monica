import Vue from 'vue';
import Router from 'vue-router';
import Chart from 'vue2-frappe'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import helpers from './helpers';
import App from './App.vue';
import FeedForm from './components/FeedForm';
import FeedList from './components/FeedList';
import Home from './components/Home';
import Settings from './components/Settings';

Vue.use(Router);
Vue.use(Chart);
Vue.use(Buefy);
Vue.mixin(helpers);

const routes = [
  { path: '/', component: Home },
  { path: '/feed-form', component: FeedForm },
  { path: '/feed-list', component: FeedList },
  { path: '/settings', component: Settings }
];

new Vue({
  el: '#app',
  router: new Router({ routes }),
  render: h => h(App)
});
