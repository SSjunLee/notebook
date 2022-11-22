import {dialog} from "@/api/file";
import {saveGit as apiSaveGit, syncGithub} from '@/api/git'
import path from 'path'
import store from '@/store'
import {githubInstance} from "@/core/github";
import {errorMessage, successMessage} from "@/util/common";
import db from "@/core/db";


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


const github = async () => {
    if (!githubInstance.isLogin()) {
        throw new Error("请先登录github");
    }
    const workDir = store.state.editor.workDir;
    const local = await db.checkOrCreateStore(workDir);
    const remote = local.get('remote_git');
    if (remote) {
        let url = remote.git_url;
        url = url.replace('git://github.com/','git@github.com:');
        await apiSaveGit(workDir);
        await syncGithub(workDir, url);
        successMessage('同步成功！');
        return;
    }
    store.commit("setEnableConfigRemoteRepo", true);
};

export const loginToken = async (token) => {
    await githubInstance.login(token);
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
        }).catch((e) => {
            errorMessage(e);
            console.error(e);
        });
}
