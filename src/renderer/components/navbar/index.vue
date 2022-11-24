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
                    <template slot="title">github</template>
                    <github-token>
                        <el-menu-item index="token">token管理</el-menu-item>
                    </github-token>
                    <el-menu-item index="github">同步github</el-menu-item>
                    <el-menu-item index="save-git">保存git</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <repo-setting></repo-setting>
        <create-repo></create-repo>
    </div>
</template>

<script>
    import service from "@/core/service";
    import RepoSetting from '@/components/repo-setting/index'
    import AvatarBox from '@/components/avatar/index'
    import GithubToken from '@/components/github-token'
    import CreateRepo from "@/components/create-repo/index";
    import {loadingInstance} from "@/util/common";

    export default {
        name: "navbar",
        components: {
            CreateRepo,
            RepoSetting,AvatarBox,GithubToken
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            async handleSelect(key) {
                loadingInstance.open();
                await service(key);
                loadingInstance.close();
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
