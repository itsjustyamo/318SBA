const error = (err, req, res, next) => {
  console.log("---");
  res.status(400).send(err.message);
  console.log("---");
};

module.exports = error;