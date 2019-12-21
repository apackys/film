import Vue from 'vue'
import Router from 'vue-router'
import Movie from './movie'
import Mine from './mine'
import Cinema from './cinema'
Vue.use(Router)

export default new Router({
  
  routes: [
    Movie,
    Mine,
    Cinema,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})
