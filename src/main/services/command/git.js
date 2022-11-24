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
        let r;
        r = await this.gitinit.asyncExec();
        console.log(r);
        r = await this.gitadd.asyncExec();
        console.log(r);
        r = await this.gitcommit.asyncExec();
        console.log(r);
    }

    async pull(url) {
        this.gitpull = c(['pull', url, '--allow-unrelated-histories'], {cwd: this.path});
        const res = await this.gitpull.asyncExec();
        console.log('======== git pull ========\n', new TextDecoder().decode(res));
    }
}

let git = new Git();

export const registerGitMethods = (ipcMain) => {
    ipcMain.handle('saveGit', async (ev, path) => {
        git.path = path;
        await git.commit();
    });
    ipcMain.handle('syncGithub', async (ev, path, url) => {
        console.log('===== syncgithub ====\n',ev,path,url);
        git.path = path;
        await git.pull(url);
    });
};
