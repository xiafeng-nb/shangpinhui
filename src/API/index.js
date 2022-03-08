// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockRequest'
// 三级联动接口
//  /api/product/getBaseCategoryList
// get请求，无参数
export const reqCategoryList=()=> requests.get(`/api/product/getBaseCategoryList`)
// 获取banner(Home首页轮播图接口)
export const reqGetBannerList=()=>mockRequests.get('/banner')
// 获取floor数据
export const reqFloorList=()=>mockRequests.get('/floor')
// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要带参数
// 当前这个接口，给服务器传参，params至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({url:"/api/list",method:"post",data:params})
// 获取产品详情信息的接口 URL：/api/item/{ skuId }  请求方式：get   参数：产品id
export const reqGetGoodInfo=(skuId)=>requests({url:`/api/item/${skuId}`,method:'get'})
// 将产品添加到购物车中(或者更新某一个产品的个数) /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>
requests({url:`/api/cart/addToCart/${skuId}/${skuNum}`,method:'POST'})

// 获取购物车列表的数据接口
// URL:/api/cart/cartList method:get
export const reqCartList=()=>requests({url:'/api/cart/cartList',method:"GET"})

// 删除购物产品的接口
// URL： /api/cart/deleteCart/{skuId}  method：DELETE
export const reqDeleteCartById=(skuId)=>requests({url:`/api/cart/deleteCart/${skuId}`,method:"DELETE"})

// 切换商品选中状态
// URL:  /api/cart/checkCart/{skuId}/{isChecked} method:GET
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/api/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})

// 获取验证码的接口
// URL: /api/user/passport/sendCode/{phone} method：get
export const reqGetCode=(phone)=>requests({url:`/api/user/passport/sendCode/${phone}`,method:"GET"})

// 用户注册的接口
// URL： /api/user/passport/register method：post 
export const reqUserRegister=(data)=>requests({url:'/api/user/passport/register',method:"POST",data})

// 登录的接口
// URL: /api/user/passport/login method :post 
export const reqUserLogin =(data)=>requests({url:'/api/user/passport/login',method:"POST",data})

// 获取用户信息 【需要带着用户的token向服务器要用户信息】
// URL：/api/user/passport/auth/getUserInfo method:get
export const reqGetUserInfo=()=>requests({url:'/api/user/passport/auth/getUserInfo',method:"GET"})

// 退出登录 
// URL：/api/user/passport/logout method：get
export const reqLogout=()=>requests({url:'/api/user/passport/logout',method:'Get'})

// 获取用户地址信息
// URL: /api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo=()=>requests({url:'/api/user/userAddress/auth/findUserAddressList',method:'GET'})

// 获取商品信息
// URL：/api/order/auth/trade  method：get
export const reqGetTradeInfo=()=>requests({url:'/api/order/auth/trade',method:'GET'})

// 提交订单
// URL：/api/order/auth/submitOrder?tradeNo={tradeNo} method：post
export const reqPostOrder=(tradeNo,data)=>requests({url:`/api/order/auth/submitOrder/?tradeNo=${tradeNo}`,method:'POST',data})

// 获取支付信息
// URL: /api/payment/weixin/createNative/{orderId} method:get
export const reqPayInfo=(orderId)=>requests({url:`/api/payment/weixin/createNative/${orderId}`,method:'GET'})

// 获取支付订单状态
// URL: /api/payment/weixin/queryPayStatus/{orderId} method:get
export const reqPayStatus=(orderId)=>requests({url:`/api/payment/weixin/queryPayStatus/${orderId}`,method:'GET'})

// 获取个人中心的数据
// URL：/api/order/auth/{page}/{limit} method：get
export const reqMyOrderList=(page,limit)=>requests({url:`/api/order/auth/${page}/${limit}`,method:'GET'})
