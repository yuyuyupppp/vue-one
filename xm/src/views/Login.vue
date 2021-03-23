<template>
    <div class="main">
        <mt-field
        type="text"
        label="用户名"
        v-model="username">
        </mt-field>
        <mt-field
        type="password"
        label="密码"
        v-model="password">   
        </mt-field>
        <mt-button type="primary" size="large" @click="login">
            快速登录
        </mt-button>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
        ...mapMutations([
            'logined'
        ]),
        login(){
            this.axios.post('/dy/login','username='+this.username+'&password='+this.password).then(res=>{
                var code=res.data.code;
                console.log(res);
                if(code==0){
                    this.$messagebox.alert('用户名或密码错误',"登录失败");
                }else{
                    //登录成功修改state状态
                    this.logined({id:res.data.id,username:res.data.username});
                    sessionStorage.setItem('id',res.data.id);
                    sessionStorage.setItem('username',res.data.username);
                    sessionStorage.setItem('isLogined',true);
                    if(this.$route.query.path){
                        this.$router.push(this.$route.query.path);
                    } else {
                        this.$router.push('/');
                    }
                }
            })
        }
    }
}
</script>