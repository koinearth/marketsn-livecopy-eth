module.exports = throwError = (code, errorType, errorMessage) => {
  let error = new Error();
  error.code = code;
  error.message = errorMessage;
  error.errorType = errorType;
  throw error;
};
