// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '@/store'
// 使用插件
Vue.use(VueRouter)
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// console.log(originReplace);
// console.log(originPush);

// 重写push||replace
// 第一个参数：告诉原来push方法，往哪跳转，传递哪些参数
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置路由
//对外暴露router类的实例
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

// 全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转哪个路由的信息
  // from：可以获取到你从哪个路由而来
  // next：放行函数
  // 用户登录了才有token
  let token = store.state.user.token
  // 用户信息 发了action才有
  let name = store.state.user.userInfo.name
  // 用户登录了
  if(token){
    if(to.path=='/login'||to.path=='/register'){
      next('/')
    }else{
      // 用户登陆了，但访问非login和register的页面
      // 登陆了，且拥有用户信息
      if(name){
        next()
      }else{
        // 登陆了且没有用户信息
        // 在路由跳转之前获取用户信息且放行
       try {
        await store.dispatch('getUserInfo')
        next()
        }
       catch (error) {
        //  token失效需要重新登录
        await store.dispatch('userLogout')
        next('/login')
        alert(error.message)
      }
    }     
    }
  }else{
    // 用户未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    // 未登录去上面这些路由，跳到登录页面
    let toPath=to.path
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect='+toPath)
    }else{
      next()
    }
    // 不是这些路由可以放行
   
  }
})

export default router
