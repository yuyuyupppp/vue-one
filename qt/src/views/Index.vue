<template>
    <div>
        <!-- 顶部选项卡 -->
        <div class="navbar">
            <mt-navbar v-model="selected">
                <mt-tab-item
                v-for="(elem,i) of listc" :key="i"
                :id="elem.id"
                >
                {{elem.category}}
                </mt-tab-item>
            </mt-navbar>
        </div>
        <!-- 顶部选项卡 -->
        <!-- 内容 -->
        <div id="wzcontent">
        <mt-tab-container v-model="selected">
            <mt-tab-container-item v-for="(elem,i) of listc" :key="i"
            :id="elem.id"
            >
            <p v-for="(item,index) in data" :key="index"><a :href="item.wz" target="_blank">{{item.title}}</a></p>
            </mt-tab-container-item>
        </mt-tab-container>
        </div>
        
        <!-- 内容 -->
        <!-- 底部选项卡 -->
        <div>
             <tabbar :active="active"></tabbar>
        </div>
        <!-- 底部选项卡 -->
    </div>
</template>
<script>
import Tabbar from '../components/Tabbar'
export default {
    components:{
        Tabbar
    },
    data(){
        return{
            active:'wz',
            listc:[],
            selected:1,
            data:''
        }
    },
    mounted(){
        this.axios.get('/wz/sdhzl').then(res=>{
            console.log(res.data);
            this.listc=res.data;
        });
        this.axios.get('/wz/sw/'+this.selected).then(res=>{
            this.data=res.data;
        })
    },
    watch:{
       selected(){
            this.axios.get('/wz/sw/'+this.selected).then(res=>{
            this.data=res.data;
        })
       }
    }
}
</script>
<style scoped>
.mint-navbar .mint-tab-item{
    padding-top: 7px;
    padding-bottom: 2px;
    font-size: 25rem;
}
.mint-navbar .mint-tab-item.is-selected{
    border-radius: 5px;
    margin: 0;
    
}
#wzcontent .mint-tab-container-item{
    display: flex;
    flex-flow: row wrap;
}
#wzcontent .mint-tab-container-item p{
    flex: 0 0 50%;
    padding: 15px;
    box-sizing: border-box;
}
#wzcontent .mint-tab-container-item p a{
    color: #333;
    text-decoration: none;
}
</style>