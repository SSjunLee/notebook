import Vue from 'vue'
import Vuex from 'vuex'
import Editor from "@/core/editor";

Vue.use(Vuex);

export default new Vuex.Store({
    state(){
        return {
            editor:new Editor(),
        }
    },
    mutations:{
        setWorkDir(state,d){
            state.editor.Clear();
            state.editor.workDir = d;
        },
        setContent(state,d){
            state.editor.Content = d;
        }
    },
    actions:{
        async openEditor({state},filename){
            await state.editor.Open(filename)
        }
    }
})
