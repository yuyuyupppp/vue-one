<template>
    <div>
        <mt-field label="title" v-model="title"></mt-field>
        <!-- <textarea name="content" v-model="content" cols="100" rows="10"></textarea> -->
        <div id="editor" class="editor" @input="change"></div>
        <mt-button type="default" size="normal" @click="tj">提交</mt-button>
        <mt-button type="primary">重置</mt-button>
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
            content:''
        }
    },
    methods:{
         change(e){
        this.content=e.target.innerHTML;
        },
        tj(){
            // this.content=this.content;
            this.axios.post('/dy/biji',`title=${this.title}&content=${this.content}`).then(res=>{
            //    console.log(res.data);
               if(res.data==1){
                   this.$toast('成功');
               } 
               this.$router.go(0) 
            })
            // .then(()=>{this.$router.go(0)})
        }
    }
}
</script>