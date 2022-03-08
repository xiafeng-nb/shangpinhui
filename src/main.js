import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
// 全局组件 在入口文件注册一次之后，在所有组件都可以直接使用
import TypeNav from '@/components/TypeNav/index.vue'
import Carsousel from '@/components/Carousel/index.vue'
import Pagination from '@/components/Pagination/index.vue'
// 注册全局组件，第一个参数为组件名字，第二个参数
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name,Carsousel)
Vue.component(Pagination.name,Pagination)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServe.js
import '@/mock/mockServe.js'
// 引入轮播图样式
import 'swiper/css/swiper.css'
// 统一引入
import * as API from '@/API'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入图片
import loading from '@/assets/loading.jpg'
// 引入ElementUI
import { Button,MessageBox} from 'element-ui';
// 引入表单校验插件
import "@/plugins/validate.js"
// 全局注册
Vue.component(Button.name, Button);
// ElementUI注册组件的时候，还可以挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(VueLazyload,{
  preLoad: 1.3,
  // 懒加载默认的图片
  loading: loading,
  attempt: 1
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins.js'
Vue.use(myPlugins,{
  name:'upper'
})

new Vue({
  // 注册路由：底下写法KV一致省略V
  // 注册路由信息：当这里书写router的时候，组件的身上都会有$route，$router属性
  router,
  // 注册仓库：组件实例的身上会多一个属性$store
  store,
  render: h => h(App),
  beforeCreate(){
    // 全局事件总线$bus配置
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  }
}).$mount('#app')
