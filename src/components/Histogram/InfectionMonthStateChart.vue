<template>
  <div
    ref="InfectionMonthStateChart"
    style="width: 100%; height: 100%"
    />
</template>
<script>

import * as echarts from 'echarts'
let chart = null
let dayList=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18',
'19','20','21','22','23','24','25','26','27','28','29','30','31']
let titleList=['感染人数','治愈人数','死亡人数']
let dataList=[]
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          choice:0,
          place:'',
          year:0,
          month:0,
          valueList: []
        }
      }
    }
  },
  methods: {
    initChart () {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.InfectionMonthStateChart)
      this.insertData()
      this.setOptions()
    },
    insertData(){
      dataList=[]
      let i=0;
      for(i;i<this.data.valueList.length;i++){
        if(this.data.choice==0)
        dataList.push(this.data.valueList[i].conformCount);
        else if(this.data.choice==1)
        dataList.push(this.data.valueList[i].curedCount);
        else if(this.data.choice==2)
        dataList.push(this.data.valueList[i].deadCount);
      }
    },
    setOptions() {
      var salvProValue = dataList;
      var salvProMax = [];
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[500000])
      }
      let option = {
         title: {
          text: '特定地区'+titleList[this.data.choice]+'统计图（整月）',
          subtext: this.data.place+'-'+this.data.year+'年'+this.data.month+'月',
          left:'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
            color: '#999'
           }
         }
       },
        xAxis: {
          data: dayList.slice(0,dataList.length),
          axisLabel: //柱状图内字样
          {
            inside: true,
            color: '#fff'
          },
          axisTick: //x轴竖线
          {
            show: true
          },
          axisLine: //x轴粗线
          {
            show: true
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
       ],
       series: [
          {
            name:'现状',
            type: 'bar',
           showBackground: true,
           itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
               { offset: 0.5, color: '#188df0' },
               { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                 { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
             }
            },
            tooltip: {
              valueFormatter: function (value) {
              return value + ' 人';
            }},
            data: dataList
          }
       ]
      }
      const zoomSize = 6;
      chart.on('click', function (params) {
        console.log(dayList[Math.max(params.dataIndex - zoomSize / 2, 0)]);
       chart.dispatchAction({
         type: 'dataZoom',
         startValue: dayList[Math.max(params.dataIndex - zoomSize / 2, 0)],
         endValue:
           dayList[Math.min(params.dataIndex + zoomSize / 2, dataList.length - 1)]
        });
      });
      option&chart.setOption(option)
    }
  },
  watch: {
    data: {
      handler(newList, oldList) {
        if (oldList != newList) {
          this.insertData()
          this.setOptions()
        }
      },
      deep: true
    }
  }
}
</script>