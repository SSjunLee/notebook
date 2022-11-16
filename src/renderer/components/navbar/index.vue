<template>
    <div class="nav">
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="file">
                    <template slot="title">文件</template>
                    <el-menu-item index="open-file">打开文件</el-menu-item>
                    <el-menu-item index="open-workspace">打开工作区</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">功能</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-header>
    </div>
</template>

<script>
    import service from "@/core/service";

    export default {
        name: "navbar",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key) {
                service(key);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
