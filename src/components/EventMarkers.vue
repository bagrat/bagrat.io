<script setup>
import { defineProps } from 'vue'

const { events } = defineProps({
  events: Array,
})

const spacingMultiplier = 20;

function getEventsWithDeltas(events) {
  return events.reduce((result, current, index, events) => {
    if (index === 1) {
      const previous = result
      return [
        {...previous, delta: 0},
        {...current, delta: current.year - previous.year},
      ]
    } else {
      const previous = events[index - 1]

      return [
        ...result,
        {...current, delta: current.year - previous.year},
      ]
    }
  })
}

const eventsWithDeltas = getEventsWithDeltas(events)
console.log(eventsWithDeltas)
</script>

<template>
  <ul id="events">
    <template v-for="eventMarker in eventsWithDeltas">
      <li :style="{'margin-left': `${eventMarker.delta * spacingMultiplier}px`}">
        <div>{{ eventMarker.year }}</div>
      </li>
    </template>
  </ul>
</template>

<style scoped>
ul#events {
  position: absolute;
  display: flex;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  z-index: 0;
  padding-left: 30px;

  /* DEBUG */
  /* border: dashed 1px black; */
}

ul#events > li {
  list-style-type: none;

  /* DEBUG */
  /* padding-left: 30px; */
  /* border: dashed 1px black; */
}

ul#events > li > div {
  /* min-width: 6px; */
  /* width: 6px; */

  /* min-height: 6px; */
  /* height: 6px; */

  /* border-radius: 3px; */

  min-width: 2px;
  width: 2px;
  min-height: 6px;
  height: 6px;

  background-color: black;

  /* DEBUG */

  padding-top: 10px;
  font-size: 8px;
}
</style>
