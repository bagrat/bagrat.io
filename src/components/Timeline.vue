<script setup>
import { onMounted, onUnmounted, onUpdated, defineProps, ref, computed } from 'vue'

const props = defineProps({
  events: Array,
  activeIndex: Number,
  height: Number,
  markersPadding: {
    type: Array,
    default: [0, 0],
    validator(value) {
      const invalidTypes = value.map(item => typeof(item)).filter(type => type !== 'number')
      if (value.length !== 2 || invalidTypes.length > 0) {
        return false;
      }
      return true
    }
  }
})
const { events, height, markersPadding } = props

const activeIndex = computed(() => props.activeIndex)

let previousIndex = activeIndex.value - 1

onUpdated(() => {
  previousIndex = activeIndex.value
})

const [markersPaddingLeft, markersPaddingRight] = markersPadding

const axisHeight = height / 3;
const axisMarginTop = axisHeight;

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

const finalPaddingLeft = markersPaddingLeft + markerPostScaleDisplacement
const finalPaddingRight = markersPaddingRight + markerPostScaleDisplacement

const totalMonths = calculatePrelude(events[0], events[events.length - 1])
const spacingMultiplier = computed(() => {
  return (width.value - markerPreScaleDiameter * events.length - finalPaddingLeft - finalPaddingRight) / totalMonths
})

const cssVars = {
  '--scale-factor': scaleFactor,
  '--active-scale-factor': scaleFactor * 1.4,
}

const markers = computed(() => {
  const markersWithPrelude = getMarkersWithPrelude(events)
  const markersEnhanced = markersWithPrelude.map((markerWithPrelude, index) => {
      return {
        ...markerWithPrelude,
        preludeWidth: markerWithPrelude.prelude * spacingMultiplier.value,
        isActive: index === activeIndex.value,
        hasElapsed: index < activeIndex.value,
        preludeHasElapsed: index <= activeIndex.value,
        isPrevious: index === previousIndex,
    }
  })
  markersEnhanced[0].preludeWidth = finalPaddingLeft

  return markersEnhanced
})
</script>

<template>
  <!-- TODO: Size the height properly so that it includes all children -->
  <div
    id="timeline-container"
    :style="{
      'height': `${3 * axisHeight * 1.2}px`,
    }"
  >
    <div
      id="timeline-axis"
      :style="{
        'margin-top': `${axisMarginTop}px`,
        'height': `${axisHeight}px`,
      }"
    ></div>
    <ul
      id="markers"
      ref="markersElement"
      :style="{...cssVars}"
    >
      <li v-for="marker in markers">
        <div
          class="prelude-container"
          :style="{
            'width': `${marker.preludeWidth}px`,
            'height': `${preludeHeight}px`,
            'margin-top': `${preludeMarginTop}px`,
          }"
        >
          <div
            class="prelude"
            :class="{
              'prelude-active': marker.isActive,
              'prelude-previous': marker.isPrevious,
            }"
            :style="{
              'width': marker.preludeHasElapsed ? `${marker.preludeWidth}px` : '0px',
              'height': `${preludeHeight}px`,
            }"
          ></div>
        </div>
        <div :style="{'width': `${markerPreScaleDiameter}px`}">
          <div
            class="marker-dot"
            :class="{
              'active': marker.isActive,
              'elapsed': marker.hasElapsed,
              'previous': marker.isPrevious,
            }"
            :style="{
              'width': `${markerPreScaleDiameter}px`,
              'height': `${markerPreScaleDiameter}px`,
              'border-radius': `${markerPreScaleDiameter / 2}px`,
              'margin-top': `${markerMarginTop}px`,
            }"
          >
          </div>
          <transition>
            <div v-if="marker.isActive" class="label">{{ marker.year }}</div>
          </transition>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#timeline-container {
  width: 80%;
  margin-left: 10%;

  /* DEBUG */
  /* border: dashed 1px black; */
}

#timeline-axis {
  background-color: black;
  width: 100%;

  z-index: -10;
}

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

.marker-dot {
  margin: 0 0 0 0;
  background-color: black;
  transform: scale(calc(var(--scale-factor)))
}

.marker-dot.active {
  transform: scale(calc(var(--active-scale-factor)));
  transition-property: background-color, transform;
  transition-delay: 0.4s, 0.2s;
  transition-duration: 0.15s, 0.3s;
  transition-timing-function: cubic-bezier(.03,1.07,.27,1), cubic-bezier(.82,-0.12,.95,2.04); 
}

.marker-dot.previous {
  transition-property: background-color, transform;
  transition-duration: 0.1s, 0.3s;
  transition-timing-function: ease-out;
}

.prelude,
.active,
.elapsed {
  background-color: red;
}

.prelude-previous,
.prelude-active {
  transition: 0.4s width ease;
  transition-delay: 0.1s;
}

.label {
  font-size: 0.7em;
  margin-top: 0.7em;
  transform: translateX(-0.75em);
}

.label.v-enter-active {
  transition: opacity 0.4s ease-in 0.35s;
}
.label.v-leave-active {
  transition: opacity 0.3s ease-out;
}

.label.v-enter-from,
.label.v-leave-to {
  opacity: 0;
}
</style>
