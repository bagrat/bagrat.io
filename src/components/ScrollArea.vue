<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['discreteScroll'])

let state = 'not-scrolling';

const baseScrollPosition = 2500
const requiredScrollDelta = 100

const scrollImitator = ref(null)

let returningToInitialScroll = false
let stopDetectorTimer = null
let timeoutTimer = null

onMounted(() => {
  scrollImitator.value.scrollTop = baseScrollPosition
})

function handleScroll(e) {
  // e.preventDefault()
  // e.stopPropagation()
  // e.stopImmediatePropagation()

  console.log("Scroll", e.target.scrollTop)

  state = 'scrolling'

  if (timeoutTimer == null) {
    timeoutTimer = setTimeout(() => handleTimeout(baseScrollPosition + requiredScrollDelta), 700)
  }

  if (stopDetectorTimer != null) {
    clearTimeout(stopDetectorTimer);
  }
  stopDetectorTimer = setTimeout(() => handleScrollStopped(e.target.scrollTop), 150)
}

function handleTimeout(scrollPosition) {
  console.log("Timed out")
  if (state == 'scrolling') {
    scrollImitator.value.classList.remove('scrollable')
    scrollImitator.value.classList.add('unscrollable')
    state = 'timed-out';
  }

  clearTimeout(timeoutTimer)
  timeoutTimer = null;
}

function handleScrollStopped(scrollPosition) {
  console.log('Scroll stopped');

  state = 'not-scrolling';

  const scrollDelta = Math.abs(scrollPosition - baseScrollPosition)

  if (scrollPosition === baseScrollPosition && returningToInitialScroll) {
    returningToInitialScroll = false;

    return
  } else if (scrollDelta >= requiredScrollDelta) {
    if (scrollPosition - baseScrollPosition > 0) {
      emit('discreteScroll', 'forwards')
    } else {
      emit('discreteScroll',  'backwards')
    }
  }

  returningToInitialScroll = true
  scrollImitator.value.scrollTop = baseScrollPosition
  console.log("supposed to scroll to middle")
}
</script>

<template>
  <div id="scroll-imitator" ref='scrollImitator' @scroll="handleScroll" class="scrollable">
    <div></div>
  </div>
</template>

<style>
.unscrollable {
  overflow-y: hidden;
}

.scrollable {
  overflow-y: scroll;
}

#scroll-imitator {
  height: 90vh;
}

#scroll-imitator > div {
  height: 100000px;
}
</style>
