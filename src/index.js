const path = require('path')
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/.well-known', express.static(path.join(__dirname, 'public/.well-known')));

app.use(express.urlencoded());
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
      extname: '.hbs'
}
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Định nghĩa tuyến đường đi
app.get('/', (req, res) => {
      res.render('home');
});
app.get('/news', (req, res) => {
      res.render('news');
});

app.get('/search', (req, res) => {
      res.render('search');
});

app.post('/search', (req, res) => {
      console.log(req.body)
      res.send('');
});


// 127.0.0.1 - localhost
app.listen(port, () => { console.log(`App listening on port ${port} http://localhost:${port}/`); });
