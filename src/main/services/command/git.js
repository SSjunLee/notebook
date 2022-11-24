import Command from "./cmd";


const c = (args, opt) => {
    return new Command('git', args, opt);
};

export class Git {
    constructor(path) {
        this.opt = {cwd: path};
        this.gitpull = c(['pull', 'origin','main', '--allow-unrelated-histories'], this.opt);
        this.gitremoteadd = null;
        this.gitbranch = c(['branch', '-M', 'main'], this.opt);
        this.gitinit = c(['init'], this.opt);
        this.gitadd = c(['add', '.'], this.opt);
        this.gitcommit = c(['commit', '-m', 'my commit'], this.opt);
        this.gitpush = c(['push','--set-upstream','origin','main'],this.opt);
    };

    async commit() {
        await this.gitinit.asyncExec();
        await this.gitadd.asyncExec();
        await this.gitcommit.asyncExec();
    }

    async sync(url) {
        this.gitremoteadd = c(['remote', 'add', 'origin', url], this.opt);
        try {
            await this.gitremoteadd.asyncExec();
            await this.gitbranch.asyncExec();
        }catch (e) {
            console.log(e);
        }
        await this.gitpush.asyncExec();
    }
}

let git = new Git();

export const registerGitMethods = (ipcMain) => {
    ipcMain.handle('saveGit', async (ev, path) => {
        git.opt.cwd = path;
        await git.commit();
    });
    ipcMain.handle('syncGithub', async (ev, path, url) => {
        git.opt.cwd = path;
        await git.sync(url);
    });
};
