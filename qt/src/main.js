import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Navbar from './components/Navbar'
// import qs from 'qs'
axios.defaults.baseURL = 'http://127.0.0.1:4000'
//导入样式表文件
import MintUI from 'mint-ui';
import "mint-ui/lib/style.min.css";

//通过Vue.ues()方法使用插件
Vue.use(MintUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.component('navbar',Navbar);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
