<template>
  <div>
    <div class="nav">
    <InfectionYearStateChart
      ref="StateChart1"
      :data="dataList1"
      style="width:500px;height:380px"
    />
    <InfectionMonthStateChart
      ref="StateChart2"
      :data="dataList2"
      style="width:500px;height:380px"
    />
    </div>
    <div class="left">
      <button @click="search(1)">查看感染人数</button>
      <button @click="search(2)">查看治愈人数</button>
      <button @click="search(3)">查看死亡人数</button>
    </div>
      <div class="right">
      <button @click="search1(1)">查看感染人数</button>
      <button @click="search1(2)">查看治愈人数</button>
      <button @click="search1(3)">查看死亡人数</button>
    </div>
    <div class="nav">
      <button @click="getYearInfo">整年按钮</button>
      <button @click="getMonthInfo">整月按钮</button>
      <button @click="getForecastInfo">预测按钮</button>
    </div>
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
    clientId: 'mqtt_1', 
    username: 'lilei', 
    password: '123456',  
    clean: true
}
//MQTT地址和主题
var mqttUrl='ws://123.60.110.3:8000/mqtt';
export default {
data(){
        return{
          dataList1: {
            choice:1,//选择,0总人数，1治愈，2死亡
            place:'中国',//地区
            year:2020,
            valueList:
             [{
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
            "time": "2020-01-03"
        },
        {
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
            "time": "2020-02-12"
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-03-13"
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-04-14"
        },
        {
            "conformCount": 369,
            "curedCount": 345,
            "deadCount": 0,
            "time": "2020-05-15"
        },
        {
            "conformCount": 375,
            "curedCount": 353,
            "deadCount": 0,
            "time": "2020-06-16"
        },
        {
            "conformCount": 375,
            "curedCount": 355,
            "deadCount": 0,
            "time": "2020-07-17"
        },
        {
            "conformCount": 377,
            "curedCount": 355,
            "deadCount": 0,
            "time": "2020-08-18"
        },
        {
            "conformCount": 378,
            "curedCount": 356,
            "deadCount": 0,
            "time": "2020-09-19"
        },
        {
            "conformCount": 378,
            "curedCount": 357,
            "deadCount": 0,
            "time": "2020-12-20"
        }],
            forecastList:[{
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
        },
        {
            "conformCount": 364,
            "curedCount": 342,
            "deadCount": 0,
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
        },
        {
            "conformCount": 364,
            "curedCount": 345,
            "deadCount": 0,
        },
        {
            "conformCount": 369,
            "curedCount": 345,
            "deadCount": 0,
        },
        {
            "conformCount": 375,
            "curedCount": 353,
            "deadCount": 0,
        },
        {
            "conformCount": 375,
            "curedCount": 355,
            "deadCount": 0,
        },
        {
            "conformCount": 377,
            "curedCount": 355,
            "deadCount": 0,
        },
        {
            "conformCount": 378,
            "curedCount": 356,
            "deadCount": 0,
        },
        {
            "conformCount": 378,
            "curedCount": 357,
            "deadCount": 0,
        }]
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
        },
        sendForecastInfo:{
          countryName: "不丹",
          cityName: null,
          length: 0,
          provinceName: null,
          time: "2022"
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
      search(i){
        if(i==1)
        this.dataList1.choice=0;
        else if(i==2)
        this.dataList1.choice=1;
        else if(i==3)
        this.dataList1.choice=2;
        this.$refs.StateChart1.initChart();
      },
      search1(i){
        if(i==1)
        this.dataList2.choice=0;
        else if(i==2)
        this.dataList2.choice=1;
        else if(i==3)
        this.dataList2.choice=2;
        this.$refs.StateChart2.initChart();
      },
      getForecastInfo(){
        let URL='api/getCountryForecast'
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
            cityName: that.$store.state.city,
            countryName: null,
            length: 0,
            provinceName: that.$store.state.province,
            time: "2022"
        }
        }).then(function(response){
        client.publish('forecast/', JSON.stringify(response.data.content), 2, error => {
        if (!error) {
          console.log('----> ', '启动发送成功')
        }
      })
        })

      },
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
            cityName: that.$store.state.city,
            countryName: null,
            length: that.$store.state.length,
            provinceName: that.$store.state.province,
            time: that.$store.state.year+"-"+that.$store.state.month+"-1"
        }
      }).then(function(response) {
        //修改表中的附属数据，包括地点时间等
        console.log(that.$store.state.city)
        console.log(that.$store.state.province)
        console.log(that.$store.state.length)
        console.log(that.$store.state.year+"-"+that.$store.state.month+"-01")
        that.dataList2.place=[]//重置地区名
        if(that.sendMonthInfo.countryName!=null)
          that.dataList2.place+=that.sendMonthInfo.countryName+'-'
        if(that.$store.state.province!=null)
          that.dataList2.place+=that.$store.state.province+'-'
        that.dataList2.place+=that.$store.state.city
        that.dataList2.year=that.$store.state.year//重置年
        that.dataList2.month=that.$store.state.month
        console.log(URL)
      //将后端传入的数据发布到主题
      client.publish('test/', JSON.stringify(response.data.content), 2, error => {
        if (!error) {
          console.log('----> ', '启动发送成功')
          console.log(response.data.content)
        }
      })
    })
    .catch(function(error) {
      console.log(error)
      console.log(JSON.stringify(that.$store.state.country))
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
            cityName: that.$store.state.city,
            countryName: null,
            length: parseInt(0),
            provinceName: that.$store.state.province,
            time: that.$store.state.year.toString()
        }
      }).then(function(response) {
        //修改表中的附属数据，包括地点时间等
        console.log(that.$store.state.year.toString()),
        console.log(0),
         console.log(that.$store.state.province),
         console.log(that.$store.state.city),
        that.dataList1.place=[]//重置地区名
        if(that.$store.state.country!=null)
          that.dataList1.place+=that.$store.state.country+'-'
        if(that.$store.state.province!=null)
          that.dataList1.place+=that.$store.state.province+'-'
        if(that.$store.state.city!=null)
        that.dataList1.place+=that.$store.state.city
        that.dataList1.year=that.$store.state.year//重置年
      console.log(response)
      client.publish('year/', JSON.stringify(response.data.content), 2, error => {
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
        client.subscribe('test/', { qos: 2 }, (error) => {  // qos 为通道
          if (!error) {
            console.log('消息订阅成功')
          } else {
            console.log('消息订阅失败')
          }
        })
        client.subscribe('year/', { qos: 2 }, (error) => {  // qos 为通道
          if (!error) {
            console.log('消息订阅成功')
          } else {
            console.log('消息订阅失败')
          }
        })
        client.subscribe('forecast/', { qos: 2 }, (error) => {  // qos 为通道
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
        if(topic=='forecast/')
        {
          this.dataList1.forecastList=List
          this.$refs.StateChart1.initChart();
          console.log(this.dataList1.forecastList)
        }
        else if(topic=='year/')//返回的整年数据
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
.nav {
  display:flex;
  flex-direction: row;
  justify-content: center;
}
.left {
  display:flex;
  flex-direction: row;
  justify-content: left;
  padding-left: 10%;

}
.right {
  display:flex;
  flex-direction: row;
  justify-content: right;
  padding-right: 10%;
}
</style>

