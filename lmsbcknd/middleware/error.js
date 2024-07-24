const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };
  error.message = err.message;
  //Log to console for dev

  //mysql bad ObjectId
  if (err.code === "ER_DUP_ENTRY") {
    const message = `Duplicate entry found in request`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === "ER_BAD_FIELD_ERROR") {
    const message = `Unknown column in request`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === "ER_NO_SUCH_TABLE") {
    const message = `Unknown table in request`;
    error = new ErrorResponse(message, 404);
  }

  //Mongo duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  
  //MYSQL CHECK CONNNECTION ISSUE 
  if (err.code === "ECONNREFUSED") {
    const message = "System connection failed.";
    error = new ErrorResponse(message, 400);
  }
  //mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    Status: 0,
    Message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
