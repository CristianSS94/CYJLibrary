var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const booksRouter = require("./routes/books");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const messagesRouter = require("./routes/messages");
const chatsRouter = require("./routes/chats");

var app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/categories", categoriesRouter);
app.use("/messages", messagesRouter);
app.use("/chats", chatsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
