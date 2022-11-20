import {ipcMain, dialog} from 'electron'
import Store from "electron-store";
import Command from "./cmd";
import {registerGitMethods} from "./git";

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


const registerFileMethods = (ipcMain) => {
    ['stat', 'open', 'readdir', 'readFile', 'writeFile', 'mkdir'].map(method => {
        registerNormalHandler(method);
    });
    ipcMain.handle('isDirectory', (ev, arg) => {
        return new Promise((resolve, reject) => {
            fs.stat(arg, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res && res.isDirectory());
                }
            })
        })
    });
    ipcMain.handle('dialog', async (ev, cfg) => {
        return await dialog.showOpenDialog({
            ...cfg
        });
    });

    ipcMain.handle('saveDialog', async (ev, cfg) => {
        return await dialog.showSaveDialog({
            ...cfg
        });
    });

};

export default function () {
    Store.initRenderer();
    registerFileMethods(ipcMain);
    registerGitMethods(ipcMain);
}
