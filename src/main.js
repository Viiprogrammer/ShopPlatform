import Vue from 'vue'
import App from './App.vue'
import Main from './Main.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
const routes = [
  { path: '/', component: Main },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
})
Vue.component('Header', Header);
Vue.component('Footer', Footer)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
