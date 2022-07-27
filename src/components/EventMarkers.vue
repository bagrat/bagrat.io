<script setup>
import { onMounted, onUnmounted, defineProps, ref, computed } from 'vue'

const { events, height, paddingLeft, paddingRight } = defineProps({
  events: Array,
  height: Number,
  paddingLeft: {
    type: Number,
    default: 0,
  },
  paddingRight: {
    type: Number,
    default: 0,
  },
})

function calculatePrelude(event, nextEvent) {
  if (event.year === nextEvent.year) {
    return nextEvent.month - event.month
  } else {
    return 12 * (nextEvent.year - event.year - 1) + (12 - event.month + nextEvent.month)
  }
}

function getMarkersWithPrelude(events) {
  return events.reduce((result, current, index, events) => {
    if (index === 1) {
      const previous = result
      return [
        {...previous, prelude: 0},
        {...current, prelude: calculatePrelude(previous, current)},
      ]
    } else {
      const previous = events[index - 1]

      return [
        ...result,
        {...current, prelude: calculatePrelude(previous, current)},
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

const finalPaddingLeft = paddingLeft + markerPostScaleDisplacement
const finalPaddingRight = paddingRight + markerPostScaleDisplacement

const totalMonths = calculatePrelude(events[0], events[events.length - 1])
const spacingMultiplier = computed(() => {
  return (width.value - markerPreScaleDiameter * events.length - finalPaddingLeft - finalPaddingRight) / totalMonths
})

const markers = getMarkersWithPrelude(events).map((markerWithPrelude) => {
  return {
    ...markerWithPrelude,
    preludeWidth: computed(() => {
      return markerWithPrelude.prelude * spacingMultiplier.value
    }),
  }
})
const one = ref(1)
markers[0].preludeWidth = computed(() => finalPaddingLeft * one.value)
</script>

<template>
  <ul
    id="markers"
    ref="markersElement"
  >
    <li v-for="marker in markers">
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
  padding: 0 0 0 0;
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
