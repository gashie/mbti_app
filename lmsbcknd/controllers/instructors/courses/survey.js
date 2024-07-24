const LMS = require("../../../model/instructors/Survey/Survey");
const camelcaseKeys = require("camelcase-keys");
const crypto = require("crypto");
const asynHandler = require("../../../middleware/async");

exports.CreateSurvey = asynHandler(async (req, res, next) => {
  const id = crypto.randomBytes(16).toString("hex");
  const newData = {
    id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
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


exports.ViewSurvey = asynHandler(async (req, res, next) => {


  var test = 'SI';

  var foo = (
    test === 'EI' ? [a, b] = [1, 2] : // if 
      test === 'SI' ? [a, b] = [3, 4] : // else if 
        test === 'TF' ? [a, b] = [5, 6] : // else if
          test === 'JP' ? [a, b] = [7, 8] : // else if
            null // else 
  );
  console.log(foo[0]);
  console.log(foo[1]);
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

exports.SingleSurvey = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await LMS.single(id);
  if (!dbresult) {
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

exports.RemoveSurvey = asynHandler(async (req, res, next) => {
  let id = req.body.id;


  const newData = {
    status: 0,
    deletedAt: new Date().toISOString().slice(0, 19).replace("T", " "),

  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide an id`,
    });
  }
  let result = await LMS.update(newData, id);



  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Deleted`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Removing Record" });
  }
});
exports.UpdateSurvey = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),

  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide id`,
    });
  }
  let result = await LMS.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Updated`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Updating Record" });
  }
});