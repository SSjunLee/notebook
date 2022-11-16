<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {installNotification} from "@/util/common"
  const rootDir = "D:\\code\\qianduan\\ljn\\notebook";
export default {
    mounted() {
      installNotification(this);
      this.$store.commit("setWorkDir",rootDir);
    }
};
</script>

<style>
/* CSS */
</style>
