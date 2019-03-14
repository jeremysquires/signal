<template>
  <div class="user">
    <NavBar heading="User Profile Page" />
    <p>
      User Information
    </p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'User',
  data() {
    return {
      users: [
        {
          family: null,
          firstName: 'Adam',
          lastName: 'Ministrator',
          middleName: '',
          age: 19,
          weight: {
            value: 185,
            units: 'lbs',
            dataSource: 'scale/wiifit',
          },
          height: {
            value: (5 + 10/12),
            units: 'ft',
            dataSource: 'tape/manual',
          },
          fat: {
            value: 20,
            units: 'percent',
            dataSource: 'calipers/manual',
          },
        },
      ],
    };
  },
  components: {
    NavBar,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
