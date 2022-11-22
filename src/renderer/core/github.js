import axios from "axios";
import {copyAttr} from '@/util/common';
import db from '@/core/db'
import store from '@/store'

const endpoints = {
    "current_user_url": "https://api.github.com/user",
    "current_user_repositories_url": "https://api.github.com/user/repos",
};

export class UserInfo {
    name = "";
    avatar_url = "";
    followers = 0;
    following = 0;
    gists_url = "";
    repos = [];
}

export class Repo {
    name = "";
    git_url = "";
    description = "";
}

export class Github {
    accessToken = "";
    instance = null;
    currentUser = null;

    isLogin(){
        return this.accessToken !=='';
    }

    async login(token) {
        this.accessToken = token;
        this.instance = axios.create({
            headers: {
                Authorization: `token ${this.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            timeout: 3000
        });
        this.currentUser = await this.getUser(token);

    }

    async getUser(token) {
        let user = db.sys.get(token);
        if (user) {
            return user;
        }
        user = await this.getUserInfo();
        user.repos = await this.getUserRepos();
        this.saveUser(token, user);
        return user;
    }

    updateTokenList(token, user) {
        let tkList = db.sys.get("tokenList") || [];
        tkList.push({token: token, name: user.name, avatar_url: user.avatar_url});
        db.sys.set("tokenList", tkList);
        store.commit("setTokenList", tkList);
    }

    saveUser(token, user) {
        db.sys.set(token, user);
        this.updateTokenList(token, user);
    }

    async getUserRepos() {
        const {data} = await this.instance.get(endpoints.current_user_repositories_url);
        let repos = [];
        data.forEach(item => {
            let tmp = new Repo();
            copyAttr(tmp, item);
            repos.push(tmp);
        });
        return repos;
    }


    async getUserInfo() {
        const {data} = await this.instance.get(endpoints.current_user_url);
        let user = new UserInfo();
        copyAttr(user, data);
        return user;
    }

    async createRepo(conf) {
        const {data} = await this.instance.post(endpoints.current_user_repositories_url,conf);
        console.log(data);
    }

}


export class GitRepoConf {
    constructor() {
        this.name = "";
        this.description = "";
        this.private = true;
    }
}


export const loadTokenList = () => {
    const tkList = db.sys.get("tokenList") || [];
    store.commit("setTokenList", tkList);
    return tkList;
};

export const githubInstance = new Github();
