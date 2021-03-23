<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>category</th>
                    <th>sort</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
             <tr  v-for="(elem,i) of neirong" :key="i">
                 <td>{{elem.id}}</td>
                 <td>{{elem.category}}</td>
                 <td>{{elem.sort}}</td>
                 <td>
                     <router-link :to="`/xdhzl/${elem.id}`" class="sc"><mt-button style="default">修改</mt-button></router-link>
                     <mt-button type="default" @click="del(elem.id)" class="sc">删除</mt-button>
                 </td>
            </tr>   
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            neirong:''
        }
    },
    methods:{
        del(a){
            this.axios.delete(`/wz/ddhzl/${a}`).then(res=>{
                if(res.data==1){
                    this.$toast('删除成功');
                }  
            })
            this.$router.go(0);
        }
    },
   mounted(){
       this.axios.get('/wz/sdhzl').then(res=>{
           this.neirong=res.data;
       })
   }
}
</script>
<style scoped>
.sc{
    margin: 0 5px;
}
table{
    float: left;
    width: 900px;
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