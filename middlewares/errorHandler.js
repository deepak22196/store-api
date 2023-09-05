const errorHandler = async (error, req, res, next) => {
  console.log("from handler", error);
  return res.status(500).json({ message: "something went wrong internally" });
};

module.exports = errorHandler;
