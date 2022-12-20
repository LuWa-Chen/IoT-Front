import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        country:"中国",
        province:"",
        city:"",
        year:"2020",
        month:"1",
        length:0
    },
    mutations: {
        change_country(state,newVal){
            state.country = newVal
        },
        change_province(state,newVal){
            state.province = newVal
        },
        change_city(state,newVal){
            state.city = newVal.slice(0,newVal.length-1)
        },
        change_year(state,newVal){
            state.year = newVal
        },
        change_month(state,newVal){
            state.month=newVal
            /*if(newVal<10){
                state.month = "0"+newVal
            }
            else{
                state.month=newVal
            }*/
            if(newVal==1||newVal==3||newVal==5||newVal==7||newVal==8||newVal==10||newVal==12){
                state.length=31
            }
            else if(newVal==4||newVal==6||newVal==9||newVal==11) {
                state.length=30
            }
            else if((state.year%4==0&&state.year%100!=0)||state.year%400==0) {
                state.length = 29
            }
            else {
                state.length=28
            }
        },
    },
    actions: {
    },
    modules: {
    }
})