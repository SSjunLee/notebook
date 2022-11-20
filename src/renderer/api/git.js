import {ipcRenderer} from 'electron'
import de from "element-ui/src/locale/lang/de";


const ipc = ipcRenderer;
const decoder = new TextDecoder();


export const saveGit = async (path) => {
    const res = await ipc.invoke("saveGit", path);
    console.log("成功...",res);
};
