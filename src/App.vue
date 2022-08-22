<script setup>
import { RouterView } from 'vue-router'
</script>

<template>

<router-view v-slot="{ Component }">
  <transition name="fade" appear>
    <component :is="Component" />
  </transition>
</router-view>

</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1.5s ease-out;
}
</style>
