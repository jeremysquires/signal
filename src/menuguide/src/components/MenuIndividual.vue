<template>
  <div class="menuindividual">
    <div class="menu" v-if="menu">
      <b-table
        caption-top
        bordered
        striped
        :items="menu.servingsPerFoodGroup"
        :fields="menu.servingsPerFoodGroupFields"
      >
        <template slot="table-caption">Servings Per Food Group</template>

        <template slot="statements" slot-scope="foodGroup">
          <ul>
            <li v-for="(statement,index) in foodGroup.value" :key="index">
              {{ statement }}
            </li>
          </ul>
        </template>
      </b-table>

      <b-table
        class="table"
        caption-top
        bordered
        :items="menu.foodSelections"
        :fields="menu.foodSelectionsFields"
        tbody-tr-class="foods-row"
      >
        <template slot="table-caption">Suggested Food Choices for Menu</template>

        <template slot="foods" slot-scope="foodGroup">
          <b-table
            class="foods-table-td-table"
            striped
            :items="foodGroup.value"
            :fields="menu.foodsFields"
          >
          </b-table>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'MenuIndividual',
  data() {
    return {
      menu: {}
    }
  },
  props: {
    login: String,
  },
  async created() {
    const menuData = await this.loadMenuData(this.apiBaseUrl, this.login);
    this.menu = menuData;
    // fields defs for menu.servingsPerFoodGroup
    this.menu.servingsPerFoodGroupFields = [
      {
        key: 'foodGroup',
        sortable: true,
      },
      {
        key: 'servings',
        sortable: true,
      },
      {
        key: 'statements',
      },
      {
        key: 'maxServings',
        sortable: true,
      },
    ];
    // fields defs for menu.foodSelections
    this.menu.foodSelectionsFields = [
      {
        key: 'foodGroup',
        sortable: true,
      },
      {
        key: 'foods',
      },
    ];
    // fields defs for menu.foodSelections.foods
    this.menu.foodsFields = [
      {
        key: 'food',
        sortable: true,
      },
      {
        key: 'servingSize',
        sortable: true,
      },
      {
        key: 'foodCategory',
        sortable: true,
      },
    ];
  },
  computed: {
    ...mapState([
      'apiBaseUrl',
    ]),
  },
  methods: {
    loadMenuData: async (baseurl, login) => {
      let response;
      try {
        if (login) {
          response = await axios.get(`${baseurl}/menu/${login}`);
        } else {
          response = await axios.get(`${baseurl}/menu`);
        }
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        console.error(`Failed to get menu from ${baseurl}/menu/${login}`); // eslint-disable-line no-console
        console.error(`Perhaps the API needs to be started with 'npm start serve'`); // eslint-disable-line no-console
        return;
      }
      return response.data;
    }
  }
}
</script>

<style>
.menu {
  display: flex;
  flex-direction: column;
}
.table {
  align-self: center;
}
.foods-row > td {
  padding: 0;
}
.foods-table-td-table {
  border: 0;
  margin: 0;
}
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
