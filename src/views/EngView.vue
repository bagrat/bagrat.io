<script setup>
import Timeline from '@/components/Timeline.vue'

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
</script>

<template>
  <h1>Bagrat Aznauryan</h1>
  <Timeline :events="events" :height="12"></Timeline>
</template>

<style>
h1 {
  margin: 0 0 0 0;
}
</style>
