<template>
  <div class="navbar">
    <div class="logo">
      <img alt="MenuGuide logo" src="@/assets/logo.png">
    </div>
    <!-- TODO: get appname from branding state -->
    <div class="appname">MenuGuide</div>
    <div class="title">{{ heading }}</div>
    <div class="menu"><!-- TODO: hamburger menu --></div>
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
.appname {
  font-family: 'Palanquin Dark', sans-serif;
  font-size: 16px;
  float: left;
  margin-left: 10px;
}
.logo > img {
  height: 5%;
  width: 2%;
  float: left;
  margin-left: 10px;
}
.title {
  font-family: 'Palanquin Dark', sans-serif;
  font-size: 20px;
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
