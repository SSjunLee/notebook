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


export default function () {
    ipcMain.handle('readdir', normalHandler('readdir'));
    ipcMain.handle('readFile', normalHandler('readFile'));
}
