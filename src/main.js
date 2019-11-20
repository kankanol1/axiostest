import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'iview/dist/styles/iview.css';
import router from './router/router'
Vue.use(VueAxios,axios,iView);

Vue.use(iView);
Vue.prototype.$axios = axios;


Vue.config.productionTip = false;

/*
* https://www.cnblogs.com/WQLong/p/8135553.html
* to:router即将进入的路由对象
* from:当前导航即将离开的路由
* next:Function,进行管道中的一个钩子，如果执行完了，
* 则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
* */
router.beforeEach((to, from, next) => {
  if(to.name === 'login'){
    next();
  }else{
    if(!(sessionStorage.getItem('userInfo')) || !(JSON.parse(sessionStorage.getItem('userInfo')).name)){
      next({name:'login'});
    }else{
      next();
    }
  }

});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
