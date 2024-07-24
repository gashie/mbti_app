const LMS = require("../../../model/instructors/Campaign/Campaign");
const camelcaseKeys = require("camelcase-keys");

const asynHandler = require("../../../middleware/async");

exports.CreateCampaign = asynHandler(async (req, res, next) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    startDate:req.body.startDate,
    startTime: req.body.startTime,
    endDate: req.body.endDate,
    endTime:req.body.endTime,
    lessonId: req.body.lessonId,
    notificationId: req.body.notificationId,
    track:req.body.track,
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
