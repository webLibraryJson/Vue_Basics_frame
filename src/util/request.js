import axios from 'axios'
import defaultConfig from './networkConfig'

export function req(config){
    const server = axios.create({
        baseURL: defaultConfig.urlConfig.BASE_API, // api的base_url
        timeout: config.timeout || 30000,                 // 请求超时时间
        withCredentials: true,
        transformResponse: [(data, headers) => {
            // if (headers.ssi) {N
            //     Cookies.set('ssi', headers.ssi);
            // }
            // if (headers['content-type'] && (headers['content-type'].includes('application/octet-stream') || headers['content-type'].includes('application/x-download'))) { // 如果是二进制流，就不进行数据的预处理
            //     return data;
            // }
            if (data && isJSON(data)) {
                return JSON.parse(NumberToString(data));
            } else {
                return data;
            }
        }],
    });
//         //发送请求拦截
    server.interceptors.request.use(config =>{
        return config //参数处理完后还得return返回所以参数 
        // 1、比如config中的一些信息不符合服务器的要求
        // 2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标，在响应拦截中关闭掉这个图标
        // 3、某些网络请求（比如登录(token)),必须携带一些特殊的信息
    },err =>{
    })
    //响应拦截
    server.interceptors.response.use(res =>{  //res成功响应
        return res;  //结果处理完后还得的返回
    },err =>{ //err失败的响应
        return Promise.reject(err); 
    })                                  
    return server(config);
}

function NumberToString(dataStr) {
    return dataStr.replace(/("subsId":|"custId":|"acctId":|"groupId":)\s*(\d*)\s*(,)/gi, '$1"$2"$3');
};
// 判断是否为json格式字符串
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}
