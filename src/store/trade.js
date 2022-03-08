import {reqAddressInfo,reqGetTradeInfo} from '@/API/index.js'
const state={
  address:[],
  orderInfo:{}
}
const mutations={
  GETUSERADDRESS(state,address){
    state.address=address
  },
  TRADEINFO(state,orderInfo){
    state.orderInfo=orderInfo
  }


}
const actions={
  // 获取用户地址信息
  async getUserAddress({commit}){
    let result=await reqAddressInfo()
    if(result.code==200){
      commit('GETUSERADDRESS',result.data)
    }
  },
  // 获取商品清单
  async getTradeInfo({commit}){
    let result=await reqGetTradeInfo()
    if(result.code==200){
      commit('TRADEINFO',result.data)
    }
  }


}
const getters={

}
export default{
  state,mutations,actions,getters
}