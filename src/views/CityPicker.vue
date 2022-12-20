<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
    <div class="dis-flex">
      <div class="gy-label required">:</div>
      <div class="province">
        <!--省-->
        <el-form-item prop="province">
          <el-select v-model="ruleForm.province" placeholder="选择省" @change="selectProvince" class="select-province" style="width: 142px;">
            <el-option
              v-for="item in provinceData"
              :key="item.code"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <!--市-->
        <el-form-item prop="city">
          <el-select v-model="ruleForm.city" placeholder="选择市" @change="selectCity" class="select-city" style="width: 142px;">
            <el-option
              v-for="item in cityData"
              :key="item.code"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

      </div>
    </div>
  </el-form>
</template>

<script>
import addressData from '../components/address.json'
export default {
  data() {
    let validateMobile = (rule, value, callback) => {
      if(!!value && !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)){
        callback(new Error('请输入正确格式的电话！'))
      } else {
        callback()
      }
    }
    const validateCity = (rule, value, callback) => {
      if (!value) {
        if (this.cityFlag === 0) {
          callback(new Error('请选择市'))
        }
      }
      else {
        callback()
      }
    }
    const validateArea = (rule, value, callback) => {
      if (!value) {
        if (this.areaFlag === 0) {
          callback(new Error('请选择区'))
        }
      }
      else {
        callback()
      }
    }
    const validateTown = (rule, value, callback) => {
      if (!value) {
        if (this.townFlag === 0) {
          callback(new Error('请选择镇'))
        }
      }
      else {
        callback()
      }
    }
    return {
      ruleForm: {
        province: '',
        city: '',
        area: '',
        town: '',
      },
      // 省数据
      provinceData: [],
      // 市数据
      cityFlag: 0,
      cityData: [],
      // 区数据
      areaFlag: 0,
      areaData: [],
      // 镇数据
      townFlag: 0,
      townData: [],
      rules: {
        province: [{required: true, trigger: 'change', message: '请选择省'}],
        city: [{required: true, trigger: 'change', validator: validateCity}],
        area: [{required: true, trigger: 'change', validator: validateArea}],
        town: [{required: true, trigger: 'change', validator: validateTown}],
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载省市区镇数据
    loadData() {
      this.provinceData = addressData
      // 根据接口返回的加载省市区镇进行回填
      this.provinceData.map(province=>{
        if(this.ruleForm.province&&this.ruleForm.province==province.name){
          this.cityData = province.children
          this.cityData.map(city=>{
            if(this.ruleForm.city&&this.ruleForm.city==city.name){
              this.areaData = city.children
              this.areaData.map(area=>{
                if(this.ruleForm.streetOrTown&&this.ruleForm.area==area.name){
                  this.townData = area.children
                }else{
                  // this.townData = town.children
                }
              })
            }else{
              // this.areaData = city.children
            }
          })
        }else{
          // this.cityData = province.children
        }
      })
    },

    // 选择省
    selectProvince(value) {
      this.provinceData.forEach((item, index) => {
        if (item.name === value) {
          this.cityData = item.children
          this.ruleForm.city = item.children[0].name || ''
          this.cityFlag = 1
          this.ruleForm.area = item.children[0].children[0].name || ''
          this.areaFlag = 1
          this.ruleForm.town = item.children[0].children[0].children[0].name || ''
          this.townFlag = 1
          this.areaData = this.cityData[0].children
          this.townData = this.areaData[0].children
          return false
        }
      })
      this.$store.commit('change_province',value)
      console.log('选择了省' + value)
    },
    // 选择市
    selectCity(value) {
      this.cityData.forEach((item, index) => {
        if (item.name === value) {
          this.areaData = item.children
          this.ruleForm.area =  item.children[0].name || ''
          this.areaFlag = 1
          this.ruleForm.town = item.children[0].children[0].name || ''
          this.townFlag = 1
          this.townData = this.areaData[0].children
          return false
        }
      })
      this.$store.commit('change_city',value)
      console.log('选择了市' + value)
    },
    // 选择区
    selectArea(value) {
      this.areaData.forEach((item, index) => {
        if (item.name === value) {
          this.townData = item.children
          this.ruleForm.town = item.children[0].name || ''
          this.townFlag = 1
          return false
        }
      })
      console.log('选择了区' + value)
    },
    // 选择镇
    selectTown(value) {
      console.log('选择了镇' + value)
    },
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  .el-input,.el-select{
    width: 70%;
  }
  .gy-label{
    font-size: 15px;
    padding-right: 10px;
    margin-right: 10px;
    color: rgb(102, 102, 102);
    font-weight: 700;
    width: 150px;
    text-align: right;
    line-height: 40px;
    &.required:before{
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
      font-size: 16px;
    }
  }
}
</style>
<style lang="scss">
.province{
  .el-form-item{
    float: left;
    margin-right: 22px;
    .el-form-item__content{
      margin-left: 0!important;
    }
  }
}
</style>