import Command from "./cmd";



export  class Git{
    constructor(path){
        this.path = path;
        this.cmds = [];
        this.__buildCmds();
    };

    __buildCmds(){
        const opt = {cwd:this.path};
        this.cmds = [
            new Command('git',['init'],opt),
            new Command('git',['add','.'],opt),
            new Command('git',['commit','-m','my commit'],opt),
        ];
    }

    async commit(){
        for(let i = 0;i<this.cmds.length-1;i++){
            const cmd = this.cmds[i];
            await cmd.asyncExec();
        }
    }
}

export const registerGitMethods = (ipcMain)=>{
    ipcMain.handle('saveGit', async (ev, path) => {
        const git =  new Git(path);
        return await git.commit();
    });
};
