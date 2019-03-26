<template>
  <div class="menu">
    <NavBar heading="Menu Page" />
    <div>
      Menu Listing (Family and Individual)
      <!-- TODO: div v-if="hasFamily" show list of menus -->
      <!-- TODO: div v-for="member of user.family" show each menu -->
      <!-- TODO: div v-else show single menu, user = member -->
      <MenuIndividual />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MenuIndividual from '@/components/MenuIndividual.vue';
import { mapState } from 'vuex';

export default {
  name: 'Menu',
  props: {
    login: String,
  },
  computed: {
    ...mapState([
      'users',
      'user',
    ]),
    hasFamily() {
      return this.user.family && this.user.family.length > 0;
    },
  },
  components: {
    NavBar,
    MenuIndividual,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
