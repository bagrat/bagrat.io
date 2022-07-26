<script setup>
import { defineProps } from 'vue'

const { events } = defineProps({
  events: Array,
})

const spacingMultiplier = 2;

function getPreciseDelta(event, nextEvent) {
  if (event.year === nextEvent.year) {
    return nextEvent.month - event.month
  } else {
    return 12 * (nextEvent.year - event.year - 1) + (12 - event.month + nextEvent.month)
  }
}

function getEventsWithDeltas(events) {
  return events.reduce((result, current, index, events) => {
    if (index === 1) {
      const previous = result
      return [
        {...previous, delta: 0},
        {...current, delta: getPreciseDelta(previous, current)},
      ]
    } else {
      const previous = events[index - 1]

      return [
        ...result,
        {...current, delta: getPreciseDelta(previous, current)},
      ]
    }
  })
}

const eventsWithDeltas = getEventsWithDeltas(events)
</script>

<template>
  <ul id="events">
    <template v-for="eventMarker in eventsWithDeltas">
      <li :style="{'margin-left': `${eventMarker.delta * spacingMultiplier}px`}">
        <div></div>
        <span>{{ eventMarker.year }}</span>
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

  width: 12px;
  min-height: 12px;
  max-height: 12px;
  border-radius: 6px;

  background-color: black;

  /* DEBUG */

  /* margin-top: 2px; */
  font-size: 8px;
}
</style>
