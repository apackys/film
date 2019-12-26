import Vue from 'vue'
import Vuex from 'vuex'
import city from '@/store/city'

Vue.use(Vuex)

export default new Vuex.Store({
     modules:{
         city,
     }   
})