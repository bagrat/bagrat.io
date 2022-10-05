<script setup>
import { ref } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";

const props = defineProps({
  source: Object,
  bookACall: {
    type: Boolean,
    default: false,
  },
});

const story = props.source;

console.log(story);

const activeChapter = ref(0);

function handleScroll({ target: container }) {
  activeChapter.value = Array.from(
    document.querySelectorAll("#container .chapter")
  )
    .map((chapterElement, index) => {
      const chapterRelativePosition =
        Math.floor(chapterElement.offsetTop) - Math.floor(container.scrollTop);
      const isCurrent =
        chapterRelativePosition >= -(chapterElement.offsetHeight / 2) &&
        chapterRelativePosition < container.offsetHeight;

      return { isCurrent, index };
    })
    .filter(({ isCurrent }) => isCurrent)[0]?.index;
}
</script>

<template>
  <div id="container">
    <div id="story-screen" @scroll="handleScroll">
      <div
        class="chapter"
        v-for="(chapter, index) in story"
        :class="{
          active: activeChapter === index,
          inactive: activeChapter !== index,
        }"
        :key="`chapter-${index}`"
      >
        <h3>{{ chapter.title }}</h3>
        <h4 v-if="chapter.subtitle" v-html="chapter.subtitle"></h4>
        <img v-if="chapter.image" :src="chapter.image" />
        <p
          v-for="(paragraph, p_index) in chapter.paragraphs"
          v-html="paragraph"
          :key="`paragraph-${index}-${p_index}`"
        ></p>
        <template v-if="bookACall && index === story.length - 1">
          <div id="appointment">
            <p style="text-align: center">***</p>
            <p>Interested in making this version of the future happen?</p>
            <p><a href="https://savvycal.com/bagrat/v7">Book a call</a></p>
          </div>
        </template>
      </div>
    </div>
    <div class="progress-bar">
      <ProgressBar
        class="progress-bar"
        :width="10"
        :progress="activeChapter"
        :numOfSteps="story.length"
      />
    </div>
  </div>
</template>

<style scoped>
#container {
  --padding-top: 2rem;
  padding-top: var(--padding-top);
}

#story-screen {
  height: 100%;

  overflow: scroll;
  outline: none;

  transition: padding 0.3s ease;
}

.progress-bar {
  position: fixed;
  right: 3rem;
  top: 0;
}

@media screen and (max-width: 800px), (max-height: 720px) {
  .progress-bar {
    display: none;
  }

  #story-screen {
    padding-left: 5%;
    padding-right: 5%;

    padding-bottom: 10rem;
  }
}

@media screen and (min-width: 800px) and (min-height: 720px) {
  body {
    overflow: hidden;
  }

  #container {
    height: calc(100vh - var(--padding-top));
  }

  #story-screen {
    scroll-snap-type: y mandatory;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  #story-screen::-webkit-scrollbar {
    display: none;
  }

  .chapter {
    scroll-snap-align: start;
    scroll-snap-stop: always;

    height: calc(100% - var(--padding-top));
  }

  .chapter.active {
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.7s;
  }

  .chapter.inactive {
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.1s;
  }
}

@media screen and (min-width: 800px) and (min-height: 720px) {
  #story-screen {
    padding-left: 15%;
    padding-right: 15%;
  }
}

@media screen and (min-width: 1200px) {
  #story-screen {
    padding-left: 25%;
    padding-right: 25%;
  }
}

.chapter h3 {
  text-align: center;
}

.chapter h4 {
  text-align: center;
  margin-top: -1.2rem;
  font-size: 0.6rem;
}

.chapter img {
  height: 10rem;
  width: 10rem;

  display: block;
  margin: auto;
  margin-bottom: 2rem;
  margin-top: 0;
}

.chapter {
  --padding-top: 1rem;

  padding-top: var(--padding-top);

  letter-spacing: 0.015rem;
  line-height: 1.4rem;
}

.chapter p {
  padding-top: 0.1rem;
}

#appointment p {
  text-align: center;
}

#appointment {
  margin-top: 3rem;
}

#appointment a {
  display: inline-block;
  text-decoration: none;
  border: 1px solid var(--color-base-3);
  border-radius: 6px;
  background-color: #dedede;
  transition: background-color 0.3s ease;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1.1rem;
  margin-top: 0.3rem;
}

#appointment a:hover {
  background-color: var(--color-base-0);
  transition: background-color 0.3s ease;
}
</style>
