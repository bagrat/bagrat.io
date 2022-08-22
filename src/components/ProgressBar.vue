<script setup>
import { onMounted, onUnmounted, onUpdated, ref, computed } from "vue";

const props = defineProps({
  progress: Number,
  numOfSteps: Number,
  height: Number,
});

const progress = computed(() => props.progress);
let previousIndex = progress.value - 1;
const containerElement = ref(null);
const width = ref(0);

const markerDiameter = computed(() => props.height);
const axisHeight = computed(() => markerDiameter.value / 3);
const activeScaleFactor = 1.3;
const markerSpacing = computed(() => width.value / props.numOfSteps);
const containerPaddingTop =
  (markerDiameter.value * (activeScaleFactor - 1)) / 2;

const markers = computed(() => {
  return Array(props.numOfSteps)
    .fill({})
    .map((_, index) => {
      return {
        isActive: index === progress.value,
        hasElapsed: index < progress.value,
        isPrevious: index === previousIndex,
      };
    });
});

const highlightWidth = computed(() => {
  return progress.value * markerSpacing.value + markerSpacing.value / 2;
});

const cssVars = {
  "--inactive-color": "var(--color-base-1)",
  "--active-color": "var(--color-base-3)",
  "--active-scale-factor": activeScaleFactor,
  "--marker-diameter": `${markerDiameter.value}px`,
  "--marker-radius": `${markerDiameter.value / 2}px`,
  "--markers-margin-top": `${-2 * axisHeight.value}px`,
  "--container-padding-top": `${containerPaddingTop}px`,
  "--axis-height": `${axisHeight.value}px`,
  "--axis-margin-top": `${axisHeight.value}px`,
  "--axis-highlight-margin-top": `${-1 * axisHeight.value}px`,
};

function inferWidth() {
  width.value = containerElement.value.clientWidth;
}

onMounted(() => {
  inferWidth();
  window.addEventListener("resize", inferWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", inferWidth);
});

onUpdated(() => {
  inferWidth();
  previousIndex = progress.value;
});
</script>

<template>
  <div id="progress-bar-container" ref="containerElement" :style="cssVars">
    <div id="axis"></div>
    <div id="axis-highlight" :style="{ width: `${highlightWidth}px` }"></div>
    <ul id="markers">
      <li v-for="(marker, index) in markers" :key="`marker-${index}`">
        <div
          :class="{
            marker: true,
            active: marker.isActive,
            elapsed: marker.hasElapsed,
            previous: marker.isPrevious,
          }"
        ></div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#progress-bar-container {
  display: flex;
  flex-direction: column;
  padding-top: var(--container-padding-top);
}

#axis {
  background-color: var(--inactive-color);
  width: 100%;
  height: var(--axis-height);
  margin-top: var(--axis-margin-top);
  border-radius: 3px;

  z-index: -10;
}

#axis-highlight {
  background-color: var(--active-color);
  height: var(--axis-height);
  margin-top: var(--axis-highlight-margin-top);

  border-radius: 3px;

  z-index: -5;

  transition-property: width;
  transition-duration: 0.4s;
  transition-delay: 0.1s;
}

ul#markers {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;

  margin: 0 0 0 0;
  padding: 0 0 0 0;
  z-index: 0;
  margin-top: var(--markers-margin-top);
}

ul#markers > li {
  list-style-type: none;
  max-width: var(--marker-diameter);
  flex-direction: column;
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
  transition-delay: 0.35s, 0.2s;
  transition-duration: 0.15s, 0.3s;
  transition-timing-function: ease;
}

.marker.active,
.marker.elapsed {
  background-color: var(--active-color);
}

.marker.previous {
  transition-property: background-color, transform;
  transition-duration: 0.1s, 0.3s;
  transition-timing-function: ease-out;
}
</style>
