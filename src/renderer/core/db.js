import Store from 'electron-store'
import {mkdir} from "@/api/file";
import libPath from 'path'

class Db {
    localStorage = {};

    constructor() {
        this.sys = new Store();
    }

    async checkOrCreateStore(path) {
        const metaPath = libPath.join(path, ".meta");
        if (this.localStorage[path]) {
            return this.localStorage[path];
        }
        await mkdir(metaPath);
        this.localStorage[path] = this.store = new Store({
            cwd: metaPath
        });
        return this.localStorage[path];
    }

    saveUser(user) {
        this.sys.set('user', user);
    }

    getUser() {
        return this.sys.get('user');
    }

    getRepos() {
        const user = this.getUser();
        if (!user) return [];
        const token = user.token;
        const info =  this.sys.get(token);
        if(!info || !info.repos){
            console.error('null info');
            return [];
        }
        return info.repos;
    }


}

const db = new Db();
export default db;
