<script setup>
import { ref } from 'vue'
import story from '../story.js'
import ProgressBar from '../components/ProgressBar.vue'

const activeChapter = ref(0)

function handleScroll({ target: container }) {
  activeChapter.value = Array.from(document.querySelectorAll("#container .chapter")).map((chapterElement, index) => {
    const chapterRelativePosition = Math.floor(chapterElement.offsetTop) - Math.floor(container.scrollTop)
    const isCurrent = chapterRelativePosition >= -(chapterElement.offsetHeight / 2) && chapterRelativePosition < container.offsetHeight

    return {isCurrent, index}
  }).filter(({isCurrent}) => isCurrent)[0]?.index
}

</script>

<template>
    <div id="container">
      <div id="story-screen" @scroll="handleScroll">
        <div class="chapter" v-for="chapter, index in story" :class="{'visible': activeChapter === index, 'invisible': activeChapter !== index}">
          <h3>{{ chapter.title }}</h3>
          <img v-if="chapter.image" :src="chapter.image">
          <p v-for="paragraph in chapter.paragraphs" v-html="paragraph"></p>
          <template v-if="index === story.length - 1">
            <p style="text-align: center">***</p>
            <p>Interested in making this version of the future happen? Yes/No</p>
          </template>
        </div>
      </div>
      <ProgressBar :height="10" :progress="activeChapter" :numOfSteps="story.length"/>
    </div>
</template>

<style scoped>
#container {
  height: 100vh;
  padding-top: 2rem;

  padding-left: 25%;
  padding-right: 25%;
}

#story-screen {
  height: 85%;

  overflow: scroll;
  scroll-snap-type: y mandatory;

  -ms-overflow-style: none;
  scrollbar-width: none;

  margin-bottom: 2em;
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
