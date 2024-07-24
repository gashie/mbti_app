const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderQuiz = asynHandler(async (req, res) => {
  res.render("lms/quiz");
});

exports.CreateQuiz = asynHandler(async (req, res) => {
  res.render("lms/quiz/create");
});
