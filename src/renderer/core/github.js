import axios from "axios";
import {copyAttr} from '@/util/common';
import db from '@/core/db'
import store from '@/store'

const endpoints = {
    "current_user_url": "https://api.github.com/user",
    "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
    "authorizations_url": "https://api.github.com/authorizations",
    "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
    "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
    "emails_url": "https://api.github.com/user/emails",
    "emojis_url": "https://api.github.com/emojis",
    "events_url": "https://api.github.com/events",
    "feeds_url": "https://api.github.com/feeds",
    "followers_url": "https://api.github.com/user/followers",
    "following_url": "https://api.github.com/user/following{/target}",
    "gists_url": "https://api.github.com/gists{/gist_id}",
    "hub_url": "https://api.github.com/hub",
    "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
    "issues_url": "https://api.github.com/issues",
    "keys_url": "https://api.github.com/user/keys",
    "label_search_url": "https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page}",
    "notifications_url": "https://api.github.com/notifications",
    "organization_url": "https://api.github.com/orgs/{org}",
    "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
    "organization_teams_url": "https://api.github.com/orgs/{org}/teams",
    "public_gists_url": "https://api.github.com/gists/public",
    "rate_limit_url": "https://api.github.com/rate_limit",
    "repository_url": "https://api.github.com/repos/{owner}/{repo}",
    "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
    "current_user_repositories_url": "https://api.github.com/user/repos",
    "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
    "starred_gists_url": "https://api.github.com/gists/starred",
    "topic_search_url": "https://api.github.com/search/topics?q={query}{&page,per_page}",
    "user_url": "https://api.github.com/users/{user}",
    "user_organizations_url": "https://api.github.com/user/orgs",
    "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
    "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
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

    async login(token) {
        this.accessToken = token;
        this.instance = axios.create({
            headers: {
                Authorization: `token ${this.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            timeout: 3000
        });
        this.currentUser = this.getUser(token);

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

    updateTokenList(token,user){
        let tkList = db.sys.get("tokenList") || [];
        tkList.push({token: token, name: user.name,avatar_url:user.avatar_url});
        db.sys.set("tokenList", tkList);
        store.commit("setTokenList", tkList);
    }

    saveUser(token, user) {
        db.sys.set(token, user);
        this.updateTokenList(token,user);
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

}


export const loadTokenList = () => {
    const tkList = db.sys.get("tokenList") || [];
    store.commit("setTokenList", tkList);
    return tkList;
};
