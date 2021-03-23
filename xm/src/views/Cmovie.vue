<template>
    <div>
        <mt-field label="title" type="text" v-model="title"></mt-field>
        <mt-field label="pingfen" type="text" v-model="pingfen"></mt-field>
        <mt-field label="mag" type="text" v-model="mag"></mt-field>
        <!-- <mt-field label="jieshao" type="text" v-model="jieshao"></mt-field> -->
        <p>span</p><input id="ff" name="jjpg" type="file" accept="image/png,image/gif,image/jpeg">
   <!--  -->
   <div id="editor" class="editor" @input="change"></div>
<!--  -->
    <mt-button type="primary" size="normal" @click="tijiao">提交</mt-button>
    <mt-button type="primary" size="normal" class="aa">重置</mt-button>
    </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editor',
    mounted () {
        var editor = new E('#editor')
        editor.create()
    },
    data(){
       return{
           title:'',
           pingfen:'',
           jieshao:'',
           mag:'',
       }
    },
    methods:{
        change(e){
        this.jieshao=e.target.innerHTML;
        },
        tijiao(){
            console.log(this.jieshao);
            var ff=document.getElementById("ff");
            var file=ff.files[0];
            console.log(file);
            let param=new FormData();
            console.log(param);
            param.append('jjpg',file);
            param.append('title',this.title);
            param.append('pingfen',this.pingfen);
            param.append('jieshao',this.jieshao);
            param.append('mag',this.mag);
            let config={
                headers:{'Content-Type':'multipart/form-data'}
            }
           this.axios.post('/dy/cmovie',param,config).then(res=>{
               console.log(res.data);
               console.log(res);
               if(res.data=='1'){
                 this.$toast("插入成功");
                 this.$router.go(0)
                 
             }
           })
           
        }
    }
}
</script>
<style scoped>
.aa{
    margin-right: 500px;
}
</style>
