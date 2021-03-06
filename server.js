const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to here!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio Page',
        welcomeMessage: 'Welcome to Portfolio Page!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        code: '404',
        message: 'Unable to handle the request'
    });
});

app.post('/test_post', (req, res) => {
    // var job = req.body.job;
    // const jobKey = job[0].job_key;
    // const tjNumber = job[0].tj_number;
    // res.json({
    //     code: '200',
    //     message: `your job ${tjNumber} (${jobKey}) is completed`
    // });
    // res.end('yes');
    // var text = JSON.stringify(req, undefined, 2);
    // res.stringify(text);
    // res.end('yes');
    res.json({
        code: '200',
        message: JSON.stringify(req.body)
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});