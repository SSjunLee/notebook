import Store from 'electron-store'
import {mkdir} from "@/api/file";
import libPath from 'path'

class Db {
    localStorage = {};

    constructor() {
        this.sys = new Store();
    }

    async createLocalStore(path) {
        const metaPath = libPath.join(path, ".meta");
        await mkdir(metaPath);
        this.localStorage[path] = this.store = new Store({
            cwd: metaPath
        });
    }



}

const db = new Db();
export default db;
