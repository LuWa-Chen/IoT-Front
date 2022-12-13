<template>
  <div
    ref="InfectionYearStateChart"
    style="width: 100%; height: 100%"
    />
</template>
<script>

import * as echarts from 'echarts'
let monthList= ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
let chart = null
let titleList=['感染人数','治愈人数','死亡人数']
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          choice:0,
          place:'',
          year:0,
          valueList: [[]],
          forecastList:[],
        }
      }
    }
  },
  methods: {
    initChart () {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.InfectionYearStateChart)
      this.setOptions()
    },
    setOptions() {
      var salvProValue = monthList;
      var salvProMax = [];
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[500000])
      }
      let option = {
        title: //表头
         {
          text: '特定地区'+titleList[this.data.choice]+'统计图（整年）',
          subtext: this.data.place+'-'+this.data.year+'年',
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
         toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              saveAsImage: { show: true }
            }
        },
        xAxis: {
          data: monthList,
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
            data: this.data.valueList[this.data.choice]
          },
          {
            name: '预测',
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                return value + ' 人';
              }
           },
           data: this.data.forecastList
         }
       ]
      }
      const zoomSize = 6;
      chart.on('click', function (params) {
        console.log(monthList[Math.max(params.dataIndex - zoomSize / 2, 0)]);
       chart.dispatchAction({
         type: 'dataZoom',
         startValue: monthList[Math.max(params.dataIndex - zoomSize / 2, 0)],
         endValue:
           monthList[Math.min(params.dataIndex + zoomSize / 2, this.data.valueList[this.data.choice].length - 1)]
        });
      });
      option&chart.setOption(option)
    }
  },
  watch: {
    data: {
      handler(newList, oldList) {
        if (oldList != newList) {
          this.setOptions()
        }
      },
      deep: true
    }
  }
}
</script>