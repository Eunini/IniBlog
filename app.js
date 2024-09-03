const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI)
  .then(result => app.listen(3003))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
})
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// app.use((req, res, next) => {
//   res.status(404).send('Not Found');
// });
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

