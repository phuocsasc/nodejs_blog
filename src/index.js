const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')

const SortMiddleware = require('./app/middlewares/SortMiddlewares')

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
app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'bi bi-funnel-fill',
                    asc: 'bi bi-sort-down-alt',
                    desc: 'bi bi-sort-down',
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                            <i class="${icon}"></i>
                        </a>`
            }
        }
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
