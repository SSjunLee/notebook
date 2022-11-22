import Command from "./cmd";


const c = (args, opt) => {
    return new Command('git', args, opt);
};

export class Git {
    constructor(path) {
        this.path = path;
        const opt = {cwd: this.path};
        this.gitpull = null;
        this.gitinit = c(['init'], opt);
        this.gitadd = c(['add', '.'], opt);
        this.gitcommit = c(['commit', '-m', 'my commit'], opt);
    };


    async commit() {
        await this.gitinit.asyncExec();
        await this.gitadd.asyncExec();
        await this.gitcommit.asyncExec();
    }

    async pull(url) {
        this.gitpull = c(['pull', url, '--allow-unrelated-histories'], {cwd: this.path});
        const res = this.gitpull.asyncExec();
        console.log('======== git pull ========\n', res);
    }
}

let git = new Git();

export const registerGitMethods = (ipcMain) => {
    ipcMain.handle('saveGit', async (ev, path) => {
        git.path = path;
        return await git.commit();
    });
    ipcMain.handle('syncGithub', async (ev, path, url) => {
        git.path = path;
        await git.pull(url);
    });
};
