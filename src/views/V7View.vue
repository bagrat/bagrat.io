<script setup>
import v7story from "@/v7story.js";
import StoryScreen from "@/components/StoryScreen.vue";
</script>

<template>
  <StoryScreen :source="v7story" :bookACall="true" />
</template>
