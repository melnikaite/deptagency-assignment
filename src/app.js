import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressJSDocSwagger from "express-jsdoc-swagger";
import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";

const __dirname = path.resolve();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
expressJSDocSwagger(app)({
  info: {
    version: "1.0.0",
    title: "deptagency-assignment",
    description: "Search movie trailer"
  },
  baseDir: __dirname,
  filesPattern: "./src/routes/api.js",
  swaggerUIPath: "/api-docs"
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
