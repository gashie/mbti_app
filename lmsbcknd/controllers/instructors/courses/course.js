const LMS = require("../../../model/instructors/Courses/Course");
const camelcaseKeys = require("camelcase-keys");

const asynHandler = require("../../../middleware/async");

exports.CreateCourse = asynHandler(async (req, res, next) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    requirement: req.body.requirement,
    isPublished: req.body.isPublished,
    preview: req.body.preview,
    categoryId:req.body.categoryId,
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

exports.ViewCourses = asynHandler(async (req, res, next) => {
  let dbresult = await LMS.all();
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