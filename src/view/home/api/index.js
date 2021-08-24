import { req } from '../../../util/request'
//下载调查问卷文件
export function survey(query) {
    return req({
        url: '/no-use/questionnaire/survey',
        method:'get',
        params:query,
        // responseType: 'blob',
        timeout:12000
    });
}
