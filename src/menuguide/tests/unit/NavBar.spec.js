import { shallowMount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';
import BootstrapVueNext from 'bootstrap-vue-next';
import Vue from 'vue';
Vue.use(BootstrapVueNext);

describe('NavBar.vue', () => {
  it('renders heading when passed', () => {
    const heading = 'new heading';
    const wrapper = shallowMount(NavBar, {
      propsData: { heading },
      mocks: { $store: { state: { users: [], user: undefined } } }
    });
    expect(wrapper.text()).toMatch(heading);
  });
});
