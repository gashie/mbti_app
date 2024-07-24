const LMS = require("../../../model/instructors/Questions/Questions");
const Logging = require('../../../model/logs/logs');
const camelcaseKeys = require("camelcase-keys");

const asynHandler = require("../../../middleware/async");

exports.CreateQuestions = asynHandler(async (req, res, next) => {

  let test = req.body.ptype
  var foo = (
    test === 'EI' ? [a, b] = ['e', 'i'] : // if 
    test === 'SN' ? [a, b] = ['s', 'n'] : // else if 
    test === 'TF' ? [a, b] = ['t', 'f']: // else if
    test === 'JP' ? [a, b] = ['j', 'p']: // else if
    null // else 
  );
  const newData = {
    surveyId: req.body.surveyId,
    question: req.body.question,
    a1: req.body.a1,
    a2: req.body.a2,
    v1: foo[0],
    v2: foo[1],
    status: req.body.status
  };

 
  Logging.PushLog(
    'HR',
    'Create Question',
    `Record Created`,
    'ADD QUESTION',
    'Success'
  );

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

exports.ViewQuestionsList = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await LMS.list(id);
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

exports.ViewQuestions = asynHandler(async (req, res, next) => {
  let dbresult = await LMS.all();
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