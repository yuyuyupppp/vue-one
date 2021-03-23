<template>
<div class="main">
      <mt-field type="text" label="category" v-model="category"></mt-field>
      <mt-field type="text" label="sort" v-model="sort"></mt-field>
      <mt-button class="btn" type="primary" size="normal" @click="baocun">保存</mt-button>
      <mt-button class="btn" type="primary" size="normal" @click="reset">重添</mt-button>
</div>
</template>
<script>
export default {
    data(){
        return{
            category:"",
            sort:"0"
        }
    },
    methods:{
        reset(){
            this.category="";
            this.sort="";
        },
        baocun(){
            this.category=="" && false;
            this.sort=="" && false;
            this.axios.post('/wz/cdhzl',`category=${this.category}&sort=${this.sort}`).then(res=>{
                if(res.data==1){
                    this.$toast('插入成功');
                    this.reset();
                }
            })
        }

    }
}
</script>
<style scoped>
.mint-button{
    margin: 5px;
}
</style>