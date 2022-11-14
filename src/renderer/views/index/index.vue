<template>
    <div>主页
        {{dir}}<br/>
        {{data}}
    </div>
</template>

<script>
    import Vue from 'vue'
    //import {ipcRenderer} from 'electron'
    export default {
        name: "index",
        data() {
            return {
                dir: [],
                data:""
            }
        },
        mounted() {
            const $vm = this;
            const fs = require("fs");
            this.dir = fs.readdirSync("D:\\code\\qianduan\\ljn\\notebook")
            Vue.$ipc.on("from-main",(e,r)=>{
                console.log(r);
                this.data = r;
            });
            Vue.$ipc.send("my_handle","render meassage")

        }
    }
</script>

<style scoped>

</style>
