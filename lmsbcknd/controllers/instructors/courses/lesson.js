const LMS = require("../../../model/instructors/Lesson/Lesson");
const camelcaseKeys = require("camelcase-keys");

const asynHandler = require("../../../middleware/async");

exports.CreateLesson= asynHandler(async (req, res, next) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    courseId:req.body.courseId,
    type:req.body.type,
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

exports.ViewLessons = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await LMS.all(id);
  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }

  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});