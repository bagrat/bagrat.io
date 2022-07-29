<script setup>
import { computed, defineProps } from 'vue'
import EventMarkers from './EventMarkers.vue'

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

const [markersPaddingLeft, markersPaddingRight] = markersPadding

const axisHeight = height / 3;
const axisMarginTop = axisHeight;
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
    >
      <EventMarkers
        :events="events"
        :activeIndex="activeIndex"
        :height="height"
        :paddingLeft="markersPaddingLeft"
        :paddingRight="markersPaddingRight"
        :style="{
          'transform': `translateY(-${axisHeight}px)`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
#timeline-container {
  width: 80%;
  margin-left: 10%;

  /* transform: scale(5); */

  /* DEBUG */
  /* border: dashed 1px black; */
}

#timeline-axis {
  background-color: black;
  width: 100%;

  z-index: -10;
}
</style>
