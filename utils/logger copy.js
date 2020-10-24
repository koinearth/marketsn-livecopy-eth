const pino = require("pino");
const expressPino = require("express-pino-logger");
const { LOGLEVEL } = require("../config.js");

// Constructs a Pino Instance
const logger = pino({
  level: LOGLEVEL || "debug",
  prettyPrint: { levelFirst: true, colorize: true, ignore: "pid" },
});
// Construct an express middleware using the above pino instance
const expressLogger = expressPino({ logger });

module.exports = { logger, expressLogger };
