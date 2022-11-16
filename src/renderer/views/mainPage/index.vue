<template>
    <div class="main-page">
        <mavon-editor style="font-size: 20px" fontSize="18px" @save="onSave" v-model="content">
            <template slot="left-toolbar-before">
                <button
                        type="button"
                        @click="setFontSize"
                        class="op-icon el-icon-picture-outline-round"
                        aria-hidden="true"
                        title="字体设置"
                ></button>
            </template>
        </mavon-editor>
    </div>
</template>

<script>
    const gfilename = "D:\\code\\qianduan\\ljn\\notebook\\README_ZH.md";
    export default {
        name: "mainPage",
        computed: {
            content: {
                get() {
                    return this.$store.state.editor.Content;
                },
                set(c) {
                    this.$store.commit("setContent", c);
                }
            }
        },
        methods: {
            async setFontSize(){
                this.$alert(this.$createElement('div', {}, "htmlStr"), '附件', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '关闭'
                })
            },
            async onSave() {
                await this.$store.state.editor.Save();
            }
        },
        async mounted() {
            await this.$store.dispatch("openEditor", gfilename);
        }
    }
</script>

<style scoped>
    .main-page {
        overflow: scroll;
        height: 800px;
    }

</style>
