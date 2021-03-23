import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   id:sessionStorage.getItem("id")?sessionStorage.getItem("id"):0,
   username:sessionStorage.getItem("username")?sessionStorage.getItem("username"):"",
   isLogined:sessionStorage.getItem("isLogined")?sessionStorage.getItem("isLogined"):false
  },
  getters:{
  
  },
  mutations: {
    logined(state,payload){
      state.id=payload.id;
      state.username=payload.username;
      state.isLogined=true;
    },
    logout(state){
      state.id=0;
      state.username="";
      state.isLogined=false;
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('isLogined');

    }
  },
  actions: {
  },
  modules: {
  }
})
