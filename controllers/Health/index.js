const express = require("express");
const { NODE_ENV } = require("../../config.js");
const router = express.Router();
const utils = require("../../utils/utils");

function getMongoConnectionStatus(req, res) {
  switch (NODE_ENV) {
    /**
     * Ignores Mongo Check in build stage
     */
    case "build": {
      res.status(200).send({ msg: "Server alive 😀" });
      break;
    }
    default: {
      // Mongo Object is populated to app.locals after initial connection

      if (req.app.locals.db.readyState == 1) {
        res.status(200).send({ msg: "Server connection to MongoDB alive 😀" });
      } else {
        return res.status(401).send({ msg: "Disconnected from MongoDB 😢" });
      }
      break;
    }
  }
}
router.get("/", getMongoConnectionStatus);
module.exports = router;
