import Command from "./cmd";



const c = (args, opt) => {
    return new Command('git', args, opt).asyncExec();
};

export class Git {
    constructor(path) {
        this.opt = {cwd: path};
        this.gitpull = null;
        this.gitinit = c(['init'], this.opt);
        this.gitadd = c(['add', '.'], this.opt);
        this.gitcommit = c(['commit', '-m', 'my commit'], this.opt);
    };

    async commit() {
        console.log(this.gitinit.opt);
        let r;
        r = await this.gitinit.asyncExec();
        console.log(new TextDecoder().decode(r));
        r = await this.gitadd.asyncExec();
        console.log(new TextDecoder().decode(r));
        r = await this.gitcommit.asyncExec();
        console.log(new TextDecoder().decode(r));
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
        git.opt.path = path;
        await git.commit();
    });
    ipcMain.handle('syncGithub', async (ev, path, url) => {
        console.log('===== syncgithub ====\n',ev,path,url);
        git.opt.path = path;
        await git.pull(url);
    });
};
