<template>
    <div class="main-page">
        <mavon-editor @save="onSave" v-model="editor.Content"/>
    </div>
</template>

<script>
    import {readDir, readFile} from '@/api/file'
    import {getClientHeight} from '@/util/common'
    import Editor from './editor.js'

    const gfilename = "D:\\code\\qianduan\\ljn\\notebook\\README_ZH.md";

    export default {
        name: "mainPage",
        data() {
            return {
                editor: new Editor()
            }
        },
        methods: {
            async onSave() {
                console.log("baocun");
               await this.editor.Save();
            }
        },
        async mounted() {
            await this.editor.Open(this.$store.state.workDir,gfilename);
        }
    }
</script>

<style scoped>
    .main-page {
        overflow: scroll;
        height: 50%;
    }

</style>
