<template>
    <div class="browser">
        <el-tree :highlight-current="true" ref="tree"
                 :load="loadNode"
                 lazy
                 :props="defaultProps" @node-click="handleNodeClick"
                 v-if="renderTree"
        ></el-tree>
    </div>
</template>

<script>
    import {readDir, isDirectory} from '@/api/file.js'
    import {pathJoin, getNameFromPath, suffixWith} from '@/util/path'

    export default {
        name: "browser",
        data() {
            return {
                renderTree: true,
                defaultProps: {
                    children: "children",
                    label: "name",
                    isLeaf: 'leaf'
                },
            }
        },

        computed: {
            workDir() {
                return this.$store.state.editor.workDir;
            }
        },
        watch: {
            workDir(newData) {
                if (newData !== "") {
                    this.forceRender();
                }
            }
        },

        methods: {

            forceRender() {
                this.renderTree = false;
                this.$nextTick(() => {
                    this.renderTree = true;
                });
            },

            async loadNode(node, resolve) {
                if (node.level === 0) {
                    const name = getNameFromPath(this.workDir);
                    return resolve([{name: name, path: this.workDir, leaf: false}]);
                }
                const files = await readDir(node.data.path);
                let cs = [];
                for (let i = 0; i < files.length; i++) {
                    const fi = files[i];
                    if(fi[0] === '.')continue;
                    const path = pathJoin(node.data.path, fi);
                    const isDir = await isDirectory(path);
                    if (!isDir && fi.lastIndexOf(".md") === -1) continue;
                    cs.push({name: fi, leaf: !isDir, path});
                }
                return resolve(cs);
            },


            async handleNodeClick(node) {
                const path = node.path;
                const is = await isDirectory(path);
                if (!is) {
                    await this.$store.dispatch("openEditor", path);
                }
            },

        }
    }
</script>

<style scoped>

</style>
