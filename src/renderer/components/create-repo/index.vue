<template>
    <div class="create-repo">
        <el-dialog
                :destroy-on-close="true"
                :append-to-body="true"
                :visible.sync="enableCreateRepo"
                title="仓库设置"
                width="100%">
            <div class="create_repo">
                <el-form label-position="right" label-width="80px" :model="repoConf">
                    <el-form-item label="名称">
                        <el-input v-model="repoConf.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="repoConf.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {githubInstance} from "@/core/github";
    import service from "@/core/service";
    import {successMessage,loadingInstance} from "@/util/common";

    export default {
        name: "CreateRepo",
        computed:{
            enableCreateRepo:{
                get(){
                    return this.$store.state.enableCreateRepo;
                },
                set(v){
                    this.$store.commit('setEnableCreateRepo',v);
                },
            }
        },
        data(){
          return {
              repoConf:{
                  name:'',
                  description:'',

              }
          }
        },
        methods:{
            async submitForm(){
                loadingInstance.open();
                const local = await this.$db.checkOrCreateStore(this.$store.state.editor.workDir);
                const conf = {
                    name:this.repoConf.name,
                    "description": this.repoConf.description,
                    "private": false,
                    "is_template": true
                };
                const remote =  await githubInstance.createRepo(conf);
                successMessage('创建仓库成功...');
                local.set('remote_git',remote);
                await service('github');
                successMessage('同步github成功...');
                loadingInstance.close();
                this.enableCreateRepo = false;

            }
        },
    }
</script>

<style scoped>

</style>
