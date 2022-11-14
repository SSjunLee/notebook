<template>
    <div>
        <el-aside width="200px" class = "aside">
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
                <el-tab-pane label="文件浏览">文件浏览</el-tab-pane>
                <el-tab-pane label="目录">目录</el-tab-pane>
            </el-tabs>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: "asidePage",
        data(){
            return {
                tabPosition:""
            }
        }
    }
</script>

<style scoped>


</style>
