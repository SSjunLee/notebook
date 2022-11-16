import {ipcMain} from 'electron'

const fs = require("fs");
const normalHandler = (method) => {
    return (ev, ...args) => {
        return new Promise((resolve, reject) => {
            fs[method](...args, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            });
        })
    }
};

const registerNormalHandler = (method) => {
    ipcMain.handle(method, normalHandler(method));
};


const registerFileMethods = () => {
    ['open', 'readdir', 'readFile', 'writeFile'].map(method => {
        registerNormalHandler(method);
    });
    ipcMain.handle('isDirectory', (ev,arg) => {
        console.log('isDirectory',arg);
        return new Promise((resolve, reject) => {
            fs.stat(arg, (err, res) => {
                //console.log(err,res);
                if(err){
                    console.log("报错...");
                    console.log("参数为",arg);
                    console.log("错误码为",err);
                    console.log(arg,err,res);
                    reject(err)
                }else{
                    resolve(res&&res.isDirectory());
                }
            })
        })
    })
};


export default function () {
    registerFileMethods();
}
