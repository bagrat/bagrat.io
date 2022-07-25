<script setup>
import Timeline from '@/components/Timeline.vue'

const events = [
  {
    year: 1991
  },
  {
    year: 1997
  },
  {
    year: 2004,
  },
  {
    year: 2005,
  },
]
</script>

<template>
  <h1>Bagrat Aznauryan</h1>
  <Timeline :events="events"></Timeline>
</template>

<style>
h1 {
  margin: 0 0 0 0;
}
</style>
