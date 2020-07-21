var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies'); 
var searchRouter = require('./routes/search');
var listRouter = require('./routes/list');
var pstatRouter = require('./routes/pstat');
var teamRouter = require('./routes/team');
var pteamRouter = require('./routes/pteam');
var scheduleRouter = require('./routes/schedule');
var todaygameRouter = require('./routes/todaygame');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/search', searchRouter);
app.use('/api/list', listRouter);
app.use('/api/player/pstat', pstatRouter);
app.use('/api/team', teamRouter);
app.use('/api/pteam', pteamRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/todaygame', todaygameRouter);

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
  res.render('error');
});

module.exports = app;
