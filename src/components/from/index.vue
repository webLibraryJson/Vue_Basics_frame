<!-- from表单组件 -->
<template>
    <div class="frombox">
        <van-form validate-first @failed="onFailed" @submit="onSubmit">
          <div class="fromgb">
          <div v-for="(item,index) in formList" :key="index">
            <!-- 基本信息标题 -->
            <slot v-if="item.titleOne === 'one'" name="titleOne"></slot>
            <!-- 客户信息标题 -->
            <slot v-if="item.titleOne === 'two'" name="titleTwo"></slot>
            <!-- 项目信息标题 -->
            <slot v-if="item.titleOne === 'three'" name="titleThree"></slot>
            <!-- 测试区域信息标题 -->
            <slot v-if="item.titleOne === 'four'" name="four"></slot>
            <!-- 收益和连接数预估标题 -->
            <slot v-if="item.titleOne === 'five'" name="five"></slot>
            <slot v-if="item.titleOne === 'five'" name="inputlable"></slot>
            <!-- 其他说明/建议标题 -->
            <slot v-if="item.titleOne === 'six'" name="six"></slot>
            <!-- 输入框  -->
            <van-field
            v-if="item.state === 'input'"
            v-model="formData[item.value]"
            :label="item.label"
            :name="item.name"
            :placeholder="item.placeholder"
            :type='item.type'
            :colon='item.colon'
            :maxlength='item.maxlength'
            :rows='item.rows'
            :show-word-limit='item.showWordLimit || false'
            :required='item.required'
            :rules="item.rules"
            />
            <!-- 选择器 -->
            <div v-if="item.state === 'select'">
              <van-field
              readonly
              clickable
              :name="item.name"
              :value="formData[item.value]"
              :label="item.label"
              is-link
              :placeholder="item.placeholder"
              @click="item.showPicker = true"
              :colon='item.colon'
              :required='item.required'
              :rules="item.rules"
              />
              <van-popup v-model="item.showPicker" position="bottom">
                <van-picker
                    :default-index="item.defaultIndex"
                    show-toolbar
                    :columns="item.columns"
                    @confirm="item.confirm"
                    @cancel="item.showPicker = false"
                />
              </van-popup>
            </div>
            <!-- 地区选择器 -->
            <div v-if="item.state === 'regionSelect'">
              <van-field
                v-model="formData[item.value]"
                is-link
                readonly
                :label="item.label"
                :placeholder="item.placeholder"
                @click="item.showPicker = true"
                :colon='item.colon'
                :required='item.required'
                :rules="item.rules"
              />
              <van-popup v-model="item.showPicker" round position="bottom">
                <van-cascader
                  active-color="#1989fa"
                  :title="item.selectplaceholder"
                  :options="item.columns"
                  @close="item.showPicker = false"
                  @finish="item.confirm"
                  :field-names="item.fieldNames"
                />
              </van-popup>
            </div>
            <!-- 日历选择器 -->
            <!-- <div v-if="item.state === 'selectDate'">
              <van-cell is-link title="选择单个日期" :value="date" @click="show = true" />
              <van-calendar v-model="show" @confirm="calendarFn" /> 
            </div> -->
          </div>
          </div>
            <div class="submitBox">
              <van-button round type="info" @click="savedata()">保存</van-button>
              <van-button round type="info" native-type="submit" @click="ishowsave = true">提交</van-button>
            </div>
        </van-form>  
        <slot name="tips"></slot>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props:{
    formList:{
      type:Array,
      default:() =>{
        return []
      }
    },
    formData:{
      type:Object,
      default:() =>{
        return {}
      }
    }
  },
  watch:{
  },
  data () {
    return {
      ishowsave:false,
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
    //日历函数
    // calendarFn(date) {
    //   console.log(date,'date');
    //   this.show = false;
    // },
    savedata(){
      this.ishowsave = false
      this.$emit('save');
    },
    //校验不通过
    onFailed(errorInfo) {
      if(this.ishowsave){
        Toast.fail('信息有误，请完善信息');
      }
    },
    //校验通过
    onSubmit(successInfo){
      if(this.ishowsave){
        this.$emit('event');
      }
    }
  }
}

</script>
<style lang='less' scoped>
.frombox{
  width: 100%;
  height: 100%;
  .fromgb{
    border-radius: 0.1rem;
    overflow: hidden;
  }
  .submitBox{
    margin: 0.16rem;
  }
}
</style>