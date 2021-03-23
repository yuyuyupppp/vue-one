<template>
    <div>
        <mt-tabbar v-model="selected" fixed class="mmm">
            <mt-tab-item id="wz">
                <img src="../assets/images/wz1.png" slot="icon" v-if="selected=='wz'">
                <img src="../assets/images/wz2.png" slot="icon" v-else>
                网址导航
            </mt-tab-item>
            <mt-tab-item id="movie">
                 <img src="../assets/images/mov2.png" slot="icon"  v-if="selected=='movie'">
                <img src="../assets/images/mov1.png" slot="icon" v-else>
                电影收藏
            </mt-tab-item>
            <mt-tab-item id="bj">
                 <img src="../assets/images/bj1.png" slot="icon"  v-if="selected=='bj'">
                <img src="../assets/images/bj2.png" slot="icon" v-else>
                学习笔记
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
export default {
    props:['active'],
    data(){
        return{
            selected:this.active
        }
    },
    watch:{
        selected(value){
            if(value=='wz'){
                this.$router.push('/');
            }else if(value=='movie'){
                this.$router.push('/movie');
            }else if(value=='bj'){
                this.$router.push('/bj');
            }
        }
    }
}
</script>
<style scoped>
.mint-tabbar{
    opacity: 0.9;
}
.mint-tabbar>.mint-tab-item.is-selected {
   opacity: 0.9;
}
</style>