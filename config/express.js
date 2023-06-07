const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var cors = require('cors');
const morgan = require('morgan');
const {stream} = require('./winston');


module.exports = function () {
  const app = express();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(cookieParser("cookie"));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "cookie",
      cookie: { httpOnly: true, secure: false },
    })
  );
  app.use(passport.initialize()); // req.user, req.login, req.isAuthenticated, req.logout 생성
  app.use(passport.session());

  app.use(cors());
  app.use(morgan('dev', {stream}));
  // app.use(express.static(process.cwd() + '/public'));

  require('../src/app/User/userRoute')(app);
  require('../src/app/Product/productRoute')(app);
  
  return app;
};