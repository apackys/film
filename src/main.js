// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import BScroll from '@/components/BScroll'
Vue.component('BScroll',BScroll)
import Loading from '@/components/loading'
Vue.component('Loading',Loading)

Vue.config.productionTip = false
Vue.prototype.$axios= axios
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  
    if(config.method == "post"){
      config.data = qs.stringify(config.data);
      console.log(config);
    }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //console.log(response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
