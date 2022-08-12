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

const activeIndex = computed(() => Math.min(events.length - 1, Math.max(props.activeIndex, 0)))

let previousIndex = activeIndex.value - 1

const [markersPaddingLeft, markersPaddingRight] = markersPadding

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

const containerElement = ref(null)
const width = ref(0)

function calculateWidth() {
  width.value = containerElement.value.clientWidth
}

onMounted(() => {
  calculateWidth()
  window.addEventListener('resize', calculateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateWidth)
})

onUpdated(() => {
  calculateWidth()
  previousIndex = activeIndex.value
})

const axisHeight = height / 3;

const markerDiameter = height;
const activeScaleFactor = 1.5;
const containerPaddingTop = (markerDiameter * (activeScaleFactor - 1)) / 2;

const totalMonths = calculatePrelude(events[0], events[events.length - 1])
const monthUnitWidth = computed(() => {
  return (width.value - markerDiameter * events.length - markersPaddingLeft - markersPaddingRight) / totalMonths
})

const markers = computed(() => {
  const markersWithPrelude = getMarkersWithPrelude(events)
  const markers = markersWithPrelude.map((markerWithPrelude, index) => {
    let preludeWidth = markerWithPrelude.prelude * monthUnitWidth.value
    if (index === 0) {
      preludeWidth = markersPaddingLeft
    }

    return {
      ...markerWithPrelude,
      preludeWidth: preludeWidth,
      isActive: index === activeIndex.value,
      hasElapsed: index < activeIndex.value,
      isPrevious: index === previousIndex,
      cssVars: {
        '--prelude-width': `${preludeWidth}px`,
      },
    }
  })

  return markers
})

const highlightWidth = computed(() => {
  return markers.value.slice(0, activeIndex.value + 1).reduce((widthSoFar, marker) => {
    return widthSoFar + marker.preludeWidth + markerDiameter
  }, 0) - (markerDiameter / 2)
})

const cssVars = {
  '--inactive-color': 'grey',
  '--active-color': 'black',
  '--active-scale-factor': activeScaleFactor,
  '--marker-diameter': `${markerDiameter}px`,
  '--marker-radius': `${markerDiameter / 2}px`,
  '--markers-margin-top': `${-2 * axisHeight}px`,
  '--container-padding-top': `${containerPaddingTop}px`,
  '--axis-height': `${axisHeight}px`,
  '--axis-margin-top': `${axisHeight}px`,
  '--axis-highlight-margin-top': `${-1 * axisHeight}px`,
}
</script>

<template>
  <!-- TODO: Size the height properly so that it includes all children -->
  <div id="timeline-container" ref="containerElement" :style="cssVars">
    <div id="axis"></div>
    <div id="axis-highlight" :style="{'width': `${highlightWidth}px`}"></div>
    <ul id="markers">
      <li v-for="marker in markers" :style="marker.cssVars">
        <div :class="{
            'marker': true,
            'active': marker.isActive,
            'elapsed': marker.hasElapsed,
            'previous': marker.isPrevious,
          }"
        ></div>
        <transition>
          <div v-if="marker.isActive" class="label">{{ marker.year }}</div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#timeline-container {
  display: flex;
  flex-direction: column;
  padding-top: var(--container-padding-top);

  /* DEBUG */
  width: 80%;
  margin-left: 10%;
  /* border: dashed 1px black; */
}

#axis {
  background-color: var(--inactive-color);
  width: 100%;
  height: var(--axis-height);
  margin-top: var(--axis-margin-top);

  z-index: -10;
}

#axis-highlight {
  background-color: var(--active-color);
  height: var(--axis-height);
  margin-top: var(--axis-highlight-margin-top);

  z-index: -5;

  transition-property: width;
  transition: 0.4s width ease;
  transition-delay: 0.1s;
}

ul#markers {
  display: flex;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  z-index: 0;
  margin-top: var(--markers-margin-top);
}

ul#markers > li {
  list-style-type: none;
  max-width: var(--marker-diameter);
  display: flex;
  flex-direction: column;
  padding-left: var(--prelude-width);
}

.marker {
  margin: 0 0 0 0;
  background-color: var(--inactive-color);

  width: var(--marker-diameter);
  height: var(--marker-diameter);
  border-radius: var(--marker-radius);
}

.marker.active {
  transform: scale(var(--active-scale-factor));
  transition-property: background-color, transform;
  transition-delay: 0.4s, 0.2s;
  transition-duration: 0.15s, 0.3s;
  transition-timing-function: cubic-bezier(.03,1.07,.27,1), cubic-bezier(.82,-0.12,.95,2.04); 
}

.marker.previous {
  transition-property: background-color, transform;
  transition-duration: 0.1s, 0.3s;
  transition-timing-function: ease-out;
}

.marker.active,
.marker.elapsed {
  background-color: var(--active-color);
}

.label {
  font-size: 0.7em;
  margin-top: 0.6em;
  transform: translateX(-0.50em);
}

.label.v-enter-active {
  transition-property: opacity, transform;
  transition-delay: 0.3s;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.label.v-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}

.label.v-enter-from,
.label.v-leave-to {
  opacity: 0;
  transform: scale(0.1) translateY(-800%);
}
</style>
