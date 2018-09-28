import Vue from 'vue'
import Router from 'vue-router'
import  Nprogress from 'nprogress'
import  'nprogress/nprogress.css'
const components = {
  layout:()=>import('@/views/layout'),
  home_page:()=>import('@/components/Home-Page'),
  register:()=>import('@/components/Register'),
  write_note:()=>import('@/components/Write-Note')
}

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      redirect:'index',
      children:[
        {
          path:'index',
          meta:{
            title:'首页'
          },
          component:components.home_page
        },{
          path:'register',
          meta:{
            title:'注册页'
          },
          component:components.register
        },
        {
          path:'write_note',
          meta:{
            title:'写笔记页面'
          },
          component:components.write_note
        }
      ]
    }
  ]
})
//全局钩子，在每个路由之前执行
router.beforeEach((to,from,next)=>{
Nprogress.start();
next();
})
router.afterEach((to,from)=>{
  Nprogress.done()
})

export default router
