
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var aboutRouter = require('./routes/about');
var servicesRouter = require('./routes/services');
var recommendationsRouter = require('./routes/recommendations');
var portfolioRouter = require('./routes/portfolio');
var contactRouter = require('./routes/contact');

var express = require('express');
var router = express.Router();


const createError = require('http-errors');
const path = require('path');
const fs = require("fs")
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/typed.js/lib'));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/services', servicesRouter);
app.use('/recommendations', recommendationsRouter);
app.use('/portfolio', portfolioRouter);
app.use('/contact', contactRouter);

app.post('/', function(req, res) {
  const data = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  res.render('home', { array: JSON.parse(data) });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.locals.status = res.statusCode;  // Added for use in error.ejs
  res.render('error');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  res.render('home', { array: JSON.parse(data)});
});
module.exports = app;
