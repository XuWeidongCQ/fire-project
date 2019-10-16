import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Main from '@/pages/home/Main'
import SimulationPage from '@/pages/home/components/SimulationPage/SimulationPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'',
      name:'Login',
      component:Login,
    },
    {
      path:'/main',
      component:Main,
      children:[
        {
          path:'',
          component:()=>{return import('@/pages/home/components/HomePage/HomePage')}
        },
        {
          path:'simulation',
          component:SimulationPage
        },
        {
          path:'info-input',
          component:()=>{ return import('@/pages/home/components/InfoInputPage/InfoInputPage')}
        }
      ]
    },
  ]
})
