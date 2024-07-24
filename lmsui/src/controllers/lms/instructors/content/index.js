const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderContent = asynHandler(async (req, res) => {
  res.render("lms/content");
});

exports.CreateContent = asynHandler(async (req, res) => {
  res.render("lms/content/create");
});
