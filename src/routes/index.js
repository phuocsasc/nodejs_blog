const newRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // Định nghĩa tuyến đường đi
    app.use('/news', newRouter);

    app.use('/', siteRouter);
}

module.exports = route;
