<template>
  <div class="navbar">
    <div class="logo">
      <img alt="MenuGuide logo" src="@/assets/logo.png">
      <!-- TODO: get appname from branding state -->
      <div class="appname">MenuGuide</div>
    </div>
    <div class="title">{{ heading }}</div>
    <div class="menu"><!-- hamburger menu --></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    heading: String
  }
}
</script>

<!-- TODO: logo + app name left : hamburger right -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Palanquin+Dark");
.navbar {
  display: flex;
  justify-content: space-between;
}
.appname {
  font-family: 'Palanquin Dark', sans-serif;
  font-size: 18px;
}
.logo {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}
.logo > img {
  height: 70%;
  width: 50%;
  margin-left: 10px;
}
.appname {
  align-self:flex-start;
}
.title {
  font-family: 'Palanquin Dark', sans-serif;
  font-size: 20px;
  align-self:center;
}
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
