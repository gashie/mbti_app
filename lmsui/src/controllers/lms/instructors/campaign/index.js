const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderCampaign = asynHandler(async (req, res) => {
  res.render("lms/campaign");
});

exports.CreateCampaign = asynHandler(async (req, res) => {
  res.render("lms/campaign/create");
});
