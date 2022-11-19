<template>
    <div class="github-token-wrapper">
        <el-popover
                placement="top-start"
                title="选择你的token"
                trigger="hover"
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
            <div slot="reference">
                <slot></slot>
            </div>
        </el-popover>

    </div>
</template>

<script>
    export default {
        name: "GithubToken",
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
                this.$store.commit("setUser",v);
            }
        }
    }
</script>

<style scoped>

</style>
