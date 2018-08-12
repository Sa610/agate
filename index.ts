import express      from 'express';
import path         from 'path';
import { Model }    from 'objection';

import Agate        from './lib/agate/agate';
import KnexConfig   from './config/db';

const Knex          = require('knex');
const app           = express();
const agate         = new Agate(__dirname);
const knex          = Knex(KnexConfig.development);

const PORT          = process.env.port || 8080;

Model.knex(knex);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use('/*.(svg|png|jpe?g|png)', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/assets/image', req.baseUrl));
});

app.use('/*', (req, res) => {
    agate.call(req, res);
});

console.log(`Running server on port: http://localhost:${PORT}\n`);

app.listen(PORT);
