const Apps = require("../../../model/Asset");
const camelcaseKeys = require("camelcase-keys");
const asynHandler = require("../../../middleware/async");

exports.CreateAsset = asynHandler(async (req, res, next) => {
  const newData = {
    assetName: req.body.assetName,
    ipAddress: req.body.ipAddress,
    location: req.body.location,
    status: req.body.status,
  };

  let result = await Apps.create(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});

exports.ViewAsset = asynHandler(async (req, res, next) => {
  let dbresult = await Apps.all();
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

exports.SingleAsset = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await Apps.find(id);
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

exports.UpdateAsset = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  console.log(req.body);
  const newData = {
    assetName: req.body.assetName,
    ipAddress: req.body.ipAddress,
    location: req.body.location,
    status: req.body.status,
    updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),

  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide assetId`,
    });
  }
  let result = await Apps.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Updated`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Updating Record" });
  }
});

exports.RemoveAsset = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    status: 0,
    deletedAt: new Date().toISOString().slice(0, 19).replace("T", " "),

  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide assetId`,
    });
  }
  let result = await Apps.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Deleted`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Removing Record" });
  }
});