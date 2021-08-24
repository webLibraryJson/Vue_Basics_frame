import Cookies from 'js-cookie';

const TokenKey = 'casLogin-Token';
const beidKey = 'casLogin-BeId';
const phoneKey = 'casLogin-Phone';
const writerType = 'casLogin-writerType';

//判断用户值保存
export function getwriterTypeKey() {
    return Cookies.get(writerType);
}
export function setwriterTypeKey(writertype) {
    return Cookies.set(writerType, writertype);
}
export function removewriterTypeKey() {
    return Cookies.remove(writerType);
}
//电话保存
export function getphoneKey() {
    return Cookies.get(phoneKey);
}
export function setphoneKey(phone) {
    return Cookies.set(phoneKey, phone);
}
export function removephoneKey() {
    return Cookies.remove(phoneKey);
}

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getBeId() {
    return Cookies.get(beidKey);
}

export function setBeId(beid) {
    return Cookies.set(beidKey, beid);
}

export function removeBeId() {
    return Cookies.remove(beidKey);
}