import Vue from 'vue'
import VueRouter from 'vue-router'
import Dhzl from '../views/Dhzl.vue'
import Dhlb from '../views/Dhlb.vue'
import Xdhzl from '../views/Xdhzl.vue'
import Wzad from '../views/Wzad.vue'
import Wzlb from '../views/Wzlb.vue'
import Xwzlb from '../views/Xwzlb'
import Cmovie from '../views/Cmovie'
import Editor from '../components/zz/Editor.vue'
import Lmovie from '../views/Lmovie'
import Tjbj from '../views/Tjbj'
import Bjlb from '../views/Bjlb'
import Login from '../views/Login'
import Register from '../views/Register'
import store from '../store';
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/tjbj',
    component:Tjbj,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/bjlb',
    component:Bjlb,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/editor',
    component:Editor,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/',
    component:Dhzl,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/dhzl',
    component: Dhzl,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/dhlb',
    component:Dhlb,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/xdhzl/:id',
    component:Xdhzl,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/wzad',
    component:Wzad,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/wzlb',
    component:Wzlb,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/xwzlb/:id',
    component:Xwzlb,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/cmovie',
    component:Cmovie,
    meta: {
      requiresAuth:true
    }
  },
  {
    path:'/lmovie',
    component:Lmovie,
    meta: {
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  //检测to的meta中是否包含requiresAuth属性，如包含则进行检测
  //console.log(to);
  if (to.matched.some(r => r.meta.requiresAuth)) { 
      //如果store中isLogined为false或sessionStorage中的isLogined为false
      //则跳转到登录路由
    if (store.state.isLogined == false || sessionStorage.getItem('isLogined') == false) {
          //因为需要跳转到登录前的路由,所以需要将登录前的路由作为
          //参数传递给login,当在login登录成功后,
          //再获取该参数并且跳转到这个路由地址
          router.push({ path: '/login',query:{path:to.fullPath} });
      } else {
          next();
      }
  }
  else {
      next();
  }
});

export default router
