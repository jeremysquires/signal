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
    return;
  }
  return response.data;
};

export default new Vuex.Store({
  state: {
    login: '',
    user: undefined,
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
  },
  mutations: {
    setLogin(state, newLogin) {
      state.login = newLogin;
    },
    setUser(state, newUser) {
      state.user = newUser;
    },
    setUsers(state, newUsers) {
      state.users = newUsers;
    },
  },
  actions: {
    async setUsers(context) {
      const remoteUsers = await loadUserData('http://localhost:8282/api/v1');
      if (remoteUsers && remoteUsers.length > 0) {
        context.commit('setUsers', remoteUsers);
      }
    }
  }
});
