import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

describe('Teeheehee', () => {
  test('Is a vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})
