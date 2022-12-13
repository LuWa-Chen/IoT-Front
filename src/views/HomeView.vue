<template>
  <div>
    <div class="demo">
    <InfectionYearStateChart
      ref="StateChart1"
      :data="dataList1"
      style="width: 100%; height: 380px"
    />
    </div>
    <div class="demo">
    <InfectionMonthStateChart
      ref="StateChart2"
      :data="dataList2"
      style="width: 100%; height: 380px"
    />
    </div>
  </div>
</template>
<script>
// 引入组件
import InfectionYearStateChart from '../components/Histogram/InfectionYearStateChart.vue'
import InfectionMonthStateChart from '../components/Histogram/InfectionMonthStateChart.vue'
export default {
data(){
        return{
          dataList1: {
            choice:1,//选择
            place:'中国',//地区
            year:2020,
            valueList: //二维数组，0为总人数，1为治愈人数，2为死亡人数
            [[68188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745],
            [88188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745],
            [48188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745]],
            forecastList:[]
          },
          dataList2:{
            choice:0,
            place:'中国',
            year:2020,
            month:4,
            valueList:[[68188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745,
            88188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745,
            88188, 35379,20100,23452,54312,14563],
            [88188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745],
            [48188, 35379,20100,23452,54312,14563,85923,54367,34567,12345,12345,56745]],
          }
        }
    },
    mounted () {
       this.$refs.StateChart1.initChart();
       this.$refs.StateChart2.initChart();
    },
    components: {
       InfectionYearStateChart,
       InfectionMonthStateChart
    }
}
</script>
<style>
.demo {
  width: 500px;
  height: 600px;
}
</style>
