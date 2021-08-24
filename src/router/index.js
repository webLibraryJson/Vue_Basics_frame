//配置路由相关的信息
import Vue from 'vue'
import VueRouter from 'vue-router'
import {getphoneKey} from '../util/auth'
import NProgress from 'nprogress' //浏览器异步请求时控制顶部的进度条消失或者出现

/**
 * 路由懒加载配置，
 *  1、生产环境/测试环境：采用按需加载的模式，该模式打包时会进行划分模块生成多个js
 *  2、开发环境：采用一次加载模式，为了避免hot update时速度慢的问题
 */
const investigation = () =>import('../view/fixedInvestigation/investigation.vue') //问卷调查
const login = () =>import('../view/login') //登录
const home = () =>import('../view/home/home.vue') //首页


//1、通过vue.use(插件)，安装插件
Vue.use(VueRouter);
//2、创建Vuerouter对象
const routes = [
    {   
        path:'',
        redirect:"/login"   //从定向
    },
    //登录页面
    {
        path:'/login',
        component:login,
    },
    //首页
    {
        path:'/home',
        component:home,
    },   
    //问卷调查页面
    {
        path:'/investigation',
        component:investigation,
    },
]
const router = new VueRouter({
    //配置路由和组件之间的映射关系
    routes,
    // mode:'history' //默认为hash模式
})
router.beforeEach((to,from,next) =>{
    // NProgress.start();//开启浏览器进度条
    if(to.path === '/login'){
        next()
    }else if(getphoneKey()){
        next();
    }else{
        next('/login');
        // NProgress.done();//关闭进度条
    }
})
//3、将router对象导出
export default router