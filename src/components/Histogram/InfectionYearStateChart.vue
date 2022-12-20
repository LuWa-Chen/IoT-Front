<template>
  <div
    ref="InfectionYearStateChart"
    style="width: 100%; height: 100%"
    />
</template>
<script>

import * as echarts from 'echarts'
let monthList= ['01','02','03','04','05','06','07','08','09','10','11','12']
let chart = null
let titleList=['感染人数','治愈人数','死亡人数']
let dataList=[]
let forecastList1=[]
let forecastList2=[]
let forecastList3=[]
let Use_time=''
export default {
  props: {
    data: {
      type:Object,
      default () {
        return {
          choice:0,
          place:'',
          year:0,
          valueList: [],
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
      chart = this.$echarts.init(this.$refs.InfectionYearStateChart);
      console.log('传入数据'+this.data.valueList[1].time)
      this.insertData();
      this.setOptions()
    },
    insertData(){
      dataList=[]
      forecastList1=[]
      forecastList2=[]
      forecastList3=[]
      let i=0,k;
      let m=0;
      while(i<12)
      {
        if(m<this.data.valueList.length)
        {
        Use_time=this.data.valueList[m].time.substring(5,7)
        if(Use_time==monthList[i])
        {
        if(this.data.choice==0)
        dataList.push(this.data.valueList[m].conformCount);
        else if(this.data.choice==1)
        dataList.push(this.data.valueList[m].curedCount);
        else if(this.data.choice==2)
        dataList.push(this.data.valueList[m].deadCount);
        m++
        i++
        }
        else{
          dataList.push(0)
          i++
        }
        }
        else
        {
        dataList.push(0)
        i++
        }
      }
      if(this.data.forecastList!=[])
      {
        for(k=0;k<this.data.forecastList.length;k++){
        forecastList1.push(this.data.forecastList[k].conformCount);
        forecastList2.push(this.data.forecastList[k].curedCount);
        forecastList3.push(this.data.forecastList[k].deadCount);
      }
      }
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
            data: dataList
          },
          {
            name: '预测总',
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                return value + ' 人';
              }
           },
           data: forecastList1
         },
        {
            name: '预测治愈',
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                return value + ' 人';
              }
           },
           data: forecastList2
         },
        {
            name: '预测死亡',
            type: 'line',
            tooltip: {
                valueFormatter: function (value) {
                return value + ' 人';
              }
           },
           data: forecastList3
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
           monthList[Math.min(params.dataIndex + zoomSize / 2, dataList.length - 1)]
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