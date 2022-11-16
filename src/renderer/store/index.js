import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state(){
        return {
            workDir:""
        }
    },
    mutations:{
        setWorkDir(state,d){
            console.log("setWorkDir");
            state.workDir = d;
        }
    }
})
