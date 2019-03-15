import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('NavBar.vue', () => {
  it('renders heading when passed', () => {
    const heading = 'new heading'
    const wrapper = shallowMount(NavBar, {
      propsData: { heading }
    })
    expect(wrapper.text()).toMatch(heading)
  })
})
