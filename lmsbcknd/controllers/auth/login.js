const AD = require('ad');
const LMS = require('../../model/students/Result');
const asynHandler = require('../../middleware/async');

exports.Login = asynHandler(async (req, res, next) => {
  let userName = req.body.username;
  let password = req.body.password;
  const ad = new AD({
    url: 'ldap://CALBANKDC1.CALBANKGH.COM',
    user: `${userName}@calbankgh.com`,
    pass: password,
  });

  let authme = await ad.user(userName).authenticate(password);

  if (!authme) {
    return res
      .status(500)
      .json({ Status: 0, Message: 'Invalid Username Or Password' });
  }
  let getGroup = await ad.user(userName).isMemberOf('Oauth_Quiz_Master');
  let getGroup2 = await ad.user(userName).isMemberOf('Oauth_Quiz_User');

  let userDetails = await ad.user(userName).get();
  let dbresult = await LMS.findcompleted(userDetails.mail);

  let adResult = {
    email: userDetails.mail,
    fullName: userDetails.displayName,
    userName: userDetails.sAMAccountName,
    isAdmin: getGroup,
    isAssigned: getGroup2,
    isComplete: dbresult ? true : false,
  };
  res.status(200).json({
    Status: 1,
    Message: `Record Created Successfully`,
    Data: [adResult],
  });
});
