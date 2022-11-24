<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {defaultWorkDir} from "@/api/file";
  import {installNotification,installLoading} from "@/util/common"
  import {loadTokenList} from "@/core/github";
  import db from '@/core/db'

  Vue.prototype.$bus = new Vue();
  Vue.prototype.$db = db;
export default {
    mounted() {
      loadTokenList();
      installNotification(this);
      installLoading(this);
      this.$store.commit("setWorkDir",defaultWorkDir());
    }
};
</script>

<style>
/* CSS */
</style>
