const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/.well-known',
    express.static(path.join(__dirname, 'public/.well-known')),
);

app.use(express.urlencoded());
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes initial
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening on port ${port} at http://localhost:${port}/`);
});
