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
  <span>Counter: {{ counter }}</span>
  <div id="timeline-container">
    <div id="timeline-axis"></div>
    <EventMarkers :events="events"/>
    <DiscreteScrollArea @discreteScroll="handleScroll"/>
  </div>
</template>

<style scoped>
#timeline-container {
  /* position: relative; */

  max-height: 90vh;

  /* DEBUG */
  border: dashed 1px black;
}

#timeline-axis {
  background-color: black;

  margin-top: 2px;
  min-height: 2px;
  height: 2px;

  width: 1000px;
  min-width: 1000px;

  position: absolute;
  z-index: -10;
}
</style>
