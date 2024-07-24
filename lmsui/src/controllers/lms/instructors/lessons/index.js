const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderLessons = asynHandler(async (req, res) => {
  res.render("lms/lessons");
});

exports.CreateLessons = asynHandler(async (req, res) => {
  res.render("lms/lessons/create");
});
