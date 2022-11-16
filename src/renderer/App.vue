<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {installNotification} from "@/util/common"
export default {
    mounted() {
      installNotification(this);
    }
};
</script>

<style>
/* CSS */
</style>
