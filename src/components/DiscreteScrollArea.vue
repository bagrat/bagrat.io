<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['discreteScroll'])

let state = 'not-scrolling';

const baseScrollPosition = 50000
const detectableScrollLength = 100

const scrollArea = ref(null)

const scrollStopCheckTimeout = 200
let stopDetectorTimer = null

const scrollTimeout = 400
let timeoutTimer = null

onMounted(() => {
  resetScrollPosition()
})

function getScrollVector(scrollPosition) {
  const delta = scrollPosition - baseScrollPosition
  const length = Math.abs(delta)
  if (delta > 0) {
    return {
      direction: 'forwards',
      length,
    }
  }
  else {
    return {
      direction: 'backwards',
      length,
    }
  }
}

function handleScroll(e) {
  // console.log("Scroll", e.target.scrollTop, state)

  if (state === 'returning-to-base') {
    state = 'not-scrolling'
    return
  }

  if (state !== 'timed-out') {
    state = 'scrolling'

    if (timeoutTimer == null) {
      timeoutTimer = setTimeout(() => handleTimeout(getScrollVector(e.target.scrollTop)), scrollTimeout)
    }
  }

  if (stopDetectorTimer != null) {
    clearTimeout(stopDetectorTimer);
  }
  stopDetectorTimer = setTimeout(() => handleScrollStopped(getScrollVector(e.target.scrollTop)), scrollStopCheckTimeout)
}

function handleTimeout({ direction }) {
  // console.log("Timed out", state)
  if (state === 'scrolling') {
    state = 'timed-out';

    emitDiscreteScroll(direction)
  }

  clearTimeout(timeoutTimer)
  timeoutTimer = null;
}

function handleScrollStopped({ direction, length }) {
  // console.log('Scroll stopped', state);

  const alreadyTimedOut = state === 'timed-out'

  if (!alreadyTimedOut) {
    if (length >= detectableScrollLength) {
      emitDiscreteScroll(direction)
    }
  }

  resetScrollPosition();
}

function resetScrollPosition() {
  // console.log('Returning to base', state)
  state = 'returning-to-base'
  scrollArea.value.scrollTop = baseScrollPosition
}

function emitDiscreteScroll(direction) {
  // console.log('emitting', direction, state)
  emit('discreteScroll', direction)
}
</script>

<template>
  <div id="scroll-area" ref="scrollArea" @scroll="handleScroll">
    <div></div>
  </div>
</template>

<style>
#scroll-area {
  height: 90vh;
  width: 100vh;
  overflow: scroll;

  z-index: 0;

  -ms-overflow-style: none;
  scrollbar-width: none;

  /* DEBUG */
  /* border: dashed 1px black; */
}

#scroll-area::-webkit-scrollbar {
  display:none;
}

#scroll-area > div {
  height: 100000px;
}
</style>
