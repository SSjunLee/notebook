import {ipcMain} from 'electron'

const fs = require("fs");
const normalHandler = (method) => {
    return (ev, ...args) => {
        return new Promise((resolve, reject) => {
            console.log(...args);
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
    ['open', 'readdir', 'readFile', 'writeFile','stat'].map(method => {
        registerNormalHandler(method);
    });
};


export default function () {
    registerFileMethods();
}
