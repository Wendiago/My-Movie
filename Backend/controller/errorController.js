const sendErrorProd = (err, req, res) => {
  // Operational
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // Programming or other unknown error
  console.log("ERROR 💥", err);

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, message: err.message };

  sendErrorProd(error, req, res);
};
