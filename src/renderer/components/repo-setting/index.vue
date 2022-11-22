<template>
    <div class="repo-setting">
        <el-dialog
                :visible.sync="enableConfigRemoteRepo"
                title="仓库设置"
                :append-to-body="true"
                :destroy-on-close="true"
                width="100%">
            <div class="wrapper">
                <el-table :data="repos" @current-change="select"  highlight-current-row>
                    <el-table-column label="仓库" prop="name"></el-table-column>
                    <el-table-column label="地址" prop="git_url"></el-table-column>
                    <el-table-column label="描述" prop="description"></el-table-column>
                </el-table>
                <div class="addRepo-btn-wrapper">
                    <el-button class="addRepo-btn" @click="createRepo" type="primary">新的仓库</el-button>
                </div>
                <create-repo></create-repo>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import CreateRepo from '@/components/create-repo'
    import db from '@/core/db'
    import {successMessage} from "@/util/common";

    export default {
        name: "RepoSetting",
        components:{
            CreateRepo
        },
        computed: {
            enableConfigRemoteRepo: {
                get() {
                    return this.$store.state.enableConfigRemoteRepo;
                },
                set(v) {
                    this.$store.commit("setEnableConfigRemoteRepo", v);
                }
            },
            workDir() {
                return this.$store.state.editor.workDir;
            },
        },
        data() {
            return {
                repos: [],
                currentRepo:null,
            }
        },
        async mounted() {
            this.repos = db.getRepos();
        },
        methods: {
            createRepo() {
                this.$store.commit('setEnableCreateRepo',true);
            },
            select(p) {
                this.currentRepo = p;
            },
            async submit(){
                if(this.currentRepo === ""){
                    this.enableConfigRemoteRepo = false;
                    return;
                }
                this.enableConfigRemoteRepo = false;
                const localStore = await db.checkOrCreateStore(this.workDir);
                localStore.set('remote_git',this.currentRepo);
                successMessage('设置远程git仓成功');
            }
        },
    }
</script>

<style scoped>
    .addRepo-btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .addRepo-btn {
        width: 50%;
        margin-top: 30px;
    }
</style>
