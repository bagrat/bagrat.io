import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import EventMarkers from '../EventMarkers.vue'

it('should add the delta with the previous event marker in each event marker', () => {
  const events = [
    {year: 2000},
    {year: 2001},
    {year: 2003},
    {year: 2006}
  ]

  const wrapper = shallowMount(EventMarkers, {
    propsData: {
      events: events,
    }
  })
  const getEventsWithDeltas = wrapper.vm.getEventsWithDeltas

  const withDeltas = getEventsWithDeltas(events, {
    propsData: {
      events: events,
    }
  })

  expect(withDeltas).toEqual([
    {year: 2000, delta: 0},
    {year: 2001, delta: 1},
    {year: 2003, delta: 2},
    {year: 2006, delta: 3},
  ])
})
