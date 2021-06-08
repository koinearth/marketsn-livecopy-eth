1; // Import the mongoose module
const mongoose = require("mongoose");
const { logger } = require("./utils/logger.js");
const config = require("./config");
const { mongoUrl, dbUsername, dbPassword, networkConfigData } = config;

/**
 * Mongoose calls to the db hangs up silently if the connection fails so handle with try/catch and monitor the `.error`
 * event
 */
function getConnection() {
  try {
    let url = mongoUrl;
    let db = mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    return db;
  } catch (e) {
    logger.debug(e);
  }
}

const db = getConnection();

module.exports = db;
