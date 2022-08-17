<script setup>
import { ref } from 'vue'
import story from '../story.js'

console.log(story)

const activeChapter = ref(0)

function handleScroll({ target: container }) {
  console.log("--- SCROLL ---")
  console.log(container.scrollTop)

  activeChapter.value = Array.from(document.querySelectorAll("#container .chapter")).map((chapterElement, index) => {
    const elementScrolledPosition = chapterElement.offsetTop - container.scrollTop
    const isCurrent = elementScrolledPosition >= 0 && elementScrolledPosition < container.offsetHeight

    return {isCurrent, index}
  }).filter(({isCurrent}) => isCurrent)[0]?.index
  
  console.log(activeChapter)
}

</script>

<template>
  <div id="container" @scroll="handleScroll">
    <div class="chapter" v-for="chapter, index in story" :class="{'visible': activeChapter === index, 'invisible': activeChapter !== index}">
      <h3>{{ chapter.title }}</h3>
      <img v-if="chapter.image" :src="chapter.image">
      <p v-for="paragraph in chapter.paragraphs">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<style scoped>
#container {
  height: 77vh;

  padding-left: 25%;
  padding-right: 25%;
  
  margin-top: 5%;

  font-size: 0.8em;

  overflow: scroll;
  scroll-snap-type: y mandatory;

  -ms-overflow-style: none;
  scrollbar-width: none;

  /* DEBUG */
  /* border: dashed 1px black; */
}

#container::-webkit-scrollbar {
  display: none;
}

.chapter h3 {
  text-align: center;
}

.chapter img {
  height: 10em;
  width: 10em;

  display: block;
  margin: auto;  
  margin-bottom: 3em;
  margin-top: 0em;
}

.chapter {
  --padding-top: 1em;

  padding-top: var(--padding-top);
  /* padding-bottom: 50%; */

  /* min-height: 100%; */
  height: calc(100% - var(--padding-top));
  /* height: 100%; */

  scroll-snap-align: start;
  scroll-snap-stop: always;

  /* DEBUG */
  /* border: dashed 1px black; */
}

.chapter.visible {
  opacity: 1;
  transition-property: opacity;
  transition-duration: 0.7s;
}

.chapter.invisible {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.1s;
}
</style>
