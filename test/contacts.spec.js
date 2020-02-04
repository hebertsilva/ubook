import { mount } from '@vue/test-utils'
import FormContact from '@/components/home/FormContact.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(FormContact)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
