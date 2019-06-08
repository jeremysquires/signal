<template>
  <div class="userpage">
    <NavBar heading="User Vital Statistics" />

    <div class="userlist">
      <div class="user" v-for="chooseUser in users" :key="chooseUser.login">
        <div class="userlink">
          <router-link :to="`/menu/${chooseUser.login}`">{{ chooseUser.login }}</router-link>
        </div>
        <div class="vitalstats">
          <div class="characteristic" v-for="(value, key) in chooseUser" :key="key">
            <span class="key">{{ characteristicKey(key) }}:</span>
            <span class="value">{{ characteristicValue(value, key) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'User',
  methods: {
    ...mapActions([
      'setUsers',
    ]),
    // TODO: move these transformations to a characteristic component
    characteristicKey(key) {
      return key
        .replace(/[A-Z]/g, function(letter) {
          return ` ${letter}`;
        })
        .replace(/^[a-z]/, function(letter) {
          return `${letter.toUpperCase()}`;
        });
    },
    characteristicValue(value, key) {
      // TODO: move this to utils 
      const genderMap = {
        f: 'Female',
        m: 'Male',
        n: 'Non-Binary'
      }
      if (value.value) {
        return `${value.value} ${value.units} (${value.dataSource})`;
      } else if (key === 'gender') {
        return genderMap[value];
      } else {
        return value;
      }
    },
  },
  computed: {
    ...mapState([
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

<style scoped lang="scss">
a {
  color: #42b983;
}
.userpage {
  display: flex;
  flex-direction: column;

  .userlist {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;

    .user {
      display: flex;
      flex-direction: column;
      flex-grow: 0;
      flex-basis: 20%;
      border: 1px solid #aaa;
      margin: 5px;

      .userlink {
        margin-left: 10px;
      }

      .vitalstats {
        display: flex;
        flex-direction: column;
        margin: 20px;

        .characteristic {
          display: flex;
          justify-content: space-between;

          .key {
            font-weight: bold;
            text-align: left;
          }

          .value {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
