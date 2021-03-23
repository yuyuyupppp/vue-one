import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Movie from '../views/Movie.vue'
import Xmov from '../views/Xmov.vue'
import Bj from '../views/Bj.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import store from '../store';
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Index
  },
  {
    path:'/movie',
    component:Movie
  },
  {
    path:'/xmov/:id',
    component:Xmov
  },
  {
    path:'/bj',
    component:Bj,
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局前置守卫
router.beforeEach((to,from,next)=>{
  if(to.matched.some(r=>r.meta.requireAuth)){
    // console.log(router);
    // console.log(to);
    if (store.state.isLogined == false || sessionStorage.getItem('isLogined') == false) {
      //因为需要跳转到登录前的路由,所以需要将登录前的路由作为
      //参数传递给login,当在login登录成功后,
      //再获取该参数并且跳转到这个路由地址
      router.push({ path: '/login',query:{path:to.fullPath} });
  } else {
      next();
  }
  }else{
    next();
  }
})
export default router
