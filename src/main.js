import Vue from 'vue'
import App from './App.vue'
import './assets/less/index.less'
import './api/mock'
//引入axios
import axios from 'axios';
//引入store
import store from './store';
//引入vue-router
import VueRouter from 'vue-router';
//引入路由器
import router from './router';

//引入Element ui组件库
import ElementUI, { MessageBox, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//应用ELementUI
Vue.use(ElementUI);

//应用VueRouter
Vue.use(VueRouter);
//全局绑定axios
Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store,
  created() {
    store.commit('addMenu', router) //防止刷新后丢失所有路由 页面空白的问题
  }
}).$mount('#app')
