<template>
    <div class="font-setting">
        <el-dialog
                :visible.sync="mEnableSetFontSize"
                title="提示"
                width="50%">
            <el-form :model="form">
                <el-form-item label="编辑区字体大小" :label-width="`${labelWidth}px`">
                    <el-input v-model="form.editFontSize" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="渲染字体大小" :label-width="`${labelWidth}px`">
                    <el-input v-model="form.renderFontSize" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const getPxVal = (px) => px.substring(px.indexOf("px"));
    export default {
        name: "fontSetting",
        props: {
            enableSetFontSize: {
                type: Boolean,
                default: false,
            },
            labelWidth: {
                type: Number,
                default: 120,
            },
        },
        data() {
            return {
                mEnableSetFontSize: this.enableSetFontSize,
                form: {
                    editFontSize: 14,
                    renderFontSize: 14
                },
            }
        },

        beforeMount() {
            this.mEnableSetFontSize = this.enableSetFontSize;
            const editor = this.$store.state.editor;
            const [f, r] = [getPxVal(editor.FontSize), getPxVal(editor.RenderFontSize)];
            this.editFontSize = f;
            this.renderFontSize = r;
        },
        watch: {
            enableSetFontSize(newV, _) {
                this.mEnableSetFontSize = newV;
            }
        },
        methods: {
            close() {
                this.mEnableSetFontSize = false;
                this.$emit("close");
            },
            submit() {
                this.$store.commit("setFontSize", [`${this.form.editFontSize}px`, `${this.form.renderFontSize}px`]);
                this.close();
            }
        },
    }
</script>

<style scoped>

</style>
