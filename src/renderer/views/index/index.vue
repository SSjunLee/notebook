<template>
    <div>主页
        <div>
            <mavon-editor v-model="data"/>
        </div>
        {{dir}}<br/>
    </div>
</template>

<script>
    import {readDir, readFile} from '@/api/file'

    const rootDir = "D:\\code\\qianduan\\ljn\\notebook";
    const gfilename = "D:\\code\\qianduan\\ljn\\notebook\\README_ZH.md";
    export default {
        name: "index",
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

</style>
