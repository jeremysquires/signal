# Development Docs

## API

### Quick Start

#### Install NPM modules / scripts

> `npm install -g dredd`

#### Run

> `cd src/api`
>
> `node ./server.js`

#### Test

> `cd src/api`
>
> `npm run test`

### Docs

[API Blueprint](https://apiblueprint.org) is used to document the APIs

In the docs folder you will find markdown files in the API blueprint format that can be processed by special purpose applications such as [Dredd](http://dredd.org), an API testing tool, and [Apiary](https://apiary.io/), a platform for hosting API documentation.

### Dredd API Blueprint Tests

#### Install

> `npm install dredd -g`

#### Run

> Run the Dredd tests from the parent directory (/api), with:
> 
> `dredd --config docs/dredd_menuguide_local.yml`
>
> OR
>
> `npm run test:dredd`
>
> If the server has already been started, then run dredd this way:
>
> `dredd ./docs/menuguide.apib http://localhost:8282`

### Future Implementation Ideas

#### Scalability and Performance

- Refactor users and menu endpoints as decoupled microservices
    - put endpoints into separate route files - DONE
    - remove dependencies on locals, move to API endpoint calls
    - allow endpoints to be configured separately during deployment
- Add state management library so API calls are not necessary where endpoints cohabit a server

#### DevOps

- Add logging middleware (centralized to support microservices)
- Implement deploy task to surge.sh or other static hosting provider
- Incorporate CircleCI into development process through GitHub

#### Security

- Implement HTTPS
- Use a reverse proxy in a DMZ
- Add authentication/authorization
    - JWT Tokens to maintain Authentication and secure it
    - Opaque tokens in DB for Authorization

#### Code Quality

- [stricter eslint config](https://www.npmjs.com/package/eslint-config-node)

## Front End

### Quick Start

#### Install Vue Modules and Plugins

> `npm install -g @vue/cli`
>
> `npm install -g @vue/cli-service-global`

#### Build and Run

> `cd menuguide`
>
> `npm install`
>
> `npm run serve`
>
> Open in browser at the URL indicated by the serve command

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
