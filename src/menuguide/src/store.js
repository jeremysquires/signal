import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// TODO: share this with api using lib
const loadUserData = async (baseurl, login) => {
  let response;
  try {
    if (login) {
      response = await axios.get(`${baseurl}/users/${login}`);
    } else {
      response = await axios.get(`${baseurl}/users`);
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    console.error(`Failed to get users from ${baseurl}/users`); // eslint-disable-line no-console
    console.error(`Perhaps the API needs to be started with 'npm start serve'`); // eslint-disable-line no-console
    return;
  }
  return response.data;
};

export default new Vuex.Store({
  state: {
    user: undefined,
    users: [
      {
        'login': 'Admin',
        'firstName': 'Adam',
        'lastName': 'Ministrator',
        'middleNameOrInitial': '',
        'age': 19,
        'weight': {
          'value': '185',
          'units': 'lbs',
          'dataSource': 'scale/wiifit'
        },
        'height': {
          'value': '5.83',
          'units': 'ft',
          'dataSource': 'tape/manual'
        },
        'gender': 'm',
        'bloodPressure': {
          'value': '120/70/65',
          'units': 'mmHg/mmHg/bpm',
          'dataSource': 'bp cuff'
        },
        'bodyFat': {
          'value': '20',
          'units': 'percent',
          'dataSource': 'calipers/manual'
        },
        'family': []
      },
    ],
    apiBaseUrl: 'http://localhost:8282/api/v1',
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
    setUsers(state, newUsers) {
      state.users = newUsers;
    },
  },
  actions: {
    async setUsers(context) {
      const remoteUsers = await loadUserData(this.state.apiBaseUrl);
      if (remoteUsers && remoteUsers.length > 0) {
        context.commit('setUsers', remoteUsers);
      }
    }
  }
});
