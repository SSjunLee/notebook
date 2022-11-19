<template>
    <div class="nav">
        <el-header>
            <div class="nav-top">
               <avatar-box></avatar-box>
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="file">
                    <template slot="title">文件</template>
                    <el-menu-item index="open-file">打开文件</el-menu-item>
                    <el-menu-item index="open-workspace">打开工作区</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">功能</template>
                    <github-token>
                        <el-menu-item index="github">同步github</el-menu-item>
                    </github-token>
                </el-submenu>
            </el-menu>
        </el-header>
        <repo-setting></repo-setting>
    </div>
</template>

<script>
    import service from "@/core/service";
    import RepoSetting from '@/components/repo-setting/index'
    import AvatarBox from '@/components/avatar/index'
    import GithubToken from '@/components/github-token'

    export default {
        name: "navbar",
        components: {
            RepoSetting,AvatarBox,GithubToken
        },
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
    .nav-top {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

</style>
