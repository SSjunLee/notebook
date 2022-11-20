import {dialog} from "@/api/file";
import {saveGit as apiSaveGit} from '@/api/git'
import path from 'path'
import store from '@/store'
import {Github} from "@/core/github";

const fileCfg = {
    properties: ['openFile', 'promptToCreate'],
    filters: [
        {name: 'markdown', extensions: ['md']}
    ],
};

const DirCfg = {
    properties: ['openDirectory'],
};


const openFile = async () => {
    const {canceled, filePaths} = await dialog(fileCfg);
    if (canceled || filePaths.length === 0) return;
    const dirname = path.dirname(filePaths[0]);
    await store.commit("setWorkDir", dirname);
    await store.dispatch('openEditor', filePaths[0]);
};

const openWorkspace = async () => {
    const {canceled, filePaths} = await dialog(DirCfg);
    if (canceled || filePaths.length === 0) return;
    store.commit("setWorkDir", filePaths[0]);
};


const l = new Github();
const github = async () => {
    await l.login(process.env.GITHUB);
    store.commit("setEnableConfigRemoteRepo", true);
};

export const loginToken = async (token) => {
    await l.login(token);
};


export const saveGit = async () => {
    if (!store.state.editor.workDir) {
        throw new Error('请打开一个工作空间');
    }
    const p = store.state.editor.workDir;
    await apiSaveGit(p);
};


const serviceMap = {
    "open-file": openFile,
    "open-workspace": openWorkspace,
    "github": github,
    "save-git": saveGit,
};

export default (name, ...args) => {
    if (serviceMap[name])
        serviceMap[name](...args).then(() => {
        });
}
