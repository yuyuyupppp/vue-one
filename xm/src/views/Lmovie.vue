<template>
    <div>
        <table>
      <thead>
          <tr>
              <td>id</td>
              <td>title</td>
              <td>jjpg</td>
              <td>pingfen</td>
              <td>mag</td>
              <td>操作</td>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(elem,i) of lb" :key="i">
              <td>{{elem.id}}</td>
              <td>{{elem.title}}</td>
              <td>{{elem.jjpg}}</td>
              <td>{{elem.pingfen}}</td>
              <td>{{elem.mag}}</td>
              <td>
                 <router-link :to="`/`" class="sc"><mt-button style="default">修改</mt-button></router-link>
                 <mt-button type="default" @click="del(elem.id)" class="sc">删除</mt-button>
              </td>
          </tr>
      </tbody>
  </table>
    </div>
</template>
<script>
export default {
     methods:{
        del(a){
            this.axios.delete(`/dy/dlmovie/${a}`).then(res=>{
                if(res.data==1){
                    this.$toast('删除成功');
                }  
            })
            this.$router.go(0);
        }
    },
    data(){
        return{
            lb:''
        }
    },
    mounted(){
        this.axios.get('/dy/lmovie').then(res=>{
          this.lb=res.data;
        })
    }
}
</script>
<style scoped>
ul>li{
    float: left;
    display: block;
    padding: 5;
    border: 1px solid salmon;
    border-radius: 5px;
    margin: 0 10px;
    cursor: pointer;
}
.sc{
    margin: 0 5px;
}
table{
    float: left;
    width: 80%;
    text-align: center;
    border-collapse: collapse;
    border-bottom:1px solid #ddd;
    color:#666;
    font-size:20px;

}
table th{
    border-bottom:1px solid #666;
    padding:5px 0;
}
table td{
    border-bottom:1px dotted #ddd;
    text-align:center;
    padding:5px 0;
}
table td a{
    color:#005aa0;
    text-decoration:none;
}
</style>