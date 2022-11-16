<template>
    <div>
        <el-aside  class = "aside">
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
                <el-tab-pane label="文件浏览">
                    <browser></browser>
                </el-tab-pane>
                <el-tab-pane label="目录">目录</el-tab-pane>
            </el-tabs>
        </el-aside>
    </div>
</template>

<script>
    import Browser from "@/components/browser/index";
    export default {
        name: "asidePage",
        components: {Browser},
        data(){
            return {
                tabPosition:""
            }
        }
    }
</script>

<style scoped>
    .aside{
        width: 200px;
        height: 100%;
    }

</style>
