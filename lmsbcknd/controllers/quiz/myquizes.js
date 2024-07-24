const Quiz = require("../../model/instructors/Questions/Questions");
const camelcaseKeys = require("camelcase-keys");

const asynHandler = require("../../middleware/async");

exports.CreateQuestions = asynHandler(async (req, res, next) => {
  const newData = {
    question: req.body.question,
    a1: req.body.a1,
    a2: req.body.a2,
    v1: req.body.v1,
    v2: req.body.v2,
  };

  let result = await Quiz.create(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});

exports.ViewQuestions = asynHandler(async (req, res, next) => {
    let dbresult = await Quiz.all();
    if (dbresult.length == 0) {
      return res.status(200).json({
        Status: 0,
        Data: [],
        Message: `No questions found`,
      });
    }
  
    res.json({
      Status: 1,
      Message: "Record Found",
      Data: camelcaseKeys(dbresult, { deep: true }),
    });
  });