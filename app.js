var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var produtosRouter = require('./routes/produtos');
var clientesRouter = require("./routes/clientes");
var checkoutRouter = require('./routes/checkout');
var gerenciarRouter = require('./routes/gerenciar');
var apiRouter = require("./routes/api");
const { application } = require('express');

//import middleware autenticador
const authenticator = require("./middlewares/authenticator");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//declarando uso de session
app.use(session({secret: "las Copas - winery",
                 saveUninitialized: true,
                 resave: false}));

app.use(function (req, res, next) {
	if (!req.session) {
		req.session.user.nome = undefined;
		res.locals.sessao = req.session.user;
		return next();
	}else{
    res.locals.sessao = req.session.user;
    return next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/produtos', produtosRouter);
app.use("/clientes", clientesRouter);
app.use("/checkout", checkoutRouter);
app.use('/gerenciar',authenticator.autenticaAdmin, gerenciarRouter);
//app.use('/gerenciar', gerenciarRouter);
app.use('/API', apiRouter);
app.use('/images', express.static('images'));

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
