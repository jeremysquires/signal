# Development Docs

## API

### Quick Start

#### Install NPM modules / scripts

- `npm install -g dredd`

## Front End

### Quick Start

#### Install Vue Modules and Plugins

- `npm install -g @vue/cli`
- `npm install -g @vue/cli-service-global`

#### Build and Run

- `cd menuguide`
- `npm install`
- `npm run serve`
- Open in browser at the URL indicated by the serve command

### Future Implementation Ideas

#### User account information

- User should be able to add/delete/modify family members (including self)

#### Router

- Installation using CLI: `vue add router`
    - NOTE: do not execute this once App.js or router.js has been edited, it overwrites
- Force login/account creation if user is not in vuex store using route guards
    - [vue router guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard)

#### Vuex State

- Installation using CLI: `vue add vuex`
    - NOTE: do not execute this once store.js has been edited, it overwrites
- Add user account state to vuex to allow reactivity following user account changes
- [vuex](https://vuex.vuejs.org/guide/)
- [vue cli vuex plugin](https://github.com/64robots/vue-cli-plugin-64robots-vuex)
- [vuex persisted state](https://github.com/robinvdvleuten/vuex-persistedstate)

#### Hamburger Menus

- [mdbootstrap](https://mdbootstrap.com/docs/vue/navigation/hamburger-menu/)
- [vue burger](https://github.com/mbj36/vue-burger-menu)

#### Food Specific Widgets

- [food item menu](https://vuejsexamples.com/food-menu-component/)

### References

- [vuejs guide](https://cli.vuejs.org/guide/)
