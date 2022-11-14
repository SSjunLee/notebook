import {ipcMain} from  'electron'

export default function () {
    ipcMain.on('my_handle',(ev,r)=>{
        console.log("my_handle ",r);
        ev.reply("from-main","this is main")
    });
}
