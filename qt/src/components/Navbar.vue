<template>
    <div>
         <!-- 头部区域 -->
        <mt-header title="<・)))><<网么?">
            <mt-button icon="back" slot="left" @click="naf"></mt-button>
            <div slot="right" class="shortcut" v-if="!$store.state.isLogined">
               <router-link to="/register">
               <mt-button>注册</mt-button> 
               </router-link>
               <router-link to="/login">
              <mt-button>登录</mt-button>
              </router-link>
            </div>
            <div slot="right" v-else >
                <mt-button>
                    欢迎{{$store.state.username}}
                </mt-button>
               <mt-button @click="logout">
                    <img src="../assets/images/logout.png" slot="icon">
                </mt-button>
            </div>
           
        </mt-header>
        <!-- 头部区域 -->
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    methods:{
        ...mapMutations(
            {sLogout:'logout'}
        ),
        logout(){
            this.sLogout();
        },
        naf(){
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.shortcut a{
    color: #fff;
}
.mint-header{
    background:#333;
}
</style>