<template>
    <table>
        <thead>
            <tr>
            <td>id</td>
            <td>title</td>
            <td>content</td>
            <td>操作</td>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(elem,i) of se" :key="i">
                <td>{{elem.id}}</td>
                <td>{{elem.title}}</td>
                <td>{{elem.content.slice(0,20)}}</td>
                <td>
                   <router-link :to="`/`" class="sc"><mt-button style="default">修改</mt-button></router-link>
                     <mt-button type="default" @click="del(elem.id)" class="sc">删除</mt-button> 
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    data(){
        return{
            se:[]
        }
    },
    methods:{
        del(a){
            console.log('删除');
            this.axios.delete('/dy/dbjlb/'+a).then(res=>{
                console.log(res.data);
                if(res.data==1){
                    this.$toast('删除成功')
                }
            }).then(()=>{this.$router.go(0)})
        }
    },
    mounted(){
        this.axios.get('/dy/bjlb').then(res=>{
            console.log(res.data);
            this.se=res.data;
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