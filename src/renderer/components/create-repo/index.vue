<template>
    <div class="create-repo">
        <el-dialog
                :destroy-on-close="true"
                :append-to-body="true"
                :visible.sync="enableCreateRepo"
                title="仓库设置"
                width="100%">
            <div>
                新建仓库
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
    }
</script>

<style scoped>

</style>
