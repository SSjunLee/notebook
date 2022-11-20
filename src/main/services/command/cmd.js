import {spawn} from 'child_process'

const encoder = new TextEncoder();
export default class Command {
    ignoreData = false;
    executor = null;

    __createProcess() {
        return new Promise((resolve, reject) => {
            this.executor = spawn(this.cmd, this.args, this.opt);
            this.executor.on('error', (e) => {
                console.warn(e);
                reject(e);
            });
            this.executor.on('spawn', () => {
                this.valid = true;
                resolve();
            })
        })
    }

    constructor(cmd, args, opt) {
        this.cmd = cmd;
        this.args = args;
        this.opt = opt;
    }


     asyncExec() {
        return new Promise((resolve, reject) => {
            this.__createProcess().then(()=>{
                this.executor.on('close', (code => {
                    if (this.ignoreData) {
                        resolve(code);
                    }
                }));
                this.executor.stdout.on('data', (data) => {
                    data = data.toString();
                    if (!this.ignoreData)
                        resolve(encoder.encode(data));
                });

                this.executor.stderr.on('data', (data) => {
                    data = data.toString();
                    console.error(data);
                    reject(encoder.encode(data));
                });
                setTimeout(()=>{
                    resolve('success');
                },3000)
            }).catch(e=>{
                reject(e);
            });
        })
    }

};
