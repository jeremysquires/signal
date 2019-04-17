<template>
  <div class="userpage">
    <NavBar heading="User Vital Statistics" />
    <div class="userlist">
      <div class="user" v-for="chooseUser in users" :key="chooseUser.login">
        <div class="userlink">
          <!-- TODO: add link to menu/login -->
          <router-link :to="`/menu/${chooseUser.login}`">{{ chooseUser.login }}</router-link>
        </div>
        <div class="vitalstats">
          <div class="characteristic" v-for="(value, key) in chooseUser" :key="key">
            <!-- TODO: add components for value objects like weight, height, etc. -->
            <span class="key">{{ key }}</span><span class="value">{{ value }}</span>
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
.userpage {
  display: flex;
  flex-direction: column;
}
.userlist {
  display: flex;
  flex-wrap: wrap;
  border: #aaa;
}
.user {
  display: flex;
  flex-grow: 1;
  flex-basis: 25%;
}
.userlink {
  margin-left: 10px;
}
.vitalstats {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.characteristic {
  display: flex;
  justify-content: space-between;
}
.key {
  font-weight: bold;
}
a {
  color: #42b983;
}
</style>
