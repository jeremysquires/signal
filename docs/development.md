# MenuGuide Development

## MenuGuide API

The MenuGuide API provides data for the MenuGuide Front End.

The details of the API endpoints are documented in API Blueprint format in [menuguide.apib](../src/api/docs/menuguide.apib), but they comprise two main services: Users and Menu. Once the API is running in development mode, these services can be accessed locally through the URLs:

- `http://localhost:8282/api/v1/users/:login`
- `http://localhost:8282/api/v1/menu/:login`

### Quick Start

#### Prerequisites

- Node v8.5.0+

#### Install NPM modules / scripts

> `cd src/api`
>
> `npm install -g dredd`
>
> `npm install`

#### Run

> `cd src/api`
>
> `npm run serve`

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

- Implement data stores for user information
- Refactor users and menu endpoints as decoupled microservices
    - put endpoints into separate route files - DONE
    - remove dependencies on locals, move to API endpoint calls - DONE
    - allow endpoints to be configured separately during deployment - TODO
- Add state management so APIs running in the same instance can use memory
- Add load balancing of microservices

#### DevOps

- Add logging middleware (centralized to support microservices)
- Implement deploy task to surge.sh or other static hosting provider
- Incorporate CircleCI into development process through GitHub
- Containerize the microservices and manage a cluster of instances

#### Security

- Implement white list rules for CORS - DONE
- Implement HTTPS
- Use a reverse proxy in a DMZ
- Add authentication/authorization
    - JWT Tokens to maintain Authentication and secure it
    - Opaque tokens in DB for Authorization

#### Code Quality and Maintainability

- Implement GraphQL to combine multiple APIs into a single interface
- Implement Cypress as an end to end testing tool against Front End
    - provides more control to the programmer than Selenium
    - is programmed through an expresssive API
- [stricter eslint config](https://www.npmjs.com/package/eslint-config-node)

#### Docs

- Generate API Blueprint HTML output and publish to Apiary
- Add JSDoc comments to code

### References

- [Dredd - HTTP API Testing](https://dredd.org/en/latest/)
- [API Blueprint - API Description Language](https://apiblueprint.org/)
- [JMESPath - JSON Queries](http://jmespath.org)
- [JSON-Function (Inner Join)](https://worn.gitbook.io/json-function/)
- [lodash](https://lodash.com/docs/4.17.11)

## MenuGuide Front End

The MenuGuide Front End is a proof of concept front end app that accesses the MenuGuide API to allow testing of the Users and Menu endpoints of the API. It is designed to show that the basic user stories are supported by the API.

Once the server is started, open the app in a browser at the URL indicated by the serve command, usually [http://localhost:8081](http://localhost:8081).

### Quick Start

#### Prerequisites

- Node v8.5.0+
- MenuGuide API started - see [api/README.md](../src/api/README.md)

#### Install Vue Modules and Plugins

> `npm install -g @vue/cli`
>
> `npm install -g @vue/cli-service-global`

#### Build and Run

> `cd src/menuguide`
>
> `npm install`
>
> `npm run serve`

### Future Implementation Ideas

#### Styling

- Raw data outputs should be styled

#### User account information

- User should be able to add/delete/modify family members and self

#### Router

- Force login/account creation if user is not in vuex store using route guards - DONE

#### Vuex State

- Add user to vuex state to allow reactivity on user account changes - DONE
- Add persistence to state
    - [vuex persisted state](https://github.com/robinvdvleuten/vuex-persistedstate)

#### Hamburger Menus

- Add navigation menu
    - [mdbootstrap](https://mdbootstrap.com/docs/vue/navigation/hamburger-menu/)
    - [vue burger](https://github.com/mbj36/vue-burger-menu)

#### Food Specific Widgets

- [food item menu](https://vuejsexamples.com/food-menu-component/)

### References

- [vuejs guide](https://cli.vuejs.org/guide/)
- [vuex](https://vuex.vuejs.org/guide/)
- [vue cli vuex plugin](https://github.com/64robots/vue-cli-plugin-64robots-vuex)
- [vue router guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard)
