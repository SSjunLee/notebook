<template>
    <div class="github-token-wrapper">
        <el-popover
                placement="top-start"
                title="选择你的token"
                trigger="click"
        >
            <el-table
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    :data="tokenList"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        fixed
                        label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="token"
                        label="token"
                        :width="width"
                >
                </el-table-column>
            </el-table>
            <div class="addToken-wrapper">
                <el-input type="text" v-model="token"></el-input>
                <el-button class="addToken-btn" @click="addToken" type="primary">添加token</el-button>
            </div>
            <div slot="reference">
                <slot></slot>
            </div>
        </el-popover>

    </div>
</template>

<script>
    import {loginToken} from "@/core/service";
    import {infoMessage, errorMessage, successMessage} from "@/util/common";

    export default {
        name: "GithubToken",
        data() {
            return {
                token: ''
            }
        },
        computed: {
            tokenList() {
                return this.$store.state.tokenList;
            },
            width() {
                let l = 0;
                this.tokenList.forEach(item => {
                    const t = item.token;
                    l = Math.max(l, t.length);
                });
                return `${l * 10}px`;
            }
        }, methods: {
            handleCurrentChange(v) {
                this.$store.commit("setUser", v);
            },
            async addToken() {
                try {
                    if (this.tokenList && this.tokenList.find((item) => {
                        return item.token === this.token;
                    })) {
                        infoMessage("token 已添加...");
                        return;
                    }
                    await loginToken(this.token);
                    successMessage("添加成功");
                } catch (e) {
                    console.log(e);
                    errorMessage("token 错误");
                    this.token = "";
                }
            }
        }
    }
</script>

<style scoped>
    .addToken-wrapper {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .addToken-btn {
        margin-left: 20px;
    }

</style>
