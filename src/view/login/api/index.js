import { req } from '../../../util/request'
//登录
export function verify(query) {
    return req({
        url: '/no-use/questionnaire/verify',
        method:'post',
        params:query,
        // method: 'get',
        // params:{
        //     dictionaryType:1
        // }
    });
}
//发送验证码请求
export function sendMsg(query) {
    return req({
        url: '/no-use/questionnaire/message',
        method: 'post',
        params:query,
    });
}