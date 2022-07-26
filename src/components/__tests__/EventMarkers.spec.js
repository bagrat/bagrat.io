import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import EventMarkers from '../EventMarkers.vue'

describe('Deltas calculation', () => {
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

  describe('getEventsWithDeltas', () => {
    it('should add the delta with the previous event marker in each event marker', () => {

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
        {year: 2000, month:0, delta: 0},
        {year: 2001, month:1, delta: 13},
        {year: 2003, month:3, delta: 26},
        {year: 2006, month:8, delta: 41},
      ])
    })
  })

  describe('getPreciseDela', () => {
    it('should calculate deltas in months', () => {
      const getPreciseDelta = wrapper.vm.getPreciseDelta

      let delta = getPreciseDelta(
        {year: 2000, month: 0},
        {year: 2001, month: 11},
      )
      expect(delta).toBe(23)

      delta = getPreciseDelta(
        {year: 2000, month: 0},
        {year: 2000, month: 5},
      )
      expect(delta).toBe(5)
    })
  })
})
