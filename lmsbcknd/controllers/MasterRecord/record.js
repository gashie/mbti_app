const Monitor = require("../../model/AppMonitor");
const Asset = require("../../model/Asset");
const Apps = require("../../model/Apps");
const Component = require("../../model/AppComponent");

const camelcaseKeys = require("camelcase-keys");
const asynHandler = require("../../middleware/async");

exports.ViewSingleApp = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide appId`,
    });
  }
  let dbresult = await Apps.Findapp(id);
  let cpresult = await Component.Findappcomponent(id);
  // let apmresult = await Monitor.Findappmonitor(id);



  dbresult.Component = cpresult;
  // dbresult.Monitor = apmresult
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

exports.ViewCompMonit = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide appId`,
    });
  }

  let cpresult = await Component.Findcomponent(id);
  let dbresult = await Monitor.Findcomponentmonitor(id);

  const bigData = {
    component:cpresult,
    monitor :dbresult
  }

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
    Data: camelcaseKeys(bigData, { deep: true }),
  });
});

//view all app for an asset
exports.ViewAssetComponent = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide Id`,
    });
  }

  let dbresult = await Asset.Findassetcomponent(id);

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

// view all component for an asset


