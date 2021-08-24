module.exports = {
    publicPath:'',//vue-cli3.3+新版本使用
    devServer: {
        proxy: {
            '/questionnaire': {
                // target: 'http://10.19.103.76:8082',//目标地址
                target: 'http://10.19.103.144:8085',//目标地址
                // target: 'http://10.19.103.52:80',//目标地址
                // target:'http://192.168.43.94:8080',
                ws: true, //// 是否启用websockets
                /*  开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
                    这样服务端和服务端进行数据的交互就不会有跨域问题 */
                changeOrigin: true,
                pathRewrite: {'^/questionnaire': ''}    //这里重写路径
            }

        }
    }
}