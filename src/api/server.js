const app = require('./app');

const PORT = process.env.PORT || 8282;
app.listen(PORT);
console.info(`Listening on http://localhost:${PORT}`); // eslint-disable-line no-console

