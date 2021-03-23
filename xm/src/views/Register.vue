<template>
    <div class="main">
        <mt-field type="text"
         label="用户名"
         v-model="username"
         placeholder="请输入4~9位字母或数字"
         :state="a"
         @blur.native.capture="txtName"
         ></mt-field>
        <mt-field type="password"
         label="密码"
         v-model="password"
         placeholder="请输入6~12位字母或数字"
         :state="b"
         @blur.native.capture="txtPass"
         ></mt-field>
         <mt-field type="password"
         label="确认密码"
         v-model="conpassword"
         placeholder="确认密码"
         :state="c"
         @blur.native.capture="conPass"
         >
         </mt-field>
         <mt-button
          type="primary"
          size="large"
          @click="register"
          >
          免费注册
          </mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            conpassword:'',
            a:'',
            b:'',
            c:''
        }
    },
    methods:{
      txtName(){
         var reg=/^\w{4,9}$/;
         if(!this.validate(this.username,reg)){
             this.$toast({
                 message:'用户名需为5~9位字母或数字',
                 position:'middle',
                 duration:3000
             })
             this.a="error"
             return false;
         }else{
             this.a="success"
             return true;
         }
      },
      txtPass(){
          var reg=/^\w{6,12}$/;
          if(!this.validate(this.password,reg)){
              this.$toast({
                  message:'密码需为输入6~12位字母或数字',
                  position:'middle',
                  duration:3000
              })
              this.b="error"
              return false;
          }else{
              this.b="success"
              return true;
          }
      },
      conPass(){
          if(this.password!=this.conpassword){
              console.log(this.password);
              console.log(this.conpassword);
              this.$toast("确认密码错误");
              this.c="error";
              return false;
          }else{
              this.c="success";
              return true;
          }
      },
      register(){
          if(!this.txtName()){
              
          }else if(!this.txtPass()){
             
          }else if(!this.conPass()){

          }
          else{
              console.log(this.username);
             this.axios.post('/dy/register',`username=${this.username}&password=${this.password}`).then(res=>{
                 console.log(res.data);
                 if(res.data=='0'){
                     this.$messagebox('注册提示','对不起用户已经存在');
                 }else{
                    this.$messagebox.confirm('用户注册成功,是否立即登录?','注册成功',{
                        confirmButtonText:'是',
                        cancelButtonText:'否'
                    }).then(action=>{
                        this.$router.push('/login');
                    }).catch(err=>{
                        this.$router.push('/');
                    })
                 }
             })
          }

      },
      validate(txt,reg){
          if(reg.test(txt)){
              return true;
          }else{
              return false;
          }
      }
    }
}
</script>