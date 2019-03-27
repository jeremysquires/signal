## MenuGuide API

The MenuGuide API provides data for the MenuGuide Front End.

The details of the API endpoints are documented in API Blueprint format in [docs/menuguide.apib](docs/menuguide.apib), but they comprise two main services: Users and Menu. Once the API is running in development mode, these services can be accessed locally through the URLs:

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
