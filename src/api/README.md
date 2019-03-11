# The dbLayer GraphQL Server API

The dbLayer server listens on 8282 for requests

- Pull up a graphiql query IDE: http://localhost:8282/graphql
- Specify a query: http://localhost:8282/graphql?query=%0A%0A%7B%20hello%20%7D%0A%0A
  - Comment: %23
  - Bracket: %7B
  - Space: %20
  - NewLine: %0A

## Development

- `npm install nodemon -g`
- `nodemon server`