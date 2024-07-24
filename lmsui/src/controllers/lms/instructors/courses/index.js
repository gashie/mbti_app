const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderCourses = asynHandler(async (req, res) => {
  res.render("lms/courses");
});

exports.CreateCourse = asynHandler(async (req, res) => {
  res.render("lms/courses/create");
});
