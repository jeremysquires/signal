import { shallowMount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
Vue.use(BootstrapVue);

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
