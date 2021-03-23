<template>
    <div>
       <img  :src="data.jjpg">   
        <p id="tit">{{data.title}}
            <hr>
        <span>磁力:{{data.mag}}</span>
        <br>
        <p id="jie" v-html="data.jieshao"></p>
    </div>
</template>
<style scoped>
#tit{
    font: 500;
    font-size: 20px;
    color: navy;
    padding: 15px 0;
    margin: 0;
}
img{
    border: 0;
    transform: scale(0.8);
    width: 150px;
    float: left;
}
#jie{
    color: #333;
    padding: 1px;
}
</style>
<script>
export default {
    data(){
        return{
            data:[]
        }
    },
    mounted(){
        var id=this.$route.params.id;
        this.axios.get('/dy/xmovie/'+id).then(res=>{
           var data=res.data;
           //console.log(data);
           data.forEach(item=>{
               if(item.jjpg!=null){
                   item.jjpg=require('../assets/img/'+item.jjpg);
               }
               this.data=item;
               console.log(this.data)
           });
        })
    }
}
</script>