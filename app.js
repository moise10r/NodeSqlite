/*              app.js -- application core logic and config               */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('app')

// the app object
var app = express();

// router objects
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var tipsRouter = require('./routes/tips');
var recipesRouter = require('./routes/recipes');
var adviceRouter = require('./routes/advice');
var adminRouter = require('./routes/admin');

// view engine config 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use these routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/tips', tipsRouter);
app.use('/recipes', recipesRouter);
app.use('/advice', adviceRouter);
app.use('/admin', adminRouter);

// catch 404, forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// respond to favicon requests with 204 no content 
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// expose this app to scripts that require it, i.e. myapp/bin/www
module.exports = app;