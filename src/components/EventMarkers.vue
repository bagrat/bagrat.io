<script setup>
import { onMounted, onUnmounted, defineProps, ref, computed } from 'vue'

const { events } = defineProps({
  events: Array,
})

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

const windowWidth = ref(window.innerWidth)

onMounted(() => {
    window.addEventListener('resize', () => {windowWidth.value = window.innerWidth})
})

onUnmounted(() => {
    window.removeEventListener('resize', () => {windowWidth.value = window.innerWidth})
})

const totalMonths = getPreciseDelta(events[0], events[events.length - 1])
const spacingMultiplier = computed(() => { return (windowWidth.value - 8 * events.length - 4) / totalMonths })

const eventsWithDeltas = getEventsWithDeltas(events).map((eventWithDelta) => {
  return {
    ...eventWithDelta,
    marginLeft: computed(() => {
      return eventWithDelta.delta * spacingMultiplier.value
    }),
  }
})
</script>

<template>
  <ul id="events">
    <template v-for="eventMarker in eventsWithDeltas">
      <li>
        <div class="event-marker">
          <div
            class="pre-event-period"
            :style="{'width': `${eventMarker.marginLeft.value}px`}"
          ></div>
          <div class="event-marker-box">
            <div class="event-marker-dot"></div>
            <span>{{ eventMarker.year }}</span>
          </div>
        </div>
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
  padding-left: 2px;
  z-index: 0;

  /* DEBUG */
  /* border: dashed 1px black; */
}

ul#events > li {
  list-style-type: none;

  /* DEBUG */
  /* padding-left: 30px; */
  /* border: dashed 1px black; */
}

.event-marker {
  display: flex;
}

.event-marker-box {
  width: 8px;
}

.pre-event-period {
  background-color: red;
  height: 4px;
  margin-top: 4px;

  /* transform: scaleX(1.1); */

  /* DEBUG */
  /* border: dashed 1px black; */
}

.event-marker-dot {
  margin: 0 0 0 0;
  margin-top: 2px;
  /* margin-left: 2px; */
  transform: scale(1.5);

  background-color: red;
  width: 8px;
  height: 8px;
  border-radius: 4px;

  /* background-color: black; */

  /* DEBUG */

  font-size: 8px;
}

ul#events > li > .event-marker div > span {
  /* DEBUG */

  font-size: 8px;
}
</style>
