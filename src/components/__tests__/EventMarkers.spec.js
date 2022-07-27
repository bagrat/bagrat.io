import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import EventMarkers from '../EventMarkers.vue'

describe('Prelude calculation', () => {
  const events = [
    {year: 2000, month: 0},
    {year: 2001, month: 1},
    {year: 2003, month: 3},
    {year: 2006, month: 8}
  ]
  const wrapper = shallowMount(EventMarkers, {
    propsData: {
      events: events,
    }
  })

  describe('getMarkersWithPrelude', () => {
    it('should add the prelude as the delta with the previous event marker in each event marker', () => {

      const wrapper = shallowMount(EventMarkers, {
        propsData: {
          events: events,
        }
      })
      const getMarkersWithPrelude = wrapper.vm.getMarkersWithPrelude

      const markers = getMarkersWithPrelude(events, {
        propsData: {
          events: events,
        }
      })

      expect(markers).toEqual([
        {year: 2000, month:0, prelude: 0},
        {year: 2001, month:1, prelude: 13},
        {year: 2003, month:3, prelude: 26},
        {year: 2006, month:8, prelude: 41},
      ])
    })
  })

  describe('calculatePrelude', () => {
    it('should calculate preludes in months', () => {
      const calculatePrelude = wrapper.vm.calculatePrelude

      let prelude = calculatePrelude(
        {year: 2000, month: 0},
        {year: 2001, month: 11},
      )
      expect(prelude).toBe(23)

      prelude = calculatePrelude(
        {year: 2000, month: 0},
        {year: 2000, month: 5},
      )
      expect(prelude).toBe(5)
    })
  })
})
