import { mount } from '@vue/test-utils'
import Header from '@/components/header/Header.vue'

describe('Header', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Header)
    expect(wrapper.is()).toBeTruthy()
  })
})
