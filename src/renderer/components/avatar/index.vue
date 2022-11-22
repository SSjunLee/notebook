<template>
    <div class="avatar-box">
        <div class="avatar-card">
            <div class="avatar-item">
                <el-avatar v-if="user" :src="user.avatar_url"></el-avatar>
                <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
            </div>
            <div class="avatar-name">
                {{user?user.name:"未登录"}}
            </div>
        </div>
    </div>
</template>

<script>
    import {githubInstance} from "@/core/github";

    export default {
        name: "AvatarBox",
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        mounted() {
            if(this.user && !githubInstance.isLogin()){
                githubInstance.login(this.user.token);
            }
        }
    }
</script>

<style scoped>
    .avatar-card {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>
