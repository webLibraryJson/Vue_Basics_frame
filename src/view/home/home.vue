<template>
  <div class="homeBox">
      <van-button round class="loginout-box" type="info" @click="loginout" size="mini">退出登录</van-button>
        <div class="information">
            <div class="informationBox">
                <img class="imgleft" src="../../assets/image/profile.png" alt="">
                <p>{{writeType() ? '省负责人' : '客户经理'}}</p>
                <p>{{DSphone(phonedata)}}</p>
            </div>
        </div>
        <div class="coment">
            <div class="coment-top">
                <div class="coment-top-flex">
                    <div @click="informationEntry">
                        <img src="../../assets/image/Report.png" alt="">
                        <p>需求上报</p>
                    </div>
                    <!-- 省负责人权限展示 -->
                    <div @click="informationDownload" v-if="writeType()">
                        <img src="../../assets/image/download.png" alt="">
                        <p>信息下载</p>
                    </div>
                    <div class="noOperation">
                        <img src="../../assets/image/wait.png" alt="">
                        <p>更多功能开发中...</p>
                    </div>
                </div>
                <!-- <div class="coment-top-flex">
                    <div>
                        <img src="../../assets/image/wait.png" alt="">
                        <p>更多功能开发中...</p>
                    </div>
                </div> -->
            </div>
            <div class="coment-tip">
                <p>提示：</p>
                <p>1、点击“需求上报”，可上报客户NB网络测试需求；</p>
                <p v-if="writeType()">2、点击“信息下载”，可下载本省全量已填报数据。</p><!-- 省负责人权限展示 -->
            </div>
        </div>
        <a ref='downloadFile' style="display: none"></a>
  </div>
</template>

<script>
import {getphoneKey,getwriterTypeKey} from '../../util/auth'
import {downloadFile,downloadFileStatic} from '../../util/publicMethod' //文件导出
import defaultConfig from  '../../util/networkConfig'
import {survey} from './api'
export default {
    name:'home',
    data(){
        return{
            phonedata:getphoneKey()
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
        loginout(){
            this.$store.dispatch('LogOut').then(() =>{
                this.$router.push({path:'/login'});
            });
        },
        writeType(){
            if(getwriterTypeKey() === '1'){
                return true
            }else{
                return false;
            }
        },
        //手机号脱敏
        DSphone(str = '') {
            if(!str) return '';
            return str
            .split("")
            .reduce((res, item, i) => {// res是定义的一个新变量  item是每一项   i索引值s
                if (i < 3 || i >= 7) {
                    return res + item;
                } else {
                    return res + "*";
                }
            })
        },
        //信息录入
        informationEntry(){
            this.$router.push({
                path:'/investigation'
            });
        },
        //信息下载
        informationDownload(){
            let params = {
                verifyOperPhone:getphoneKey(),
            }
            survey(params).then(res =>{
                let url = defaultConfig.urlConfig.STATIC_FILE_URL + res.data.filePath;
                downloadFileStatic(url);
            }).catch(err =>{
            })
        }
    }

}
</script>

<style lang='less' scoped>
.homeBox{
    box-sizing: border-box;
    ::v-deep .van-button--info{
        background-color: #4471ff;
        border: 1px solid #4471ff;
    }
    position: relative;
    .loginout-box{
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
    }
    .information{
        img{
            width: 0.7rem;
            height: 0.7rem;
        }
        box-sizing: border-box;
        padding: 0.4rem 0.1rem;
        color: #fff;
        .informationBox{
            box-sizing: border-box;
            height: 0.7rem;
            padding-left: 0.8rem;
            position: relative;
            padding-top: 0.1rem;
            .imgleft{
                position: absolute;
                top: 0px;
                left: 0px;
            }
            p{
                height: 0.25rem;
                line-height: 0.25rem;
            }
        }
    }
    .coment{
        background: #f5f5f5;
        padding: 0.2rem 0.1rem;
        box-sizing: border-box;
        color: #494949;
        height: 100%;
        width: 100%;
        .coment-top{
            img{
                width: 0.7rem;
                height: 0.7rem;
            }
            .coment-top-flex{
                display: flex;
                justify-content:space-between;
                flex-wrap: wrap;
                box-sizing: border-box;
                div{
                    width: 49%;
                    background: #fff;
                    text-align: center;
                    padding: 0.3rem 0px;
                    margin-bottom: 0.1rem;
                    cursor: pointer;
                }
                p{
                    height: 0.4rem;
                    line-height: 0.4rem;
                }
                .noOperation{
                    cursor:default;
                }
            }
        }
        .coment-tip{
            font-size: 0.12rem;
            // position: fixed;
            // bottom: 0.2rem;
        }
    }
}
</style>