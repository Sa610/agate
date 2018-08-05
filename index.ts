import express  from 'express';
import path     from 'path';
import Routes   from './lib/agate/routes';

const app           = express();
let routes          = new Routes();

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// app.use(/\/static/', express.static(path.join(__dirname, 'app/assets')));

app.use('/*.(svg|png|jpe?g|png)', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/assets/image', req.baseUrl));
});

app.use('/*', (req, res) => {
    routes.call(req, res);
});

app.listen(8080);
