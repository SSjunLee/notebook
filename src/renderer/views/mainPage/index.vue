<template>
    <div class="main-page">
        <mavon-editor v-model="data"/>
    </div>
</template>

<script>
    import {readDir, readFile} from '@/api/file'
    import {getClientHeight} from '@/util/common'

    const rootDir = "D:\\code\\qianduan\\ljn\\notebook";
    const gfilename = "D:\\code\\qianduan\\ljn\\notebook\\README_ZH.md";
    export default {
        name: "mainPage",
        data() {
            return {
                dir: [],
                data: ""
            }
        },
        async mounted() {
            this.dir = await readDir(rootDir);
            this.data = await readFile(gfilename);
        }
    }
</script>

<style scoped>
    .main-page{
        overflow: scroll;
        height: 50%;
    }

</style>
