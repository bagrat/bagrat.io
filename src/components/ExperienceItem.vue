<script setup>
const { company, range, location } = defineProps({
  company: String,
  range: String,
  location: String,
})
</script>

<template>
  <div class="experience">
    <div class="header">
      <h3 v-html="company"></h3>
      <span class="range" v-html="range"></span>
    </div>
    <div class="location" v-html="location"></div>
    <div class="description">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.experience {
  display: flex;
  flex-direction: column;

  margin-bottom: 3%;
}

.experience .header {
  display: flex;
  justify-content: left;
  align-items: bottom;
}

.experience h3 {
  margin: 0 0 0 0;

  font-weight: 900;
  font-size: 0.8em;
}

@media print {
  .experience h3 {
    font-weight: 500;
  }
}

.range {
  padding-top: 0.75%;
  margin-left: 3%;

  font-size: 0.6em;
}

.location {
  font-size: 0.5em;

  color: var(--color-base-2);
}

.description {
  padding-top: 1%;

  font-size: 0.6em;
}
</style>
