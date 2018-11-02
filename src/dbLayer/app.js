const { graphql, buildSchema } = require('graphql');
const Koa = require('koa');
const Router = require('koa-router');
const error = require('koa-json-error');
const bodyParser = require('koa-bodyparser');
const graphqlHTTP = require('koa-graphql');
 
const app = new Koa();
const router = new Router();
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//  console.log(response);
// });

router.all('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use(error(err => ({
    error: {
      message: err.message,
      name: err.name,
      status: err.status || 500,
    },
  })));

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;