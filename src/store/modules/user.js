import {setphoneKey,removephoneKey,setwriterTypeKey,removewriterTypeKey} from '../../util/auth'
const user = {
    state:{
        userPhone:'',//手机号
        writerType:'',//登录者省份
    },
    mutations:{
        USER_PHONE(state,query){
            state.userPhone = query;
            if(query === undefined){
                removephoneKey();
            }else{
                setphoneKey(query);//把电话号码保存到cookie中
            }
        },
        WRITER_TYPE(state,query){
            state.writerType = query;
            if(query === undefined){
                removewriterTypeKey();
            }else{
                setwriterTypeKey(query);
            }
        }
    },
    actions:{
        //登录
        SignIn({commit},data){
            commit('USER_PHONE',data.userphone);
            commit('WRITER_TYPE',data.writerType);
        },
        //登出
        LogOut({commit}){
            return new Promise((resolve,reject) =>{
                commit('USER_PHONE');
                commit('WRITER_TYPE');
                resolve();
            })
        }
    },
    getters:{},
}
export default user