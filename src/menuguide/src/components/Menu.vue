<template>
  <div class="menu">
    <NavBar heading="Menus" />
    <div>
      <div v-if="user">
        <h4>Menu for {{ user.firstName }} {{ user.lastName }}
          <span v-if="user.middleNameOrInitial">, {{ user.middleNameOrInitial }}</span></h4>
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
import { mapMutations, mapState } from 'vuex';
import { find } from 'lodash';
import store from '@/store'

export default {
  name: 'Menu',
  computed: {
    ...mapState([
      'users',
      'user',
    ]),
    ...mapMutations([
      'setUser',
    ]),
    hasFamily() {
      return this.user.family && this.user.family.length > 0;
    },
  },
  components: {
    NavBar,
    MenuIndividual,
  },
  beforeRouteUpdate(to, from, next) {
    // NOTE: mapMutations are not available at this stage
    if (!store.state.user || (!to.params.login === !store.state.user.login)) {
      // get user from users, if it exists, or route to users
      const newUser = find(store.state.users, { 'login': to.params.login });
      if (!newUser) {
        next('/users');
      } else {
        store.commit('setUser', newUser);
      }
    }
    next();
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
h4, h5 {
  margin-top: 20px;
}
</style>
