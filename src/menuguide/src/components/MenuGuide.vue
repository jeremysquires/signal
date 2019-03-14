<template>
  <div class="landing">
    <img alt="MenuGuide logo" src="@/assets/logo.png">
    <h1 class="splash">Welcome to Your Menu Guide</h1>
    <p>
      The
      <a href="https://food-guide.canada.ca/en/" target="_blank" rel="noopener">Canada Food Guide</a>
      provides essential nutritional and health information.
    </p>
    <p>
      From this app you can generate
      <router-link to="/menu">healthy menus</router-link>
      for 
      <router-link to="/user">families and individuals</router-link>.
    </p>
    <p>
      For other
      <a href="https://www.canada.ca/en/health-canada/services/canada-food-guide/tips-healthy-eating/meal-planning-cooking-healthy-choices/recipes.html" target="_blank" rel="noopener">recipes</a>
      check out
      <ul>
        <li><a href="https://www.canada.ca/en/health-canada/services/canada-food-guide/tips-healthy-eating/meal-planning-cooking-healthy-choices/recipes.html#Breakfast" target="_blank" rel="noopener">Breakfast</a></li>
        <li><a href="https://www.canada.ca/en/health-canada/services/canada-food-guide/tips-healthy-eating/meal-planning-cooking-healthy-choices/recipes.html#Breakfast" target="_blank" rel="noopener">Lunch/Dinner</a></li>
        <li><a href="https://www.canada.ca/en/health-canada/services/canada-food-guide/tips-healthy-eating/meal-planning-cooking-healthy-choices/recipes.html#Breakfast" target="_blank" rel="noopener">Snacks</a></li>
      </ul>
    </p>
  </div>
</template>

<script>
export default {
  name: 'MenuGuide',
  props: {
    msg: String
  }
}
</script>

<!-- TODO: switch to lang="scss" and move shared styles to assets/styles -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Palanquin+Dark");
.splash {
  font-family: 'Palanquin Dark', sans-serif;
  font-size: 48px;
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
