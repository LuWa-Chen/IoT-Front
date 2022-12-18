
const webpack = require("webpack");

module.exports = {
    devServer: {
        proxy: {
            '/api': {                        //api表示拦截一/api开头的请求路径
                target: 'http://localhost:8081', //跨域的域名（不需要写路径）
                ws: false,   //是否代理webSocked
                changeOrigin: true,    //是否开启跨域
                pathRewrite: {          //重写路径
                    '^/api': ''    //把/api变为空字符串
                }
            },
        }
    },
    configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        })
        ]
      },
}