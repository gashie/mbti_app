const LMS = require("../../../model/instructors/Quiz/Quiz");
const camelcaseKeys = require("camelcase-keys");

const asynHandler = require("../../../middleware/async");

exports.CreateQuiz= asynHandler(async (req, res, next) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    lessonId:req.body.lessonId,
    status:req.body.status
  };

  let result = await LMS.create(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});
