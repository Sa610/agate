import express      from 'express';
import path         from 'path';
import fs           from 'fs';
import { Model }    from 'objection';

import Agate        from './lib/agate/agate';
import KnexConfig   from './config/db';

const Knex          = require('knex');
const app           = express();
const agate         = new Agate(__dirname);
const knex          = Knex(KnexConfig.development);

const PORT          = process.env.port || 8080;

Model.knex(knex);

// Set view engine
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// Set static file middleware
app.use('/*.(svg|png|jpe?g|png|css|js)', (req, res) => {
    let dir =   (req.baseUrl.match(/\.js$/) != null)    ? agate.env.appDir.javascriptDistr :
                (req.baseUrl.match(/\.css$/) != null)   ? agate.env.appDir.cssDistr :
                                                          agate.env.appDir.images;

    res.sendFile(path.join(dir, req.baseUrl));
});

// Set SASS watcher and compiler
fs.watch(agate.env.appDir.assets, { 'recursive': true }, (event: string, fileName: string) => {
    let assetsList: any = JSON.parse(fs.readFileSync(agate.env.appFiles.assetsConf).toString());

    if(fileName.match(/^css\/distr/) == null)
        agate.compileAssets(assetsList);
});

// Create main service
app.use('/*', (req, res) => {
    agate.call(req, res);
});

console.log(`Running server on port: http://localhost:${PORT}\n`);
app.listen(PORT);
