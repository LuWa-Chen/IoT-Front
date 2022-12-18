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
    <button @click="getMonthInfo">整月按钮</button>
    <button @click="getYearInfo">整年按钮</button>
  </div>
</template>
<script>
// 引入组件
import InfectionYearStateChart from '../components/Histogram/InfectionYearStateChart.vue'
import InfectionMonthStateChart from '../components/Histogram/InfectionMonthStateChart.vue'
import mqtt from 'mqtt'
var client = null
//用户配置
const options = {
    connectTimeout: 4000,
     reconnectPeriod: 1000,
    clientId: 'mqtt_114514', 
    username: 'lilei', 
    password: '123456',  
    clean: true
}
//MQTT地址和主题
var mqttUrl='ws://123.60.110.3:8000/mqtt';
var topic="test/";
export default {
data(){
        return{
          dataList1: {
            choice:1,//选择
            place:'中国',//地区
            year:2020,
            valueList:
             [{
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
            "time": "2020-11-11"
        },
        {
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
            "time": "2020-11-12"
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-11-13"
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-11-14"
        },
        {
            "conformCount": 369,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-11-15"
        },
        {
            "conformCount": 375,
            "curedCount": 353,
            "deadCount": 0,
            "time": "2020-11-16"
        },
        {
            "conformCount": 375,
            "curedCount": 355,
            "deadCount": 0,
            "time": "2020-11-17"
        },
        {
            "conformCount": 377,
            "curedCount": 355,
            "deadCount": 0,
            "time": "2020-11-18"
        },
        {
            "conformCount": 378,
            "curedCount": 356,
            "deadCount": 0,
            "time": "2020-11-19"
        },
        {
            "conformCount": 378,
            "curedCount": 357,
            "deadCount": 0,
            "time": "2020-11-20"
        }
    ],
            forecastList:[]
          },
          dataList2:{
            choice:0,
            place:'中国',
            year:2020,
            month:4,
            valueList:[{
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
            "time": "2020-11-11"
        },
        {
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
            "time": "2020-11-12"
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-11-13"
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-11-14"
        },
        {
            "conformCount": 369,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-11-15"
        },
        {
            "conformCount": 375,
            "curedCount": 353,
            "deadCount": 0,
            "time": "2020-11-16"
        },
        {
            "conformCount": 375,
            "curedCount": 355,
            "deadCount": 0,
            "time": "2020-11-17"
        },
        {
            "conformCount": 377,
            "curedCount": 355,
            "deadCount": 0,
            "time": "2020-11-18"
        },
        {
            "conformCount": 378,
            "curedCount": 356,
            "deadCount": 0,
            "time": "2020-11-19"
        },
        {
            "conformCount": 378,
            "curedCount": 357,
            "deadCount": 0,
            "time": "2020-11-20"
        }]
        },
        sendMonthInfo:{
          cityName: "嘉定区",
          countryName: null,
          length: 30,
          provinceName: "上海市",
          time: "2020-9-1"
        },
        sendYearInfo:{
          countryName: "不丹",
          cityName: null,
          length: 0,
          provinceName: null,
          time: "2020"
        }
    }
},
    mounted() {
      //MQTT连接
      this.mqttMsg();
      this.$refs.StateChart1.initChart();
      this.$refs.StateChart2.initChart();
    },
    destroyed(){
    if(client) {
      client.end() //离开页面的时候  关闭mqtt连接
      client = null
    }
    },
    methods:{
      //整月按钮
      //绑定按钮，用来向订阅的主题发送消息以及接受订阅的内容
      getMonthInfo(){
        let URL='api/send'
        if(this.sendMonthInfo.countryName==null)//判定范围为中国
        {
          URL+='_to_china'
        }
        else//范围在外国
        {
          URL+='_to_nation'
        }
        let that=this
        //后端接口
        this.axios({
        method:'post',
        url:URL,
        headers:{
          "Content-Type":"application/json"
        },
        transformRequest: [function(data) {
          data = JSON.stringify(data)
          return data
        }],
        params: {},
        data: {
            cityName: that.sendMonthInfo.cityName,
            countryName: that.sendMonthInfo.countryName,
            length: that.sendMonthInfo.length,
            provinceName: that.sendMonthInfo.provinceName,
            time: that.sendMonthInfo.time
        } 
      }).then(function(response) {
        //修改表中的附属数据，包括地点时间等

        that.dataList2.place=[]//重置地区名
        if(that.sendMonthInfo.countryName!=null)
          that.dataList2.place+=that.sendMonthInfo.countryName+'-'
        if(that.sendMonthInfo.provinceName!=null)
          that.dataList2.place+=that.sendMonthInfo.provinceName+'-'
        that.dataList2.place+=that.sendMonthInfo.cityName
        that.dataList2.year=that.sendMonthInfo.time.substring(0,4)//重置年
        that.dataList2.month=that.sendMonthInfo.time.substring(5,7)
        if(that.dataList2.month[1]=='-')
        that.dataList2.month=that.dataList2.month.substring(0,1)//重置月
      console.log(URL)
      //将后端传入的数据发布到主题
      client.publish(topic, JSON.stringify(response.data.content), 2, error => {
        if (!error) {
          console.log('----> ', '启动发送成功')
        }
      })
    })
    .catch(function(error) {
      console.log(error)
      console.log(JSON.stringify(that.sendMonthInfo))
    });
      },
      getYearInfo(){
         let URL='api/send'
        if(this.sendYearInfo.countryName==null)
        {
          URL+='_to_china'
        }
        else
        {
          URL+='_to_nation'
        }
        let that=this
        this.axios({
        method:'post',
        url:URL,
        headers:{
          "Content-Type":"application/json"
        },
        transformRequest: [function(data) {
          data = JSON.stringify(data)
          return data
        }],
        params: {},
        data: {
            cityName: that.sendYearInfo.cityName,
            countryName: that.sendYearInfo.countryName,
            length: that.sendYearInfo.length,
            provinceName: that.sendYearInfo.provinceName,
            time: that.sendYearInfo.time
        } 
      }).then(function(response) {
        //修改表中的附属数据，包括地点时间等

        that.dataList1.place=[]//重置地区名
        if(that.sendMonthInfo.countryName!=null)
          that.dataList1.place+=that.sendMonthInfo.countryName+'-'
        if(that.sendMonthInfo.provinceName!=null)
          that.dataList1.place+=that.sendMonthInfo.provinceName+'-'
        that.dataList1.place+=that.sendMonthInfo.cityName
        that.dataList1.year=that.sendMonthInfo.time.substring(0,4)//重置年
      console.log(response)
      client.publish(topic, JSON.stringify(response.data.content), 2, error => {
        if (!error) {
          console.log('----> ', '启动发送成功')
        }
      })
    })
    .catch(function(error) {
      console.log(error)
      console.log(JSON.stringify(that.sendYearInfo))
    });
      },
      //MQTT连接
      mqttMsg () {
      if (!client) {
        client = mqtt.connect(mqttUrl, options)
      }
      // mqtt连接
      client.on('connect', (e) => {
        console.log(e, "MQTT连接成功")
        client.subscribe(topic, { qos: 2 }, (error) => {  // qos 为通道
          if (!error) {
            console.log('消息订阅成功')
          } else {
            console.log('消息订阅失败')
          }
        })
      })
      // 接收消息处理
      client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息---->>', message.toString())
        this.mqMsg = message.toString()
        let List=JSON.parse(message)
        if(List.length<=12)//返回长度<=12，认定为是返回的整年数据
        {
          this.dataList1.valueList=List
          this.$refs.StateChart1.initChart();
          console.log(this.dataList1.valueList)
        }
        else
        {
          this.dataList2.valueList=List
          this.$refs.StateChart2.initChart();
          console.log(this.dataList2.valueList)
        }
      })
      // 断开发起重连
      client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    },
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
