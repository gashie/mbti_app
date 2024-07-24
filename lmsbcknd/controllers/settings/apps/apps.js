const Apps = require("../../../model/Apps");
const camelcaseKeys = require("camelcase-keys");
const asynHandler = require("../../../middleware/async");

exports.CreateApp = asynHandler(async (req, res, next) => {

  const newData = {
    appName: req.body.app,
    appDescription: req.body.appDescription,
    contactPerson: req.body.contactPerson,
    status: req.body.status,
  };

  let result = await Apps.createApp(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});

exports.ViewApps = asynHandler(async (req, res, next) => {
  let dbresult = await Apps.allApps();
  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No app found`,
    });
  }

  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

exports.UpdateApp = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    appName: req.body.app,
    appDescription: req.body.appDescription,
    contactPerson: req.body.contactPerson,
    status: req.body.status,
    updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),

  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide appId`,
    });
  }
  let result = await Apps.UpdateApp(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Updated`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Updating Record" });
  }
});

exports.RemoveApp = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    status: 0,
    deletedAt: new Date().toISOString().slice(0, 19).replace("T", " "),

  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide appId`,
    });
  }
  let result = await Apps.UpdateApp(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Deleted`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Removing Record" });
  }
});

exports.SingleApp = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await Apps.Findapp(id);
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