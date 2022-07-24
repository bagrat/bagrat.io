<script setup>
import { ref } from 'vue'
import DiscreteScrollArea from './DiscreteScrollArea.vue'

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
  <span>Counter: {{ counter }}</span>
  <div id="timeline-container">
    <div id="timeline-axis"></div>
    <ul id="events">
      <li v-for="_ in 10">
        <div></div>
      </li>
    </ul>
    <DiscreteScrollArea @discreteScroll="handleScroll"/>
  </div>
</template>

<style scoped>
#timeline-container {
  /* position: relative; */

  max-height: 90vh;

  /* DEBUG */
  border: dashed 1px black;
}

#timeline-axis {
  background-color: black;

  margin-top: 2px;
  min-height: 2px;
  height: 2px;

  width: 1000px;
  min-width: 1000px;

  position: absolute;
  z-index: -10;
}

ul#events {
  position: absolute;
  display: flex;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  z-index: 0;

  /* DEBUG */
  /* border: dashed 1px black; */
}

ul#events > li {
  list-style-type: none;

  /* DEBUG */
  padding-left: 30px;
  /* border: dashed 1px black; */
}

ul#events > li > div {
  /* min-width: 6px; */
  /* width: 6px; */

  /* min-height: 6px; */
  /* height: 6px; */

  /* border-radius: 3px; */

  min-width: 2px;
  width: 2px;
  min-height: 6px;
  height: 6px;

  background-color: black;

  /* margin-left: 10px; */
  /* margin-right: 10px; */
}
</style>
