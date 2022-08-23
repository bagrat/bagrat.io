<script setup>
import { onMounted, onUnmounted, onUpdated, ref, computed } from "vue";

const props = defineProps({
  progress: Number,
  numOfSteps: Number,
  width: Number,
});

const progress = computed(() => props.progress);
let previousIndex = progress.value - 1;
const containerElement = ref(null);
const height = ref(0);

const markerDiameter = computed(() => props.width);
const axisWidth = computed(() => markerDiameter.value / 3);
const activeScaleFactor = 1.3;
const markerSpacing = computed(() => height.value / props.numOfSteps);
const containerPaddingLeft =
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

const highlightHeight = computed(() => {
  return progress.value * markerSpacing.value + markerSpacing.value / 2;
});

const cssVars = {
  "--inactive-color": "var(--color-base-1)",
  "--active-color": "var(--color-base-3)",
  "--active-scale-factor": activeScaleFactor,
  "--marker-diameter": `${markerDiameter.value}px`,
  "--marker-radius": `${markerDiameter.value / 2}px`,
  "--markers-margin-top": `${-2 * axisWidth.value}px`,
  "--container-padding-left": `${containerPaddingLeft}px`,
  "--axis-width": `${axisWidth.value}px`,
  "--axis-margin-top": `${axisWidth.value}px`,
  "--axis-highlight-margin-top": `${-1 * axisWidth.value}px`,
};

function inferHeight() {
  height.value = containerElement.value.clientHeight;
}

onMounted(() => {
  inferHeight();
  window.addEventListener("resize", inferHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", inferHeight);
});

onUpdated(() => {
  inferHeight();
  previousIndex = progress.value;
});
</script>

<template>
  <div id="progress-bar-container" ref="containerElement" :style="cssVars">
    <div id="axis"></div>
    <div id="axis-highlight" :style="{ height: `${highlightHeight}px` }"></div>
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
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-top: var(--container-padding-top);
}

#axis {
  background-color: var(--inactive-color);
  height: 100%;
  width: var(--axis-width);
  margin-left: var(--axis-margin-top);
  border-radius: 3px;

  z-index: -10;
}

#axis-highlight {
  background-color: var(--active-color);
  width: var(--axis-width);
  margin-left: var(--axis-highlight-margin-top);

  border-radius: 3px;

  z-index: -5;

  transition-property: height;
  transition-duration: 0.4s;
  transition-delay: 0.1s;
}

ul#markers {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  height: 100%;

  margin: 0 0 0 0;
  padding: 0 0 0 0;
  z-index: 0;
  margin-left: var(--markers-margin-top);
}

ul#markers > li {
  list-style-type: none;
  max-height: var(--marker-diameter);
  flex-direction: column;
}

.marker {
  margin: 0 0 0 0;
  background-color: var(--inactive-color);

  height: var(--marker-diameter);
  width: var(--marker-diameter);
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
