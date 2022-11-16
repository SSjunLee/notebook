<template>
    <div class="layout">
        <el-container>
            <navbar></navbar>
            <el-container>
                <aside-page></aside-page>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    import navbar from '@/components/navbar/index'
    import AsidePage from "@/components/aside/index";
    export default {
        name: "layout",
        components: {AsidePage, navbar}
    }
</script>

<style scoped>

</style>
