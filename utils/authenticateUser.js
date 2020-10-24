async function authenticateUser(req, res, next) {
  // Skip this check if it's validated from earlier middleware [service-to-service]
  if (req.isValidService) return next();

  if (!req.token) {
    throwError(403, "", "Missing Authorization Headers!");
  }
  const userInfo = utils.getFireBaseId(req.token);
  req.log.debug("received this firebaseId:", userInfo.firebaseId);
  if (!userInfo.firebaseId) {
    throwError("404", "Authentication", "User token malformed or incorrect");
  }
  next();
}

module.exports = authenticateUser;
