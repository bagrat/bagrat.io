<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <transition name="fade" appear>
    <RouterView />
  </transition>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1.5s ease-out;
}
</style>
