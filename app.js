const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const mongodbURI = require('./mongodb-uri');

const app = express();

// connect to mongodb
const dbURI = mongodbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('connected to db')
    app.listen(3000);
})
.catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', blogs: {}});
});

//blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: 'Not found'})
});