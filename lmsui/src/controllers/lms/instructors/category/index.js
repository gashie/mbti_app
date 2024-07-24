const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderCategory = asynHandler(async (req, res) => {
  res.render("lms/category");
});

exports.CreateCategory = asynHandler(async (req, res) => {
  res.render("lms/category/create");
});
