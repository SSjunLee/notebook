import {spawn} from 'child_process'

const encoder = new TextEncoder();
export default class Command {
    executor = null;
    msg = "";
    error_msg = "";

    __createProcess() {
        return new Promise((resolve, reject) => {
            this.executor = spawn(this.cmd, this.args, this.opt);
            this.executor.on('error', (e) => {
                console.error(`${this.msg} ${this.args} create error...`, e);
                reject(e);
            });
            this.executor.on('spawn', () => {
                resolve();
            });
        })
    }

    constructor(cmd, args, opt) {
        this.cmd = cmd;
        this.args = args;
        this.opt = opt;
    }

    toString(){
        return `${this.cmd} ${this.args} ${this.opt}`;
    }


    asyncExec() {
        const that = this;
        return new Promise((resolve, reject) => {
            this.__createProcess().then(() => {
                this.executor.on('exit', ((code, sig) => {
                    if (code === 0) {
                        resolve(that.msg);
                    } else {
                        reject(that.error_msg);
                    }
                }));
                this.executor.stdout.on('data', (data) => {
                    console.log("===== command stdout =======\n", data.toString());
                    that.msg = encoder.encode(data.toString());
                });

                this.executor.stderr.on('data', (data) => {
                    console.error(this.toString(),"\n===== command stderr =======\n", data.toString());
                    this.error_msg = data.toString();
                });
            }).catch(e => {
                reject(e);
            });
        })
    }

};
