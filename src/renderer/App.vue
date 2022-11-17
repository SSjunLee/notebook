<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {defaultWorkDir} from "@/api/file";
  import {installNotification} from "@/util/common"
export default {
    mounted() {
      installNotification(this);
      this.$store.commit("setWorkDir",defaultWorkDir());
    }
};
</script>

<style>
/* CSS */
</style>
