const initApp = require('./src/loaders');
const initRoutes = require('./src/api');
const container = require('./src/container');

const app = container.cradle.app;

initApp(app);
initRoutes(app);

app.listen(process.env.SERVER_PORT,
    () => console.log('Server is listening on port', process.env.SERVER_PORT));