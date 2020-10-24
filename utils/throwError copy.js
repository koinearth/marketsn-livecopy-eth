/**
 * Custom Error Message
 * @param {number} code
 * @param {string} errorType
 * @param {string} errorMessage
 * @throw {error}
 */
const throwError = (code, errorType, errorMessage) => {
  const error = new Error();
  error.code = code;
  error.message = errorMessage;
  error.errorType = errorType;
  throw error;
};

module.exports = throwError;
