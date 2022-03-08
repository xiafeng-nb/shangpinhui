// 路由配置信息
// 引入一级路由组件
// import Home from '@/views/Home/index.vue'
// import Login from '@/views/Login/index.vue'
// import Register from '@/views/Register/index.vue'
// import Search from '@/views/Search/index.vue'
// import Detail from '@/views/Detail/index.vue'
// import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
// import ShopCart from '@/views/ShopCart/index.vue'
// import Trade from '@/views/Trade/index.vue'
// import Pay from '@/views/Pay/index.vue'
// import PaySuccess from '@/views/PaySuccess/index.vue'
// import Center from '@/views/Center/index.vue'
// 引入二级路由组件
import MyOrder from '@/views/Center/myOrder/index.vue'
import GroupOrder from '@/views/Center/groupOrder/index.vue'

// 路由懒加载

// 路由配置信息
export default [
  {path:"/home",component:()=> import('@/views/Home'),meta:{show:true}},
  {path:"/login",component:()=>import('@/views/Login'),meta:{show:false}},
  {path:"/register",component:()=>import('@/views/Register'),meta:{show:false}},
  {path:"/search/:keyword?",component:()=>import('@/views/Search'),name:"search"},
  {path:"/detail/:skuid",component:()=>import('@/views/Detail'),meta:{show:true}},
  {path:"/addcartsuccess",component:()=>import('@/views/AddCartSuccess'),meta:{show:true},name:"addcartsuccess"},
  {path:"/shopcart",component:()=>import('@/views/ShopCart'),meta:{show:true},name:"shopcart"},
  {path:"/trade",component:()=>import('@/views/Trade'),meta:{show:true},name:"trade",
  // 路由独享守卫
  beforeEnter: (to, from, next) => {
    // 去交易页面，必须是从购物车而来
    if(from.path=="/shopcart"){
      next()
    }else{
      // 其它的路由组件发来，停留在当前
      next(false)
    }
  }
},
  {path:"/pay",component:()=>import('@/views/Pay'),meta:{show:true},name:"pay",
  beforeEnter:(to,from,next)=>{
    if(from.path=='/trade'){
      next()
    }else{
      next(false)
    }
  }
},
  {path:"/paysuccess",component:()=>import('@/views/PaySuccess'),meta:{show:true},name:"paysuccess"},
  {path:"/center",component:()=>import('@/views/Center'),name:"center",
  children:[{
    path:"myorder",component:MyOrder,
  },{
    path:"grouporder",component:GroupOrder,
  },{
    path:"/center",redirect:'/center/myorder'
  }]
},
  // 路由组件能不能传递props数据?
  // 1.布尔值写法：params
  // props:true
  // 2.对象写法：
  // props:{a:1,b:2}
  // 3.函数写法：可以把params参数、query参数，通过props传递给路由组件
  // props:($route)=>{return{
  //   keyword:$route.params.keyword,k:$route.query.k
  // }}
  {path:"/",redirect:"/home"}
]