<script setup>
import { ref } from 'vue'
import story from '../story.js'
import Timeline from '../components/Timeline.vue'

const activeChapter = ref(0)

function handleScroll({ target: container }) {
  // console.log("--- SCROLL ---")
  // console.log(container.scrollTop)

  activeChapter.value = Array.from(document.querySelectorAll("#container .chapter")).map((chapterElement, index) => {
    const elementScrolledPosition = Math.floor(chapterElement.offsetTop) - Math.floor(container.scrollTop)
    const isCurrent = elementScrolledPosition >= 0 && elementScrolledPosition < container.offsetHeight

    return {isCurrent, index}
  }).filter(({isCurrent}) => isCurrent)[0]?.index
  
  console.log(activeChapter)
}

</script>

<template>
  <transition>
    <div id="container">
      <div id="story-screen" @scroll="handleScroll">
        <div class="chapter" v-for="chapter, index in story" :class="{'visible': activeChapter === index, 'invisible': activeChapter !== index}">
          <h3>{{ chapter.title }}</h3>
          <img v-if="chapter.image" :src="chapter.image">
          <p v-for="paragraph in chapter.paragraphs">
            {{ paragraph }}
          </p>
        </div>
      </div>
      <Timeline :height="10" :activeIndex="activeChapter" :numOfMarkers="story.length"/>
    </div>
  </transition>
</template>

<style scoped>
#container {
  height: 100vh;
  padding-top: 2rem;

  padding-left: 25%;
  padding-right: 25%;
}

#container.v-enter-from {
  opacity: 0;
}
#container.v-enter-active {
  transition: opacity 0.5s ease;
}

#story-screen {
  height: 85%;

  overflow: scroll;
  scroll-snap-type: y mandatory;

  -ms-overflow-style: none;
  scrollbar-width: none;

  margin-bottom: 2em;

  /* DEBUG */
  /* border: dashed 1px black; */
}

#story-screen::-webkit-scrollbar {
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
  margin-bottom: 2.5em;
  margin-top: 0em;
}

.chapter {
  --padding-top: 1em;

  padding-top: var(--padding-top);

  height: calc(100% - var(--padding-top));

  scroll-snap-align: start;
  scroll-snap-stop: always;

  letter-spacing: 0.015em;
  line-height: 1.3em;

  /* DEBUG */
  /* border: dashed 1px black; */
}

.chapter p {
  padding-top: 0.3em;
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
