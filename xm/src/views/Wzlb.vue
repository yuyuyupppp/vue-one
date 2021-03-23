<template>
  <table>
      <thead>
          <tr>
              <td>id</td>
              <td>dhzl</td>
              <td>title</td>
              <td>wz</td>
              <td>sort</td>
              <td>操作</td>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(elem,i) of lb" :key="i">
              <td>{{elem.id}}</td>
              <td>{{elem.category}}</td>
              <td>{{elem.title}}</td>
              <td>{{elem.wz}}</td>
              <td>{{elem.sort}}</td>
              <td>
                 <router-link :to="`/xwzlb/${elem.id}`" class="sc"><mt-button style="default">修改</mt-button></router-link>
                 <mt-button type="default" @click="del(elem.id)" class="sc">删除</mt-button>
              </td>
          </tr>
      </tbody>
      <ul>
          <li v-for="(elem) of pagecount" :key="elem" @click="dd">
              {{elem}}
          </li>
      </ul>
  </table>
</template>
<script>
export default {
    data(){
        return{
            lb:[],
            page:1,
            pagecount:'',
            e:''
        }
    },
    mounted(){
        this.axios.get('/wz/swzlbp/'+this.page).then(res=>{
            // this.lb=res.data;
           this.lb=res.data.results;
           this.pagecount=res.data.pagecount;
            // console.log(res);
        })
    },
    methods:{
        dd(e){
           this.page=e.target.innerHTML;
        },
        del(a){
            this.axios.delete('/wz/dwzlb/'+a).then(res=>{
                console.log(res);
                if(res.data==1){
                    this.$toast('删除成功');
                }
            })
        }
    },
    watch:{
        page(){
            this.axios.get('/wz/swzlbp/'+this.page).then(res=>{
            // this.lb=res.data;
           this.lb=res.data.results;
           this.pagecount=res.data.pagecount;
        })
        }
    }
}
</script>
<style scoped>
ul>li{
    float: left;
    display: block;
    padding: 5;
    border: 1px solid salmon;
    border-radius: 5px;
    margin: 0 10px;
    cursor: pointer;
}
.sc{
    margin: 0 5px;
}
table{
    float: left;
    width: 80%;
    text-align: center;
    border-collapse: collapse;
    border-bottom:1px solid #ddd;
    color:#666;
    font-size:20px;

}
table th{
    border-bottom:1px solid #666;
    padding:5px 0;
}
table td{
    border-bottom:1px dotted #ddd;
    text-align:center;
    padding:5px 0;
}
table td a{
    color:#005aa0;
    text-decoration:none;
}
</style>