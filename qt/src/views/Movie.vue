<template>
    <div>
<!-- 文章开始 -->
<div class="main"
  infinite-scroll-distance="10"
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="busy"
  :infinite-scroll-immediate-check="true">
        <div 
         class="infoItem" 
         v-for="(item,index) in data"
          :key="index">
            <div class="infoItemHead">
                <router-link :to="`/xmov/${item.id}`">
                    {{item.title}}
                </router-link>
                <div class="pf">{{item.pingfen}}分</div>
            </div>
             <div class="infoItemContent">
               <router-link :to="`/xmov/${item.id}`" v-if="item.jjpg != null">
               <img v-lazy="item.jjpg" class="infoItemImg">
               </router-link>
               <div>
                   <div v-html="item.jieshao.slice(0,100)"></div>
               </div>
            </div>
        </div>
 </div>      
<!-- 文章开始 -->
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
             active:'movie',
             data:[],
             page:1,
             busy:false,
             pagecount:0
        } 
    },
    mounted(){
         this.$indicator.open('加载中...');
        this.axios.get('/dy/lmovie/'+this.page).then(res=>{
           var data=res.data.results;
           this.pagecount=res.data.pagecount;
           console.log(data);
           data.forEach(item=>{
               if(item.jjpg!=null){
                   item.jjpg=require('../assets/img/'+item.jjpg);
               }
               this.data.push(item);
          });
           this.$indicator.close();  
                    //继续处理滚动操作
                    this.busy = false;
        })
    },
    methods:{
        loadMore(){
           this.busy=true;
           this.page++;
           console.log('111111');
           console.log(this.page,this.pagecount);
           if(this.page<this.pagecount){
           ////////////////
            this.$indicator.open('加载中...');
        this.axios.get('/dy/lmovie/'+this.page).then(res=>{
           var data=res.data.results;
           this.pagecount=res.data.pagecount;
           console.log(data);
           data.forEach(item=>{
               if(item.jjpg!=null){
                   item.jjpg=require('../assets/img/'+item.jjpg);
               }
               this.data.push(item);
          });
           this.$indicator.close();  
                    //继续处理滚动操作
                    this.busy = false;
        })
           }
        }
    }
}
</script>
<style  scoped>
.pf{
    color:mediumvioletred;
    font-size: 1.5rem;
}
.infoItemHead a{
    color:#000;
}
.shortcut a{
    color:#fff;
}
.main{
    margin-bottom:55px;
}
.navbar{
  margin-top:0;
}

.infoItem {
    padding: 15px 0 14px;
    margin: 0 15px;
    border-bottom: .5px solid #d3d3d3;
}
.infoItemHead{
	font-weight: 600;
    font-size: 17px;
    color: #1a1a1a;
    line-height: 22px;
    display: flex;
    justify-content: flex-start;
}
.infoItemContent {
    display: -ms-flexbox;
    display: flex;
    padding-top: 11px;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
}

.infoItemImg{
    width: 112px;
    height: 100px;
    border-radius: 5px;
    margin-right:15px;
}
.infoItemDes{
    font-size: 15px;
    overflow: hidden;
    font-weight: 400;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 21px;
    letter-spacing: normal;
    color: #444;
    margin-right: 4px 15px;
    -webkit-box-orient: vertical;
    height: 65px;
}

</style>