import {writeFile, readFile, stat} from '@/api/file'
import {errorMessage,successMessage} from '@/util/common'
import {pathResolve} from '@/util/path'

export default class Editor {
    workDir = "";
    currentFile = null;
    Content = "";
    FontSize = "14px";
    RenderFontSize = "14px";

    IsNewFile(){
        return this.currentFile == null;
    }

    async Open(filename) {
        try {
            this.currentFile = {path: pathResolve(filename)};
            this.Content =  await readFile(filename);
        } catch (e) {
            console.log(e);
            errorMessage(e.toString());
        }
    }

    Clear(){
        this.currentFile = null;
        this.Content = "";
        this.workDir = "";
    }

    async Save() {
        try {
            await writeFile(this.currentFile.path,this.Content);
            successMessage("保存成功...")
        } catch (e) {
            console.log(e);
            errorMessage(e.toString());
        }
    }


};
