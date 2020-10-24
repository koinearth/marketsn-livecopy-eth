// Temp code, WIP

async function authenticateUser(req, res, next) {
  if (!req.token) {
    res
      .status(404)
      .send({ status: "error", message: "Missing Authorization Headers!" });
  } else {
    next();
    req.log.debug(req.token);
  }
}

module.exports = authenticateUser;
