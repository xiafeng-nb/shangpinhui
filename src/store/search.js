// search模块的小仓库
import {reqGetSearchInfo} from '@/API'
const state={
  searchList:{}
}
const mutations={
  GETSEARCHLIST(state,searchList){
    state.searchList=searchList
  }
}
const actions={
  // 获取search模块数据
  async getSearchInfo({commit},params={}){
    // params形参，是当用户派发action的时候，第二个参数传过来的
    let result=await reqGetSearchInfo(params)
    if(result.code===200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
// 计算属性，在项目中，为了简化数据而生
// 可以把我们将来在组件当中要用的数据简化，方便使用
const getters={
  // 当前形参state：当前仓库中的state，并非大仓库的state
  goodsList(state){
    // 假如网络不行，返回的数据为undefined
    // 所以加一个至少为空数组
    return state.searchList.goodsList||[];
  },
  trademarkList(state){
    return state.searchList.trademarkList||[];
  },
  attrsList(state){
    return state.searchList.attrsList||[];
  }

}
// 向外暴露模块
export default{
  state,mutations,actions,getters
}