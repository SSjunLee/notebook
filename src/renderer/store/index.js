import Vue from 'vue'
import Vuex from 'vuex'
import Editor from "@/core/editor";


Vue.use(Vuex);

export default new Vuex.Store({
    state() {
        return {
            editor: new Editor(),
            enableConfigRemoteRepo: false,
            user: null,
            tokenList: [],
        }
    },
    mutations: {
        setTokenList(state, v) {
            this.state.tokenList = v;
        },
        setUser(state, v) {
            this.state.user = v;
        },
        setEnableConfigRemoteRepo(state, v) {
            state.enableConfigRemoteRepo = v;
        },
        visEditor(state, args) {
            Object.assign(state.editor, args);
        },

        setWorkDir(state, d) {
            state.editor.Clear(); //清空编辑器内容
            state.editor.workDir = d;
        },
        setContent(state, d) {
            state.editor.Content = d;
        },
        setFontSize(state, [e, r]) {
            state.editor.FontSize = e;
            state.editor.RenderFontSize = r;
        }
    },
    actions: {
        async openEditor({state}, filename) {
            await state.editor.Open(filename);
        }
    }
})
