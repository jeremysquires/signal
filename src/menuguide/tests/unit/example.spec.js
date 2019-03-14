import { shallowMount } from '@vue/test-utils'
import MenuGuide from '@/components/MenuGuide.vue'

describe('MenuGuide.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MenuGuide, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
