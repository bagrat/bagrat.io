<script setup>
import { ref, defineProps } from 'vue'
import DiscreteScrollArea from './DiscreteScrollArea.vue'
import EventMarkers from './EventMarkers.vue'

const { events } = defineProps({
  events: Array,
})

const counter = ref(0)

function handleScroll(direction) {
  if (direction === 'forwards') {
    counter.value++
  } else {
    counter.value--
  }
}

</script>

<template>
  <div id="timeline-container">
    <div id="timeline-axis"></div>
    <EventMarkers :events="events"/>
    <DiscreteScrollArea @discreteScroll="handleScroll"/>
  </div>
</template>

<style scoped>
#timeline-container {
  /* position: relative; */
  width: 100%;

  /* max-height: 90vh; */

  /* DEBUG */
  border: dashed 1px black;
}

#timeline-axis {
  background-color: black;

  margin-top: 4px;
  min-height: 2px;
  height: 4px;

  width: 100%;
  /* min-width: 100vw; */

  position: absolute;
  z-index: -10;
}
</style>
