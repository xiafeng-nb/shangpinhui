import {reqGetGoodInfo,reqAddOrUpdateShopCart} from "@/API/index.js"
// 封装游客身份模块uuid---->生成一个随机字符串
import {getUUID} from '@/utils/uuid_token.js'
const state={
  goodInfo:{},
  // 游客临时身份
  uuid_token:getUUID()
}
const mutations={
  GETGOODINFO(state,goodInfo){
    state.goodInfo=goodInfo
  },
}

const actions={
  // 获取产品信息的action
  async getGoodInfo({commit},skuId){
    let result=await reqGetGoodInfo(skuId)
    if(result.code===200){
      commit('GETGOODINFO',result.data)
    }
  },
  // 将产品添加到购物车中的action
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    // 发请求
    let result=await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code==200){
      // 返回的是成功的标记
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }

  }

  
}
const getters={
  // 路径导航简化的数据
  categoryView(state){
    // state.goodInfo初始状态为空对象，空对象的categoryView属性值为undefined
    // 当前计算出的cateView属性值至少是一个空对象
    // 加一个||{}防止其报错
    return state.goodInfo.categoryView||{}
  },
  // 简化产品的信息数据
  skuInfo(state){
    return state.goodInfo.skuInfo||{}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList||[]
  }

}

export default{
  state,mutations,actions,getters
}