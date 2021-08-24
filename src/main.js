import Vue from 'vue'
import App from './App.vue'
import router from './router' //导入router
import store from './store'  //导入vuex
import Vant from 'vant'
import moment from 'moment'
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.$moment = moment;//把moment.js添加到vue的原型上面

Vue.config.productionTip = false
//配置100px = 1rem
window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 3.75 + 'px';
}
setHtmlFontSize();


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

