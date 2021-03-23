<template>
<div>
    <div id="shang">
        <mt-header title="<・)))><<网?">
        <div slot="right" class="shortcut" v-if="!isLogined">
        <router-link to="/register">
        <mt-button>注册</mt-button>
        </router-link>
        <router-link to="/login">
        <mt-button>登录</mt-button>
        </router-link>
        </div>
        <mt-button slot="right" v-else @click="logout">
            <img src="../assets/images/logout.png" slot="icon">
        </mt-button>
        </mt-header>
    </div>
<div id='zong'>
    <ul id='zhu'>
        <li>
           <span @click="aa">网址导航</span>
           <ul  v-show="a">
               <li><router-link to="/dhzl">添加dhzl</router-link></li>
               <li><router-link to="/dhlb">dhzl列表</router-link></li>
               <li><router-link to="/wzad">添加网址</router-link></li>
               <li><router-link to="/wzlb">网址列表</router-link></li>
           </ul>
        </li>
        <li>
            <span @click="bb">电影推荐</span>
           <ul v-show="b">
               <li><router-link to="/cmovie">添加电影</router-link></li>
               <li><router-link to="/lmovie">电影列表</router-link></li>
           </ul>
        </li>
        <li>
            <span @click="cc">学习笔记</span>
            <ul v-show="c">
                <li><router-link to="/tjbj">添加笔记</router-link></li>
                <li><router-link to="/bjlb">笔记列表</router-link></li>
            </ul>
        </li>
     </ul>
</div> 
</div>
</template>
<script>
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
export default {
    computed:{
        ...mapState([
            'id',
            'username',
            'isLogined'
        ])
    },
   data(){
       return{
           a:false,
           b:false,
           c:false
       }
   },
   methods:{
       ...mapMutations({
           sLogout:'logout'
       }),
        logout(){
            //修改state的状态
            this.sLogout();
        },
       aa(){
           this.a=true;
           this.b=false;
           this.c=false;
       },
       bb(){
           this.b=true;
           this.a=false;
           this.c=false;
       },
       cc(){
           this.c=true;
           this.a=false;
           this.b=false;
       }
   }
}
</script>
<style>
.mint-header{
    background-color: #333333 !important;
}
#shang a{
    margin: 0 5px;
    color: #9d9d9d;
    display: block;
    float: right;
}
/* 原生剪切 */
 #zhu>li>span{     
            display: block;
            width: 85px;
            height: 35px;
            background: pink;
            text-align: center; 
            border-radius: 3px;   
            font: normal small-caps 400 16px '宋体';   
            line-height: 35px;
            border-bottom: 1px dashed #888;   
            cursor: pointer;  
        }
        /* span+ul{
            display: none;
        } */
      #zhu>li>ul>li{
            box-sizing: border-box;
            width:85px;
            height: 25px;
            font: normal small-caps 400 14px '宋体';   
            border:1px solid #e6e6e6;
            line-height: 25px;  
            border-radius:3px;
            text-align: center;
            line-height: 25px;
        }
        .xianshi{
            display: block;
        }
        #zong>#zhu{
            float: left;
             height: 600px;
            width: 86px;
        }
        #zhu a{
            text-decoration: none;
            color:#666;
        }
        
/*  */
</style>