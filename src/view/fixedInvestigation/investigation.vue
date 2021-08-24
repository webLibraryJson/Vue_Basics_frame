<template>
  <div class="invertigation">
    <div class="topbox">
      <div class="backbox">
        <!-- <van-button round class="loginout-box" type="info" @click="back" size="mini">返回</van-button> -->
        <div class="backimg" @click="back">
          <img src="../../assets/image/back.png" alt="">
        </div>
        <div class="logoimg">
          <img  src="../../assets/image/logo.png" alt="">
        </div>
      </div>
      <p>NB网络定点/乡镇测试</p>
      <h3>需求搜集</h3>
    </div>
    <!-- 调查报表 -->
      <antform :formList='formList' :formData='formData' @event='submit' @save='save'>
        <div class="titleBox" slot="titleOne">
          <img src="../../assets/image/01.png" alt="">
          <span>基本信息</span>
        </div>
        <div class="titleBox" slot="titleTwo">
          <img src="../../assets/image/02.png" alt="">
          <span>客户信息</span>
        </div>
        <div class="titleBox" slot="titleThree">
          <img src="../../assets/image/03.png" alt="">
          <span>项目信息</span>
        </div>
        <div class="titleBox" slot="four">
          <img src="../../assets/image/04.png" alt="">
          <span>测试区域信息</span>
        </div>
        <!-- <div class="titleBox " slot="five">
          <img src="../../assets/image/05.png" alt="">
          <span>业务提升增量预估</span>
        </div> -->
        <div class="titleBox" slot="six">
          <img src="../../assets/image/05.png" alt="">
          <span>其他说明/建议</span>
        </div>
        <!-- <div slot="inputlable" class="inputlablebox">
          <img class="retuired-img" src="../../assets/image/Required.png" alt="">
          业务提升增量预估:
        </div> -->
        <div slot="tips" class="tipsBox">
          <ul>
            <li>提示：</li>
            <li>1、点击“保存”后，可再次登录并查看、编辑、提交保存信息。</li>
            <li>2、如需要填写多条需求记录，请成功提交后点击“继续提交”。</li>
          </ul>
        </div>
      </antform>
      <!-- 遮罩层 -->
      <van-overlay :show="ishowloading">
        <div class="wrapper">
          <van-loading  color="#0094ff" size="24px" vertical>加载中...</van-loading>
        </div>
      </van-overlay>
  </div>
</template>

<script>
import {getphoneKey} from '../../util/auth'
import antform from '../../components/from/index.vue'
import { Dialog,Toast } from 'vant';
import { areaDictionary,questionnaire,backfillquestionnaire } from './api'
export default {
  name:'investigation',
  data () {
    return {
      ishowloading:false,//loading加载
      industryArray:['智能抄表','共享服务','公共安全','金融支付','车联网','智能家电','穿戴设备','市政设施','定位跟踪'],//所属行业
      projectStatusArray:['合同未签署','合同已签署未开卡','合同已签署已开卡'],//项目状态
      // projectStatusArray:[
      //   {
      //     text:'洽谈中',
      //     values:0
      //   },
      //   {
      //     text:'合同签署中',
      //     values:1
      //   },
      //   {
      //     text:'合同执行中',
      //     values:2
      //   },
      // ],//项目状态
      // testClassArray:[{text:'定点测试',value:'001'},{text:'乡镇级以下区域',value:'002'}],//测试类型可以单独加value值
      testClassArray:['定点测试','乡镇级以下区域'],//测试类型
      testAreaArray:[],//省/市/区/后端请求到的数据

      //测试自己造的数据
      columnsdandu: ['杭州', '宁波', '温州', '嘉兴', '湖州','重庆'],
      formList:[],
      formData:{
        writerName:'',//姓名
        writerPhone:getphoneKey(),//电话
        writerArea:'',//归属省市
        clientName:'',//客户名称
        clientCode:'',//集团客户编码
        clientIndustry:'',//客户所属行业
        projectStatus:'',//项目状态
        projectContractNumber:'',//项目合同编码
        projectMoneyAmount:'',//项目金额
        projectCardAmount:'',//项目卡量
        openedCardAmount:'',//当前已开卡量 没有
        testType:'',//测试类型
        testArea:'',//测试区域
        specificArea:'',//具体地址
        bussinessScenarios:'',//业务场景
        pointSuggestions:'',//收益和连接数预估
        additionalSuggestions:'',//说明
        isSubmit:'0',//'0' 保存 '1'提交
        verifyOperatorPhone:getphoneKey()
      }
    };
  },
  watch:{
    formData:{
        handler(newvalue){
          this.formList = this.formDataFn();
        },
        deep:true
    },
  },
  components: {
    antform
  },
  computed: {},
  mounted(){
  },
  created(){ 
    this.enumData();
    this.backfill();//回填数据
  },
  methods: {
    //返回
    back(){
      console.log('返回');
      this.$router.push({path:'/home'});
    },
    //枚举值请求
    enumData(){
      this.ishowloading = true;
      areaDictionary().then(res =>{
        this.ishowloading = false;
        this.testAreaArray = res.data;
        this.formList = this.formDataFn();
      }).catch(err =>{
        this.ishowloading = false;
        this.formList = this.formDataFn();
      })
    },
    //弹框提示
    popFn(title,message,cancelButtonText,confirmButtonText){
      return new Promise((resolve,reject) =>{
        Dialog.confirm({
          title,
          message,
          theme:'round-button',
          confirmButtonText,//确认按钮文案
          cancelButtonText,//取消按钮文案
          confirmButtonColor:'#279eff',
          cancelButtonColor:'#c9d4e0'
        })
        .then(() => {
          resolve()
        })
        .catch(() => {
          reject()
        })
      })
    },
    //重置数据
    rest(){
      this.formData.clientName = '';//客户名称
      this.formData.clientCode = '';//集团客户编码
      this.formData.clientIndustry = '';//客户所属行业
      this.formData.projectStatus = '';//项目状态
      this.formData.projectMoneyAmount = '';//项目金额
      this.formData.projectCardAmount = '';//项目卡量
      this.formData.openedCardAmount = '';//当前已开卡量 没有
      this.formData.testType = '';//测试类型
      this.formData.testArea = '';//测试区域
      this.formData.specificArea = '';//具体地址
      this.formData.bussinessScenarios = '';//业务场景
      this.formData.pointSuggestions = '';//收益和连接数预估
      this.formData.projectContractNumber = '';//项目合同编码
    },
    backfill(){
      let params = {
        verifyOperatorPhone:getphoneKey(),
      }
      backfillquestionnaire(params).then(res =>{
        console.log(res,'回填数据');
        if(res.data.length != 0){
          this.formData = res.data[0];

        }
      }).catch(err =>{

      })
    },
    //保存数据
    save(){
      this.formData.isSubmit = '0';
      this.formData.verifyOperatorPhone = getphoneKey();
      questionnaire(this.formData).then(res =>{
        // Dialog.alert({
        //   title: '提示',
        //   message: '保存成功！',
        //   theme: 'round-button',
        //   confirmButtonColor:'#279eff',
        // })
        Toast.success('保存成功！');
      }).catch(err =>{
        Toast.fail('保存失败，请从新保存！');
        // Dialog.alert({
        //   title: '提示',
        //   message: '保存失败，请从新保存！',
        //   theme: 'round-button',
        //   confirmButtonColor:'#279eff',
        // })
      })
    },
    //提交数据
    submit(data){
      let failureTips = '提交失败,请重新提交';
      let successTips = '提交成功！点击“继续提交”可继续填写！';
      this.formData.isSubmit = '1';
      this.formData.verifyOperatorPhone = getphoneKey();
      // console.log(this.formData.projectMoneyAmount,'this.formData.projectMoneyAmount');
      //提交报告
      questionnaire(this.formData).then(res =>{
        if(res.status === 200){
          //提交成功弹框
          this.popFn('提示',successTips,'关闭','继续提交').then(res =>{
            this.rest();
          }).catch(err =>{
            this.rest();
            this.formData
            this.formData.writerName = '';//姓名
            this.formData.writerPhone = '';//电话
            this.formData.writerArea = '';//归属省市
            this.formData.additionalSuggestions = '';//说明
            this.$router.push({path:'/home'});
          });
        }else{
            //提交失败弹框
            this.popFn('提示',failureTips,'放弃提交','重新提交').then(res =>{
            }).catch(err =>{
              this.rest();
              this.formData
              this.formData.writerName = '';//姓名
              this.formData.writerPhone = '';//电话
              this.formData.writerArea = '';//归属省市
              this.formData.additionalSuggestions = '';//说明
              this.$router.push({path:'/home'});
            });
        }
      }).catch(err =>{
        Dialog.alert({
          title: '提示',
          message: '系统故障，提交失败！请稍后重试！',
          theme: 'round-button',
          confirmButtonColor:'#279eff',
        }).then(() => {
        });
      })
    },
    backFn(value,fieldName){
      if(typeof(value) === 'object'){
        this.formData[fieldName] = value.join('/');
      }else{
        this.formData[fieldName] = value
      }
      this.formList = this.formDataFn();
    },
    //根据洽谈中/合同签署中/合同执行中状态判断
    isrequiredFn(){
      if(this.formData.projectStatus === '合同已签署未开卡' || this.formData.projectStatus === '合同已签署已开卡' ){
        return true;
      }else{ 
        return false;
      }
    },
    isrequiredFncurrent(){
      if(this.formData.projectStatus === '合同已签署已开卡' ){
        return true;
      }else{ 
        return false;
      }
    },
    //传递参数
    formDataFn(){
      return [
        //基本信息start--------------------------------------------
        // 输入框
        {
          titleOne:'one',//显示第一个标题
          state:'input',//展示那种类型
          value:'writerName',
          label:'填报人姓名',
          name:'pattern',
          placeholder:'请输入客户经理姓名',
          type:'text',//tel  digit number textarea password 总共5种类型
          maxlength:"30",
          showWordLimit:false,
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        {
          // titleTwo:'two',
          state:'input',//展示那种类型
          value:'writerPhone',
          label:'填报人电话',
          name:'pattern',
          placeholder:'请输入客户经理手机号',
          type:'number',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/^1[0-9]{10}$/}]//校验如果必填就要有校验
        },
        //地区选择器
        // {
        //   state:'select',//展示那种类型
        //   value:'writerArea',
        //   label:'归属省市',
        //   // columns:this.testAreaArray,//下拉框选择数据
        //   columns:this.testArray,
        //   name:'pattern',
        //   placeholder:'请输入归属省市',
        //   type:'text',//tel  digit number textarea password 总共5种类型
        //   confirm:(valueData) =>{ //选择下拉框值回调
        //     this.backFn(valueData,'writerArea');//vlaue选择回调的值，传递给this.formData中的属性值
        //   },
        //   showPicker:false,//下拉选择框隐藏初始值
        //   colon:true,//是否添加冒号
        //   required:false,//是否必填
        //   // rules:[{pattern:/\S/}]//校验如果必填就要有校验
        // },
        {
          state:'regionSelect',//展示那种类型
          value:'writerArea',
          label:'归属省市',
          columns:this.testAreaArray,
          name:'pattern',
          placeholder:'请输入归属省市',
          selectplaceholder:'请选择所在地区',
          type:'text',//tel  digit number textarea password 总共5种类型
          fieldNames: {
            value: 'id',
          },
          confirm:({selectedOptions}) =>{ //选择下拉框值回调
            let valueData = selectedOptions.map((option) => option.text).join('/');
            this.backFn(valueData,'writerArea'); //vlaue选择回调的值，clientIndustry传递给this.formData中的属性值
          },
          showPicker:false,//下拉选择框隐藏
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//校验如果必填就要有校验
        },
        //基本信息end-----------------------------------------------
        //客户信息start--------------------------------------------
        {
          titleOne:'two',//显示第二个标题
          state:'input',//展示那种类型
          value:'clientName',
          label:'客户名称',
          name:'pattern',
          placeholder:'请输入CMIOT/PBOSS建档客户名称',
          type:'text',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          maxlength:"300",
          showWordLimit:false,
          required:true,//是否必填
          rules:[{pattern:/\S/}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        {
          state:'input',//展示那种类型
          value:'clientCode',
          label:'客户编码',
          name:'pattern',
          placeholder:'请输入CMIOT/PBOSS建档客户编码',
          type:'text',//tel  digit number textarea password 总共5种类型
          maxlength:"128",
          showWordLimit:false,
          colon:true,//是否添加冒号
          required:this.isrequiredFn() ? true : false,//是否必填
          rules:[{pattern: this.isrequiredFn() ? /\S/ : null}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        //选择器
        {
          // titleThree:'three',
          state:'select',//展示那种类型
          value:'clientIndustry',
          label:'所属行业',
          columns:this.industryArray,
          name:'pattern',
          placeholder:'请选择客户所属行业',
          type:'text',//tel  digit number textarea password 总共5种类型
          confirm:(valueData) =>{ //选择下拉框值回调
            this.backFn(valueData,'clientIndustry'); //vlaue选择回调的值，clientIndustry传递给this.formData中的属性值
          },
          showPicker:false,//下拉选择框隐藏
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//校验如果必填就要有校验
        },
        //客户信息end---------------------------------
        //项目信息start---------------------------------
        //项目状态选择
        {
          titleOne:'three',//显示第三个标题
          state:'select',//展示那种类型
          value:'projectStatus',
          label:'项目状态',
          columns:this.projectStatusArray,
          defaultIndex:'0', //更具索引显示对应的值
          name:'pattern',
          placeholder:'请选择项目状态',
          type:'text',//tel  digit number textarea password 总共5种类型
          confirm:(valueData) =>{ //选择下拉框值回调
            this.backFn(valueData,'projectStatus'); //vlaue选择回调的值，clientIndustry传递给this.formData中的属性值
          },
          showPicker:false,//下拉选择框隐藏
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//校验如果必填就要有校验
        },
        {
          state:'input',//展示那种类型
          value:'projectContractNumber',
          label:'项目合同编号',
          name:'pattern',
          placeholder:'请输入合同管理系统中的合同编号',
          type:'text',//tel  digit number textarea password 总共5种类型
          maxlength:"30",
          showWordLimit:false,
          colon:true,//是否添加冒号
          required:this.isrequiredFn() ? true : false,//是否必填
          rules:[{pattern: this.isrequiredFn() ? /\S/ : null}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        {
          state:'input',//展示那种类型
          value:'projectMoneyAmount',
          label:'项目金额(万元)',
          name:'pattern',
          placeholder:'请输入项目金额',
          maxlength:"16",
          showWordLimit:false,
          type:'number',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:this.isrequiredFn() ? true : false,//是否必填
          rules:[{pattern: this.isrequiredFn() ? /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,6})?))$/ : this.formData.projectMoneyAmount != '' ? /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,6})?))$/ : null}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        {
          state:'input',//展示那种类型
          value:'projectCardAmount',
          label:'项目卡量(万张)',
          name:'pattern',
          placeholder:'请输入项目卡量',
          maxlength:"16",
          showWordLimit:false,
          type:'number',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:this.isrequiredFn() ? true : false ,//是否必填
          rules:[{pattern: this.isrequiredFn() ? /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,4})?))$/ : this.formData.projectCardAmount != '' ? /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,4})?))$/ : null}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        {
          state:'input',//展示那种类型
          value:'openedCardAmount',
          label:'当前已开卡量(万张)',
          maxlength:"16",
          showWordLimit:false,
          name:'pattern',
          placeholder:'请输入已开卡量',
          type:'number',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:this.isrequiredFncurrent() ? true : false ,//是否必填
          rules:[{pattern: this.isrequiredFncurrent() ? /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,4})?))$/ : this.formData.openedCardAmount != '' ? /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,4})?))$/ : null}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        //项目信息end-------------------------------------------
        //测试区域信息start-----------------------------------------
        {
          titleOne:'four',
          state:'select',//展示那种类型
          value:'testType',
          label:'测试类型',
          columns:this.testClassArray,
          name:'pattern',
          placeholder:'请选择测试类型',
          type:'text',//tel  digit number textarea password 总共5种类型
          confirm:(valueData) =>{ //选择下拉框值回调
            this.backFn(valueData,'testType'); //vlaue选择回调的值，clientIndustry传递给this.formData中的属性值
          },
          showPicker:false,//下拉选择框隐藏
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//校验如果必填就要有校验
        },
        // {
        //   state:'select',//展示那种类型
        //   value:'testArea',
        //   label:'测试区域',
        //   columns:this.testAreaArray,
        //   name:'pattern',
        //   placeholder:'请输选择测试区域',
        //   type:'text',//tel  digit number textarea password 总共5种类型
        //   confirm:(valueData) =>{ //选择下拉框值回调
        //     this.backFn(valueData,'testArea'); //vlaue选择回调的值，clientIndustry传递给this.formData中的属性值
        //   },
        //   showPicker:false,//下拉选择框隐藏
        //   colon:true,//是否添加冒号
        //   required:true,//是否必填
        //   rules:[{pattern:/\S/}]//校验如果必填就要有校验
        // },
        // 地区选择另一种写法***************************
        {
          state:'regionSelect',//展示那种类型
          value:'testArea',
          label:'测试区域',
          columns:this.testAreaArray,
          name:'pattern',
          placeholder:'请选择测试区域',
          selectplaceholder:'请选择所在地区',
          type:'text',//tel  digit number textarea password 总共5种类型
          fieldNames: {
            value: 'id',
          },
          confirm:({selectedOptions}) =>{ //选择下拉框值回调
            let valueData = selectedOptions.map((option) => option.text).join('/');
            this.backFn(valueData,'testArea'); //vlaue选择回调的值，clientIndustry传递给this.formData中的属性值
          },
          showPicker:false,//下拉选择框隐藏
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//校验如果必填就要有校验
        },
        // ***************************************************

        {
          state:'input',//展示那种类型
          value:'specificArea',
          label:'具体地址',
          name:'pattern',
          maxlength:"300",
          rows:"3",
          showWordLimit:false,
          placeholder:'例如：X省X市XX街道XX路XX号',
          type:'text',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:this.formData.testType === '定点测试' ? true : false,//是否必填
          rules:[{pattern: this.formData.testType === '定点测试' ? /\S/ : null}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        
        {
          state:'input',//展示那种类型
          value:'bussinessScenarios',
          label:'业务场景',
          maxlength:"30",
          showWordLimit:false,
          name:'pattern',
          placeholder:'例如：烟感、停车、水务、门锁等',
          type:'text',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        //测试区域信息end----------------------------------------
        //收益和连接数预估start----------------------------------------
        {
          titleOne:'five',//显示第五个标题
          state:'input',//展示那种类型
          value:'pointSuggestions',
          label:'业务提升增量预估',//业务提升增量预估
          name:'pattern',
          placeholder:'例如：预估增量收入XXX元，连接数xx张',
          rows:"2",
          maxlength:"100",
          showWordLimit:false,
          type:'textarea',//tel  digit number textarea password 总共5种类型
          colon:true,//是否添加冒号
          required:true,//是否必填
          rules:[{pattern:/\S/}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        //收益和连接数预估end----------------------------------------
        //其他说明/建议start----------------------------------------
        {
          titleOne:'six',//显示第六个标题
          state:'input',//展示那种类型
          value:'additionalSuggestions',
          label:'',
          name:'pattern',
          rows:"3",
          maxlength:"300",
          showWordLimit:false,
          placeholder:'请输入',
          type:'textarea',//tel  digit number textarea password 总共5种类型
          colon:false,//是否添加冒号
          required:false,//是否必填
          // rules:[{pattern:/\S/}]//pattern校验规则 message提示语 如果必填就要有校验
        },
        //其他说明/建议end----------------------------------------

      ]
    }
  } 
}

</script>
<style lang='less' scoped>
.invertigation{
    // background-image: url('../../assets/image/bg.png');
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    // position: fixed;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    box-sizing: border-box;
    overflow-y:scroll;
    ::v-deep .van-field__label{
      width: auto;
    }
    ::v-deep .submitBox{
      text-align: center;
    }
    ::v-deep .van-button--info {
      width: 1.5rem;
    }
    ::v-deep .van-overlay{
        background-color: rgba(96,92,92,.4);
    }
    ::v-deep .van-button--info{
        background-color: #4471ff;
        border: 1px solid #4471ff;
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .tipsBox{
      font-size: 0.12rem;
      color: #fff;
    }
    .inputlablebox{
      font-size: 0.14rem;
      background: #fff;
      color: #646566;
      padding-bottom:  0.04rem;
      padding-left: 0.16rem;
      box-sizing: border-box;
      position: relative;
      .retuired-img{
        position: absolute;
        width: 0.11rem;
        height: 0.11rem;
        top: 0.02rem;
        left: 0.05rem;
      }
    }
    .topbox{
      font-size: 0.28rem;
      color: #fff;
      text-align: center;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      .backbox{
        display: flex;
        justify-content: space-between;
        .backimg{
          width: 0.3rem;
          height: 0.2rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        // .loginout-box{
        //   left: 0px;
        //   top: 0px;
        //   width: 0.4rem;
        // }
        .logoimg{
          width: 1rem;
          height: 0.3rem;
          margin-bottom: 0.2rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .titleBox{
      color: #315efb;
      background: #fff;
      font-weight: 600;
      font-size: 0.22rem;
      padding-bottom: 0.2rem;
      text-align: center;
      padding-top: 0.2rem;
      position: relative;
      span{
        padding-left: 0.36rem;
      }
      img{
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
}
</style>