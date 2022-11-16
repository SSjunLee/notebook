<template>
    <div class="browser">
        文件浏览{{this.$store.state.workDir}}
        <el-tree ref="tree"
                 :load="loadNode"
                 lazy
                 :props="defaultProps" @node-click="handleNodeClick"
                 v-if="renderTree"
        ></el-tree>
    </div>
</template>

<script>
    import {readDir, isDirectory} from '@/api/file.js'
    import {pathJoin, getNameFromPath} from '@/util/path'

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
            workDir: function () {
                return this.$store.state.workDir;
            }
        },
        watch: {
            workDir: async function (newData) {
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
                console.log(node);
                if (node.level === 0) {
                    const name = getNameFromPath(this.workDir);
                    return resolve([{name: name, path: this.workDir, leaf: false}]);
                }
                const files = await readDir(node.data.path);
                let cs = [];
                for (let i = 0; i < files.length; i++) {
                    const fi = files[i];
                    const path = pathJoin(node.data.path, fi);
                    const isDir = await isDirectory(path);
                    cs.push({name: fi, leaf: !isDir, path});
                }
                return resolve(cs);
            },


            async handleNodeClick(data) {
                // console.log(data);
            },


            async loadDir() {
                const tree = await this.dfs(this.workDir);
                this.$set(this.data, 0, tree);
            },

            async dfs(path) {
                const that = this;
                const name = getNameFromPath(path);
                const node = {name};
                if (await isDirectory(path)) {
                    const dirs = await readDir(path);
                    dirs.map(async son => {
                        const c = await that.dfs(pathJoin(path, son));
                        if (!node.children) {
                            that.$set(node, "children", []);
                        }
                        node.children.push(c);
                    });
                }
                return node;

            },
        }
    }
</script>

<style scoped>

</style>
