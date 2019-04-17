<template>
  <div class="userpage">
    <NavBar heading="User Menu Choices" />
    <div class="user" v-if="user">
      <div class="vitalstats">
        <div class="characteristic" v-for="(value, key) in user" :key="key">
          {{ key }}: {{ value }}
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <div class="user" v-for="chooseUser in users" :key="chooseUser.login">
          <div class="userlink">
            <!-- TODO: add link to menu/login -->
            <router-link :to="`/menu/${chooseUser.login}`">{{ chooseUser.login }}</router-link>
          </div>
          <div class="vitalstats">
            <div class="characteristic" v-for="(value, key) in chooseUser" :key="key">
              <!-- TODO: add components for value objects like weight, height, etc. -->
              {{ key }}: {{ value }}
            </div>
          </div>
        </div>
      </div>
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
    ]),
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
.user {
  padding-top: 5;
  padding: 0;
  display: block;
  margin-left: 0px;
  margin-top: 10px;
}
.userlink {
  list-style-type: none;
  padding: 0;
  display: block;
  margin-left: 0px;
  float: left;
}
.vitalstats {
  list-style-type: none;
  padding: 0;
  margin-left: 30px;
}
.characteristic {
  display: block;
  margin: 0 40px;
  text-align: start;
}
a {
  color: #42b983;
}
</style>
