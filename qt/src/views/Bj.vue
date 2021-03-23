<template>
    <div id="b">
        <div class="se"> 
            <input type="search" name="" id="">
            <mt-button>
                <img src="../assets/images/ss.png"  height="20" width="20" slot="icon">
            </mt-button>
        </div>
        <hr>
        <div class="sz">
            <div class="bj" v-for="(elem,i) of data" :key="i">
            <p>{{elem.title}}</p>
            <div class="mmm">
                <span v-html="elem.content"></span>
            </div>
            <hr>      
            </div>
        </div>
        <div class="fy">
           <ul>
               <li v-for="(elem) of pagecount" :key="elem" @click="go(elem,$event)" aria-selected="blue">{{elem}}</li>
           </ul>
        </div>
         <div>
             <tabbar :active="active"></tabbar>
        </div>
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
            data:[],
            active:'bj',
            page:'1',
            pagecount:'',
        }
    },
    mounted(){
        var a=parseInt(Math.random()*200);
        var b=parseInt(Math.random()*200);
        var c=parseInt(Math.random()*200);
        //console.log(a,b,c);
         var mm=document.getElementsByClassName('sz')[0];
         mm.style.color=`rgba(${a},${b},${c})`;
        this.axios.get('/dy/bjlb/'+this.page).then(res=>{
            // console.log(res.data);
           this.data=res.data.results;
           this.pagecount=res.data.pagecount;
        })
    },
    methods:{
        go(a,e){
             this.axios.get('/dy/bjlb/'+a).then(res=>{
            // console.log(res.data);
           this.data=res.data.results;
           this.pagecount=res.data.pagecount;
           console.log(e.target.innerHTML,a);
           var hhhh=document.getElementsByClassName('hhhh')[0];
           if(hhhh){
                console.log(hhhh);
           hhhh.className="";
           }
           e.target.className="hhhh";
        })
        }
    }
}
</script>
<style scoped>
.hhhh{
    background: lightblue;
    border-radius: 2px;
}
.se input{
   transform: scale(1.3);
   border: 1px solid rosybrown;
   outline: 0;
   margin-right: 40px;
}
p{
    font: normal small-caps 600 1.5rem '宋体';
    color:slateblue;
}
p+div{
    padding:25px;
    font-size: 1.1rem;
    box-sizing: border-box;
}
.fy ul li{
    float: left;
    display: block;
    width: 30px;
    height: 30px;
    letter-spacing: 2px;
    text-align: center;
    line-height: 30px;

}
</style>