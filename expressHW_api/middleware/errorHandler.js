const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({
      message: `The ID you provided was not valid. Check all valid object ids by making a GET request at /characters route.`,
    });
  }
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
