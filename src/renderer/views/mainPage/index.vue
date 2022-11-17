<template>
    <div class="main-page">
        <mavon-editor class="editor" v-if="enable" :style="{fontSize:RenderFontSize}" :fontSize="fontSize" @save="onSave"
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
    import {saveDialog, exits, writeFile} from "@/api/file";
    import {warningMessage} from '@/util/common'

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
                if (this.editor.IsNewFile()) {
                    const {canceled, filePath} = await saveDialog({
                        title: "保存"
                    });
                    if (canceled) return;
                    if (await exits(filePath)) {
                        warningMessage("文件已存在");
                        return;
                    }
                    this.$store.commit("visEditor", {
                        currentFile: {path: filePath},
                    });
                }
                await this.editor.Save();
            }
        }
    }
</script>

<style scoped>
    .main-page {
        overflow: scroll;
        height: 800px;
    }
    .editor{
        height: 100%;
    }

</style>
