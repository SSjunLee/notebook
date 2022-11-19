<template>
    <div class="repo-setting">
        <el-dialog
                :visible.sync="enableConfigRemoteRepo"
                title="提示"
                width="50%">
           duih
            <div slot="footer" class="dialog-footer">
                <el-button>取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "RepoSetting",
        computed:{
            enableConfigRemoteRepo:{
                get(){
                    return this.$store.state.enableConfigRemoteRepo;
                },
                set(v){
                    this.$store.commit("setEnableConfigRemoteRepo",false);
                }
            }
        },
    }
</script>

<style scoped>
    .repo-setting{

    }
</style>
