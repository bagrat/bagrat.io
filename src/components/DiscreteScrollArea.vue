<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['discreteScroll'])

let state = 'not-scrolling';

const scrollStopCheckTimeout = 200
let stopDetectorTimer = null

const scrollTimeout = 400
let timeoutTimer = null

function getScrollVector(e) {
  const length = Math.abs(e.deltaY)
  if (e.deltaY > 0) {
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

function handleWheel(e) {
  console.log("Scroll", e, state)

  const { direction, length } = getScrollVector(e)

  if (state !== 'timed-out') {
    state = 'scrolling'

    if (timeoutTimer == null) {
      timeoutTimer = setTimeout(() => handleTimeout(direction), scrollTimeout)
    }
  }

  if (stopDetectorTimer != null) {
    clearTimeout(stopDetectorTimer);
  }
  stopDetectorTimer = setTimeout(() => handleScrollStopped(direction), scrollStopCheckTimeout)
}

function handleTimeout(direction) {
  console.log("Timed out", state)
  if (state === 'scrolling') {
    state = 'timed-out';

    emitDiscreteScroll(direction)
  }

  clearTimeout(timeoutTimer)
  timeoutTimer = null;
}

function handleScrollStopped(direction) {
  console.log('Scroll stopped', state);

  const alreadyTimedOut = state === 'timed-out'

  resetState()

  if (!alreadyTimedOut) {
    emitDiscreteScroll(direction)
  }
}

function resetState() {
  console.log('resetting state', state)
  state = 'not-scrolling'
}

function emitDiscreteScroll(direction) {
  console.log('emitting', direction, state)
  emit('discreteScroll', direction)
}

function handleTouchStart(e) {
  console.log('touch start', e)
}
</script>

<template>
  <div id="scroll-area" @wheel.prevent="handleWheel" @touchstart.prevent="handleTouchStart">
    <slot/>
  </div>
</template>

<style>
#scroll-area {
  height: 100%;
  width: 100%;

  /* DEBUG */
  /* border: dashed 1px black; */
}
</style>
