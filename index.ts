import express      from 'express';
import path         from 'path';
import { Model }    from 'objection';

import Routes       from './lib/agate/routes';
import KnexConfig   from './config/db';

const Knex          = require('knex');
const app           = express();
const routes        = new Routes();
const knex          = Knex(KnexConfig.development);

Model.knex(knex);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use('/*.(svg|png|jpe?g|png)', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/assets/image', req.baseUrl));
});

app.use('/*', (req, res) => {
    routes.call(req, res);
});

app.listen(8080);
