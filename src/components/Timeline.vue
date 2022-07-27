<script setup>
import { ref, defineProps } from 'vue'
import DiscreteScrollArea from './DiscreteScrollArea.vue'
import EventMarkers from './EventMarkers.vue'

const { events, height, markersPadding } = defineProps({
  events: Array,
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

const [markersPaddingLeft, markersPaddingRight] = markersPadding


const axisHeight = height / 3;
const axisMarginTop = axisHeight;

const counter = ref(0)

function handleScroll(direction) {
  if (direction === 'forwards') {
    counter.value++
  } else {
    counter.value--
  }
}

</script>

<template>
  <div id="timeline-container">
    <div
      id="timeline-axis"
      :style="{
        'margin-top': `${axisMarginTop}px`,
        'height': `${axisHeight}px`,
      }"
    >
      <EventMarkers
        :events="events"
        :height="height"
        :paddingLeft="markersPaddingLeft"
        :paddingRight="markersPaddingRight"
        :style="{
          'transform': `translateY(-${axisHeight}px)`,
        }"
      />
    </div>
    <DiscreteScrollArea @discreteScroll="handleScroll"/>
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
</style>
