<template>
    <div>
       <mt-field label="title" type="text" v-model="title"></mt-field>
       <mt-field label="wz" type="text" v-model="wz"></mt-field>
       <mt-field label="sort" type="text" v-model="sort"></mt-field>
       <select v-model="dhzl">
           <option value="">---请选择---</option>
           <option v-for="(elem,i) of lb" :key="i" :value="elem.id">{{elem.category}}</option>
       </select> 
       <mt-button type="primary" size="normal" @click="baocun">提交</mt-button>
       <mt-button type="primary" size="normal" @click="reset">重置</mt-button>
    </div>
</template>
<script>
export default {
    data(){
       return{
           title:'',
           sort:'',
           wz:'',
           dhzl:'',
           lb:''
       }
    },
    mounted(){
        this.axios.get('/wz/sdhzl').then(res=>{
           //console.log(res.data);
           this.lb=res.data;
        })
    },
    methods:{
        reset(){
            this.title='',
            this.sort='',
            this.wz='',
            this.dhzl='',
            this.lb=''
        },
       baocun(){
          this.axios.post('/wz/cwzad',`title=${this.title}&sort=${this.sort}&wz=${this.wz}&dhzl_id=${this.dhzl}`).then(res=>{
             if(res.data==1){
                 this.$toast("插入成功");
             }
        })
        // this.$router.push('/wzad');
        // location.reload();
       this.$router.go(0)
        }
         
    }
}
</script>
<style scoped>
@import'../assets/styles/css/btn.css';
select{
            width: 380px;
            height: 27px;
            border: 1px solid rosybrown;outline: 0;
            padding: 3px;
            border-radius: 2px;
            margin-right:500px;
            display: flex;
            justify-content: center;
            padding-left: 15px;

}
</style>