const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');

const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// initialisation
dotenv.config({ path: './config/fig.env' });
const app = express();

// Settings
app.set('port', process.env.PORT || 5122);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// set session here

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
  })
);

// set flash messages to show
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.session = req.session || null;
  next();
});
//HELMET
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by");
    res.removeHeader("set-cookie");
    res.removeHeader("Date");
    res.removeHeader("Connection");
    next();
  });
  app.use(function (req, res, next) {
    /* Clickjacking prevention */
    res.header('Content-Security-Policy', "frame-ancestors 'directive'")
    next()
})
  // Routes
  // otherwise put the res.set() call into the route-handler you want
  app.use(require('./routes/lms'));


// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
