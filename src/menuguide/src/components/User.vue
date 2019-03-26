<template>
  <div class="user">
    <NavBar heading="User Profile Page" />
    <div v-if="user">
      <ul>
        <li v-for="(value, key) in user" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="chooseUser in users" :key="chooseUser.login">
          <div>
            <!-- TODO: add link to menu/login -->
            <router-link :to="`/menu/${chooseUser.login}`">{{ chooseUser.login }}</router-link>
          </div>
          <ul>
            <li v-for="(value, key) in chooseUser" :key="key">
              <!-- TODO: add components for value objects like weight, height, etc. -->
              {{ key }}: {{ value }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'User',
  methods: {
    ...mapMutations([
      'setLogin',
      'setUser',
    ]),
    ...mapActions([
      'setUsers',
    ]),
  },
  computed: {
    ...mapState([
      'login',
      'users',
      'user',
    ])
  },
  async created() {
    await this.setUsers();
  },
  components: {
    NavBar,
  },
}
</script>

<!-- TODO: add styling to make this more attractive -->
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
