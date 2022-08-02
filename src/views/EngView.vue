<script setup>
import { ref, onMounted } from 'vue'
import Timeline from '@/components/Timeline.vue'
import DiscreteScrollArea from '@/components//DiscreteScrollArea.vue'

const events = [
  {
    year: 1991,
    month: 0,
  },
  {
    year: 1997,
    month: 8,
  },
  {
    year: 2000,
    month: 8,
  },
  {
    year: 2004,
    month: 8,
  },
  {
    year: 2005,
    month: 5,
  },
  {
    year: 2008,
    month: 8,
  },
  {
    year: 2010,
    month: 2,
  },
  {
    year: 2012,
    month: 5,
  },
  {
    year: 2013,
    month: 4,
  },
  {
    year: 2014,
    month: 9,
  },
  {
    year: 2015,
    month: 9,
  },
  {
    year: 2020,
    month: 8,
  },
  {
    year: 2021,
    month: 8,
  },
  {
    year: 2022,
    month: 5,
  },
]

const activeEventIndex = ref(-1)
function handleScroll(direction) {
  if (direction === 'forwards') {
    if (activeEventIndex.value < events.length - 1) {
      activeEventIndex.value++
    }
  } else {
    if (activeEventIndex.value >= 0) {
      activeEventIndex.value--
    }
  }
}

onMounted(() => {
  activeEventIndex.value = 5
})
</script>

<template>
  <!-- <h1>Bagrat Aznauryan</h1> -->
  <h1>Test</h1>
  <DiscreteScrollArea @discreteScroll="handleScroll" :style="{'padding-bottom': '200px'}">
    <Timeline :events="events" :activeIndex="activeEventIndex" :height="15" :markersPadding="[40, 40]"></Timeline>
  </DiscreteScrollArea>
</template>

<style>
h1 {
  margin: 0 0 0 0;
}
</style>
