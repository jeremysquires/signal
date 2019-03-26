<template>
  <div class="menuindividual">
    <div v-if="menu">
      <!-- TODO: format output data in a more pleasing way -->
      <h6>Servings Per Food Group</h6>
      <ul>
        <li v-for="(value, key) in menu.servingsPerFoodGroup" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'MenuIndividual',
  data() {
    return {
      menu: {}
    }
  },
  props: {
    login: String,
  },
  async created() {
    const menuData = await this.loadMenuData(this.apiBaseUrl, this.login);
    this.menu = menuData;
  },
  computed: {
    ...mapState([
      'apiBaseUrl',
    ]),
  },
  methods: {
    loadMenuData: async (baseurl, login) => {
      let response;
      try {
        if (login) {
          response = await axios.get(`${baseurl}/menu/${login}`);
        } else {
          response = await axios.get(`${baseurl}/menu`);
        }
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        console.error(`Failed to get menu from ${baseurl}/menu/${login}`); // eslint-disable-line no-console
        console.error(`Perhaps the API needs to be started with 'npm start serve'`); // eslint-disable-line no-console
        return;
      }
      return response.data;
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-left: 30px;
}
li {
  display: block;
  margin: 0 40px;
  text-align: start;
}
a {
  color: #42b983;
}
</style>
