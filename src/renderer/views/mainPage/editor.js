import {writeFile, readFile, stat} from '@/api/file'
import {errorMessage,successMessage} from '@/util/common'
import {pathResolve} from '@/util/path'

export default class Editor {
    workDir = "";
    currentFile = null;
    Content = "";

    async Open(workDir,filename) {
        try {
            this.workDir = workDir;
            this.currentFile = {"path": pathResolve(filename)};
            this.Content =  await readFile(filename);
        } catch (e) {
            console.log(e);
            errorMessage(e.toString());
        }
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
