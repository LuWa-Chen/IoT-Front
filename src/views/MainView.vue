<template>
  <div>
    <div class="navbar">
       <div>选择对应时间
       <datepicker v-on:picked="picked"></datepicker></div>
       <div style="padding-left:30px;">选择国家或地区
       <CountrySelect ref="child" selected="cn" top="cn,jp,us,gb" ></CountrySelect></div>
    </div>
      <div class="navbar-next" >选择城市
      <CitySelect></CitySelect></div>
      <Chart></Chart>

  </div>
</template>


<script>

import datepicker from './DatePicker.vue'
import CountrySelect from './CountryPicker.vue'
import CitySelect from './CityPicker.vue'
import Chart from './HomeView.vue'

export default {
    name: "AddressComp",
    data() {
        return {
          freeMon:'',
        }
    },
    methods: {
      picked(year, month) {
        if(month < 10){
            this.freeMon = `${year}-0${month}`;
        }else{
            this.freeMon = `${year}-${month}`;
        }
      },
      getList(){

      },
      routerBack(){
        this.$router.go(-1);
      }
    },
    components: {
        CountrySelect,
        datepicker,
        CitySelect,
        Chart
    },
    mounted () {
      this.getList()
    }
}
</script>

<style>
.navbar {
  display:flex;
  width:100%;
  justify-content: center;/*水平居中*/
}
.navbar-next {
  display:flex;
  padding-left:105px;
  width:100%;
  justify-content: center;/*水平居中*/
}
</style>