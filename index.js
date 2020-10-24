/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const compression = require("compression");
//const responseTime = require("response-time");
const { expressLogger, logger } = require("./utils/logger");
const config = require("./config");
const db = require("./mongoConnection");
const bearerToken = require("express-bearer-token");
const authenticateUser = require("./middleware/authenticateUser");
const healthRouter = require("./controllers/Health");

// import global app routes

const routes = require("./routes");
const { port } = config;

app.locals.db = db;

app.use(compression());
//app.use(responseTime());

/*
 * Add cors
 */
const options = {
  origin: `http://localhost:3000`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors());
/*
 * Add middleware here
 */
app.use(bearerToken());
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Health check
app.use("/status", healthRouter);

app.use(authenticateUser);

/*
 * Add routes here
 */
app.use("/", routes);

/*
 * Start the server
 */

const server = http.createServer(app);

// app.use(injectApplicationConstants)

server.listen(port, function () {});

console.log("****************** SERVER STARTED ************************");
console.log("listening on port:", port);
server.timeout = 240000;

module.exports = app;
