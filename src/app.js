import express from 'express';
import config from './config.js';
import routes from './routes/routes';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('port', config.port);
app.use(routes);
export default app;