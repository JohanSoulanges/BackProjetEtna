// Dependencies
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Routes
const indexRouter = require("./routes/index");

// App
const app = express();

// view engine setup
// app.use(express.static(path.join(__dirname, '../../../Front/angular/dist/angular')));
// app.set('view engine', 'jade');

// Middleware
// app.use(logger("dev")); // Check
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Initialize MongoDB
async function initMongo() {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
}
initMongo();

// Routes
app.use(indexRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
