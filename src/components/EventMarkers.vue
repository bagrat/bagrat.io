<script setup>
import { onMounted, onUnmounted, onUpdated, defineProps, ref, computed } from 'vue'

const { events, height } = defineProps({
  events: Array,
  height: Number,
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

const width = ref(0)
const markersElement = ref(null)

function calculateWidth() {
  width.value = markersElement.value.clientWidth
}

onMounted(() => {
  calculateWidth()
  window.addEventListener('resize', calculateWidth)
})

onUpdated(() => {
  calculateWidth()
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateWidth)
})

const markerDiameter = height;

const preludeHeight = height / 3;
const preludeMarginTop = markerDiameter / 3;

const scaleFactor = 1.5
const markerPreScaleDiameter = markerDiameter / scaleFactor
const markerPostScaleDisplacement = (markerDiameter - markerPreScaleDiameter) / 2
const markerMarginTop = markerPostScaleDisplacement;

const totalMonths = getPreciseDelta(events[0], events[events.length - 1])
const spacingMultiplier = computed(() => {
  return (width.value - markerPreScaleDiameter * events.length - 2 * markerPostScaleDisplacement) / totalMonths
})

const eventsWithDeltas = getEventsWithDeltas(events).map((eventWithDelta) => {
  return {
    ...eventWithDelta,
    preludeWidth: computed(() => {
      return eventWithDelta.delta * spacingMultiplier.value
    }),
  }
})
</script>

<template>
  <ul
    id="markers"
    ref="markersElement"
    :style="{
      'padding-left': `${markerPostScaleDisplacement}px`,
    }"
  >
    <li v-for="marker in eventsWithDeltas">
      <div
        class="prelude"
        :style="{
          'width': `${marker.preludeWidth.value}px`,
          'height': `${preludeHeight}px`,
          'margin-top': `${preludeMarginTop}px`,
        }"
      ></div>
      <div :style="{'width': `${markerPreScaleDiameter}px`}">
        <div
          class="marker-dot"
          :style="{
            'width': `${markerPreScaleDiameter}px`,
            'height': `${markerPreScaleDiameter}px`,
            'border-radius': `${markerPreScaleDiameter / 2}px`,
            'margin-top': `${markerMarginTop}px`,
            'transform': `scale(${scaleFactor})`,
          }"
        >
        </div>
        <span>{{ marker.year }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul#markers {
  display: flex;
  margin: 0 0 0 0;
  z-index: 0;
}

ul#markers > li {
  list-style-type: none;
  display: flex;
}

.prelude {
  background-color: blue;
}

.marker-dot {
  margin: 0 0 0 0;
  background-color: blue;
}

ul#markers span {
  font-size: 8px;
}
</style>
