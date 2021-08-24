<template>
  <div class="loginBox">
        <div class="center-box">
            <div class="titleBox">
                <img class="imgleft" src="../../assets/image/logo.png" alt="">
                <p>NB网络测试需求收集</p>
            </div>

            <van-form @submit="onSubmit">
                <van-field
                    v-model="userphone"
                    label="手机号"
                    colon
                    placeholder="请输入手机号"
                    :rules="[{pattern:/^1[0-9]{10}$/}]"
                />
                <van-field
                    v-model="verificationCode"
                    center
                    clearable
                    colon
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    >
                    <template #button>
                        <van-button v-if="ishowVerification" size="small" type="primary" @click="secondsFn">获取验证码</van-button>
                        <span v-else>{{lastTime}}秒后重试</span>
                    </template>
                </van-field>
                <!-- <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                /> -->
                <div class="signInBox">
                    <van-button round block type="info" native-type="submit" @click="stateJudgment = true">登录</van-button>
                </div>
            </van-form>
        </div>
  </div>
</template>

<script>
import {verify,sendMsg} from './api'
import { Toast } from 'vant';
export default {
    name:'login',
    data(){
        return{
            verificationCode:'',//验证码
            userphone:'',//手机号
            ishowVerification:true,
            lastTime:60,//60秒倒计时
            timer:null,
            stateJudgment:false,
            verifyCodeId:'',
        }
    },
    watch:{
    },
    components: {
    },
    computed: {},
    mounted(){
    },
    created(){ 
    },
    methods: {
        //登录
        onSubmit(){
            if(this.stateJudgment){
                let params = {
                    verifyCode:this.verificationCode,
                    verifyOperatorPhone:this.userphone,
                    verifyCodeId:this.verifyCodeId,
                }
                verify(params).then(res =>{
                    let query = {
                        userphone:this.userphone,
                        writerType:res.data.writerType
                    }
                    this.$store.dispatch('SignIn',query);//登录
                    this.$router.push({path:'/home'}) 
                }).catch(err =>{
                    Toast.fail('验证码错误');
                })
            }
        },
        //发送短信验证码
        secondsFn() {
            this.stateJudgment = false;
            let phone = /^1[0-9]{10}$/;
            if(phone.test(this.userphone)){
                let params = {
                    verifyOperatorPhone:this.userphone
                }
                sendMsg(params).then(res =>{
                    this.ishowVerification = false;
                    this.verifyCodeId = res.data;
                    this.opentimer();
                }).catch(err =>{
                    Toast.fail('短信发送失败，请重新发送！');
                    this.ishowVerification = true;
                })
            }
        },
        //开启定时器
        opentimer(){
            //60秒倒计时
            this.timer = setInterval(() =>{
                if(this.lastTime > 1){
                    this.lastTime--;
                }else{
                    this.ishowVerification = true;
                    this.delTimer();
                    this.lastTime = 60;
                }
            },1000);
        },
        //关闭定时器函数
        delTimer(){
            window.clearInterval(this.timer);
        }
    }

}
</script>

<style lang='less' scoped>
.loginBox{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    // box-sizing: border-box;
    // padding: 2rem 0;
    ::v-deep .van-button--primary{
        background-color: #1746d8;
        border: 1px solid #1746d8;
    }
    ::v-deep .van-button--info{
        background-color: #4471ff;
        border: 1px solid #4471ff;
    }
    .center-box{
        width: 100%;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        box-sizing: border-box;
        ::v-deep .van-cell{
            height: 49px;
        }
        .titleBox{
            color: #fff;
            text-align: center;
            box-sizing: border-box;
            padding: 0.8rem 0px;
            p{
                // font-size: 0.17rem;
            }
        }
        .signInBox{
            margin-top: 0.5rem;
        }
    }
    
}
</style>