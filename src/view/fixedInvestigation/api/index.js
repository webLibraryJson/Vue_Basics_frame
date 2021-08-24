import { req } from '../../../util/request'
//请求省市
export function areaDictionary() {
    return req({
        url: '/no-use/questionnaire/areaDictionary',
        method: 'get',
        params:{
            dictionaryType:1
        }
    });
}
//调查报告参数传递
export function questionnaire(query) {
    return req({
        url: '/no-use/questionnaire/questionnaire',
        method: 'post',
        data:query,
    });
}
//保存数据
export function backfillquestionnaire(query) {
    return req({
        url: '/no-use/questionnaire/questionnaire',
        method: 'get',
        params:query,
    });
}