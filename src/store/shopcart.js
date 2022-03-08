import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/API/index.js'
const state={
  cartList:[]
}
const mutations={
  GETCARTLIST(state,cartList){
    state.cartList=cartList
  }
}
const actions={
  // 获取购物车列表数据
  async getCartList({commit}){
    let result = await reqCartList()
    if(result.code==200){
      commit('GETCARTLIST',result.data)
    }
  },
  // 删除购物车中数据
  async deleteCart({commit},skuId){
    let result=await reqDeleteCartById(skuId)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改商品的选中状态
  async updateChecked({commit},{skuId,isChecked}){
    let result=await reqUpdateCheckedById(skuId,isChecked)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({dispatch,getters}){
    // context:小仓库，commit[提交mutations修改state] getters[计算属性] dispatch[派发action]
    // 获取购物车中全部的产品
    let PromiseAll=[]
    getters.cartList.cartInfoList.forEach((item)=>{
      if(item.isChecked==1){
        let promise=dispatch('deleteCart',item.skuId)
        // 将每一次返回的promise添加到数组中
        PromiseAll.push(promise)
      }
    })
    // 只要全部的promise都成功，返回结果即为成功
    // 如果有一个失败，即返回失败结果
    return Promise.all(PromiseAll)
  },
  // 修改全部商品的选中状态
  changeAllChecked({dispatch,state},flag){
    let PromiseAll=[]
    state.cartList[0].cartInfoList.forEach(item=>{
        // item.isChecked=flag
        let promise=dispatch('updateChecked',{skuId:item.skuId,isChecked:flag})
        PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }

}
const getters={
  cartList(state){
    return state.cartList[0]||{}
  },
}

export default{
  state,mutations,actions,getters
}