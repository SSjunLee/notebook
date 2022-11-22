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


    asyncExec() {
        const that = this;
        return new Promise((resolve, reject) => {
            this.__createProcess().then(() => {
                this.executor.on('exit', ((code, sig) => {
                    if (code === 0) {
                        resolve(that.msg);
                    } else {
                        if (that.error_msg) {
                            reject(that.error_msg);
                        } else if (sig) {
                            console.error(`===== command failed ${sig}`);
                            reject(sig);
                        }else{
                            console.error('command failed...');
                            reject();
                        }
                    }
                }));
                this.executor.stdout.on('data', (data) => {
                    that.msg = encoder.encode(data.toString());
                });

                this.executor.stderr.on('data', (data) => {
                    console.error("===== command exec error =======\n", data.toString());
                    that.error_msg = encoder.encode(data.toString())
                });
            }).catch(e => {
                reject(e);
            });
        })
    }

};
