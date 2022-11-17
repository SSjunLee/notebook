<template>
    <div class="main-page">
        <mavon-editor v-if="enable" :style="{fontSize:RenderFontSize}" :fontSize="fontSize" @save="onSave"
                      v-model="editorContent"
                      boxShadowStyle="">
            <template slot="left-toolbar-before">
                <button
                        type="button"
                        @click="enableSetFontSize = true"
                        class="op-icon el-icon-picture-outline-round"
                        aria-hidden="true"
                        title="字体设置"
                ></button>
            </template>
        </mavon-editor>
        <font-setting :enableSetFontSize="enableSetFontSize" @close="enableSetFontSize=false"></font-setting>
    </div>
</template>

<script>
    import FontSetting from '@/components/font-setting'

    export default {
        name: "mainPage",
        components: {
            FontSetting
        },
        data() {
            return {
                enable: true,
                enableSetFontSize: false,
            }
        },
        computed: {
            editor() {
                return this.$store.state.editor;
            },
            fontSize() {
                return this.$store.state.editor.FontSize;
            },
            RenderFontSize() {
                return this.$store.state.editor.RenderFontSize;
            },
            editorContent: {
                get() {
                    return this.$store.state.editor.Content;
                },
                set(v) {
                    this.$store.commit("setContent", v);
                }
            }
        },
        methods: {
            async onSave() {
                await this.$store.state.editor.Save();
            }
        }
    }
</script>

<style scoped>
    .main-page {
        overflow: scroll;
        height: 800px;
    }

</style>
