<template>
  <div class="menu">
    <NavBar heading="Menu Page" />
    <div>
      <div v-if="user">
        <h4>Menu for {{ user.firstName }} {{ user.lastName }}</h4>
        <MenuIndividual :login="user.login"/>
      </div>
      <div v-if="hasFamily">
        <h4>Menu Listing (Family)</h4>
        <!-- show list of menus -->
        <div v-for="member of user.family" :key="member">
          <h5>Menu for {{ member }}</h5>
          <!-- show each menu -->
          <MenuIndividual :login="member"/>
        </div>
      </div>
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
