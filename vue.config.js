const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 不打包map文件
  productionSourceMap:false,
  // 关闭eslint
  lintOnSave:false,
  transpileDependencies: true,
  // 代理跨域
  devServer:{
    proxy: {
      "/api": {
        target: "http://39.98.123.211",
        pathRewrite: {"^/api" : ""}
      }
    }
  }
})
