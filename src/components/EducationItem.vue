<script setup>
defineProps({
  year: String,
  degree: String,
  field: String,
  university: String,
});
</script>

<template>
  <div class="education">
    <div>
      <div class="degree" v-html="degree"></div>
      <div class="year" v-html="year"></div>
    </div>
    <span class="university" v-html="university"></span>
  </div>
</template>

<style scoped>
.education {
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-bottom: 4%;
}

@media print {
  .year {
    font-size: 0.6em;

    margin-top: 20%;
  }
}

.year {
  font-size: 0.5em;
  margin-left: 5%;

  margin-top: 1.5%;
}

.degree {
  font-size: 0.7em;
  font-weight: bold;
}

.university {
  font-size: 0.6em;
}

.education > div {
  display: flex;
  justify-items: space-between;
  align-items: bottom;

  width: 100%;
}
</style>
