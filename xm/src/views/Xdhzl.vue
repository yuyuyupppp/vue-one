<template>
<div class="main">
      <mt-field type="text" label="category" v-model="category"></mt-field>
      <mt-field type="text" label="sort" v-model="sort"></mt-field>
      <mt-button class="btn" type="primary" size="normal" @click="baocun">修改</mt-button>
      <mt-button class="btn" type="primary" size="normal" @click="reset">重添</mt-button>
</div>
</template>
<style scoped>
.mint-button{
    margin: 5px;
}
</style>
<script>
import reset from '../assets/styles/reset.css'
export default {
    data(){
        return{
            category:"",
            sort:"",
            id:this.$route.params.id
        }
    },
    methods:{
        reset(){
            this.category="";
            this.sort="";
        },
        baocun(){
            this.axios.put('/wz/udhzl',`category=${this.category}&sort=${this.sort}&id=${this.id}`).then(res=>{
                this.$toast('修改成功');
            })
            this.$router.push('/dhlb');
        }
    },
    mounted(){
        var id = this.$route.params.id;
        console.log(id);
        console.log(this.$route);
        console.log(this.$router);
        this.axios.get(`/wz/xdhzl/${this.id}`).then(res=>{
            console.log(res.data);
            this.category=res.data[0].category;
            this.sort=res.data[0].sort;
        })
    }
}
</script>