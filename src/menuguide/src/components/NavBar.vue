<template>
  <b-navbar toggleable="lg" type="light" variant="light" sticky>
    <b-navbar-brand class="navbar">
      <div class="logo">
        <img alt="MenuGuide logo" src="@/assets/logo.png">
        <!-- TODO: get appname from branding state -->
        <div class="appname">MenuGuide</div>
      </div>
    </b-navbar-brand>
    <b-nav-text>
      <div class="title">{{ heading }}</div>
    </b-nav-text>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/users">Users</b-nav-item>
      <b-nav-item-dropdown text="Menus">
        <b-dropdown-item
          v-for="chooseUser in users"
          :key="chooseUser.login"
        >
          <b-nav-item :to="`/menu/${chooseUser.login}`">
            {{ chooseUser.login }}
          </b-nav-item>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>      
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'NavBar',
  props: {
    heading: String
  },
  computed: {
    ...mapState([
      'login',
      'users',
      'user',
    ]),
  },
}
</script>

<!-- TODO: logo + app name left : hamburger right -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Palanquin+Dark");
a {
  color: #42b983;
}
.navbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;

  .appname {
    font-family: 'Palanquin Dark', sans-serif;
    font-size: 18px;
    align-self:flex-start;
  }
  .logo {
    align-self: flex-start;
    display: flex;
    flex-direction: column;

    > img {
      height: 70%;
      width: 50%;
      margin-left: 10px;
    }
  }
}
.title {
  font-family: 'Palanquin Dark', sans-serif;
  font-size: 28px;
  align-self:center;
}
</style>
