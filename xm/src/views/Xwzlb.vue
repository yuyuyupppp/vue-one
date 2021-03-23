<template>
    <div>
       <mt-field label="title" type="text" v-model="title"></mt-field>
       <mt-field label="wz" type="text" v-model="wz"></mt-field>
       <mt-field label="sort" type="text" v-model="sort"></mt-field>
       <select v-model="dhzl">
           <option value="">---请选择---</option>
           <option v-for="(elem,i) of lb" :key="i" :value="elem.id">{{elem.category}}</option>
       </select> 
       <mt-button type="primary" size="normal" @click="tijiao">提交</mt-button>
       <mt-button type="primary" size="normal">重置</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            title:'',
            wz:'',
            sort:'',
            dhzl:'',
            lb:'',
        }
    },
    methods:{
        tijiao(){
             var id=this.$route.params.id;
            this.axios.put('/wz/mwzlb',`title=${this.title}&wz=${this.wz}&sort=${this.sort}&dhzl_id=${this.dhzl}&id=${id}`).then(res=>{
               if(res.data==1){
                   this.$toast('修改成功');
                   this.$router.push('/wzlb');
               }
            })

        }
    },
    mounted(){
        var id=this.$route.params.id;
       // console.log(id);
         this.axios.get('/wz/sdhzl').then(res=>{
           //console.log(res.data);
           this.lb=res.data;
        })
        this.axios.get('/wz/xwzlb/'+id).then(res=>{
            this.title=res.data[0].title;
            this.wz=res.data[0].wz;
            this.sort=res.data[0].sort;
            this.dhzl=res.data[0].dhzl_id;
           // console.log(res);
        })
      
    }
}
</script>
<style scoped>
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

