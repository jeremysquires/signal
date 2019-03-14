<template>
  <div class="menu">
    <NavBar heading="Menu Page" />
    <p>
      Menu Listing (Family and Individual)
      <!-- TODO: div v-if="hasFamily" show list of menus -->
      <!-- TODO: div v-for="member of user.family" show each menu -->
      <!-- TODO: div v-else show single menu, user = member -->
      <MenuIndividual />
    </p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MenuIndividual from '@/components/MenuIndividual.vue';

export default {
  name: 'Menu',
  props: {
    user: Object,
    hasFamily: Boolean,
  },
  data() {
    return {
      msg: String,
    };
  },
  watch: {
    user: {
      handler(user) {
        this.hasFamily = user.family && user.family.length > 0;
      },
      immediate: true,
      deep: true,
    },
  },
  async created() {
    // 
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
