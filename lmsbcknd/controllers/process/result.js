const camelcaseKeys = require('camelcase-keys');
const LMS = require('../../model/students/Result');
const asynHandler = require('../../middleware/async');
const Logging = require('../../model/logs/logs');

exports.ProcessResult = asynHandler(async (req, res, next) => {
  let myresult = req.body.mainbody;
  let email = myresult.email;
  let name = myresult.name;
  let resultData = {
    email,
    name,
  };

  Logging.PushLog(
    myresult.email,
    'Create Question',
    `Quiz Completed`,
    'COMPLETED SURVEY',
    'Success'
  );
  delete myresult.name;
  delete myresult.email;
  console.log(myresult);
  console.log(resultData);

  var E = 0,
    I = 0,
    N = 0,
    S = 0,
    T = 0,
    F = 0,
    P = 0,
    J = 0;

  for (var key in myresult) {
    if (myresult[key] === 'e') E++;
    if (myresult[key] === 'i') I++;
    if (myresult[key] === 'n') N++;
    if (myresult[key] === 's') S++;
    if (myresult[key] === 't') T++;
    if (myresult[key] === 'f') F++;
    if (myresult[key] === 'p') P++;
    if (myresult[key] === 'j') J++;
  }
  console.log(
    '\nE = ' +
      E +
      '\nI = ' +
      I +
      '\nN = ' +
      N +
      '\nS = ' +
      S +
      '\nT = ' +
      T +
      '\nF = ' +
      F +
      '\nP = ' +
      P +
      '\nJ = ' +
      J
  );

  // var str1 = "",
  //   str2 = "",
  //   str3 = "",
  //   str4 = "";
  // if (E === I || E < I) str1 = "I";
  // else srt1 = "E";
  // if (S === N || S < N) str2 = "N";
  // else str2 = "S";
  // if (T === F || T < F) str3 = "F";
  // else str3 = "T";
  // if (J === P || J < P) str4 = "P";
  // else str4 = "J";
  var str1 =
    E === I
      ? 'I' // if
      : E < I
      ? 'I' // else if
      : E > I
      ? 'E' // else if
      : null; // else
  var str2 =
    S === N
      ? 'N' // if
      : S < N
      ? 'N' // else if
      : S > N
      ? 'S' // else if
      : null; // else
  var str3 =
    T === F
      ? 'F' // if
      : T < F
      ? 'F' // else if
      : T > F
      ? 'T' // else if
      : null; // else
  var str4 =
    J === P
      ? 'P' // if
      : J < P
      ? 'P' // else if
      : J > P
      ? 'J' // else if
      : null; // else
  // var str1,str2,str3,str4 =  (
  //   E === I ? str1 = "I" : // if
  //   E < I ? str1 = "I" : // else if
  //   E > I ? str1 = "E" : // else if
  //   S === N ? str2 = "N" : // if
  //   S < N ? str2 = "N" : // else if
  //   S > N ? str2 = "S" : // else if
  //   T === F ? str3 = "F" : // if
  //   T < F ? str3 = "F" : // else if
  //   T > F ? str3 = "T" : // else if
  //   J === P ? str4 = "P" : // if
  //   J < P ? str4 = "P" : // else if
  //   J > P ? str4 = "J" : // else if
  //   null // else
  // );
  var result = str1.concat(str2, str3, str4);
  console.log('***logging string str1'.str1);
  console.log(
    'result: ' +
      result +
      '\nstr1: ' +
      str1 +
      '\nstr2: ' +
      str2 +
      '\nstr3: ' +
      str3 +
      '\nstr4: ' +
      str4
  );

  resultData.result = result;

  const breakdown = {
    e: E,
    i: I,
    n: N,
    s: S,
    t: T,
    f: F,
    p: P,
    j: J,
  };
  console.log(breakdown);

  let dbresult = await LMS.create(resultData);
  if (dbresult.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
      Data: result,
      breakdown,
    });
  } else {
    res.status(500).json({ Status: 0, Message: 'Error Saving Record' });
  }
  //  if (myresult) {
  //       res.status(200).json({
  //         Status: 1,
  //         Message: `Record Processed Successfully`,
  //         Data: result
  //       });
  //     } else {
  //       res.status(500).json({ Status: 0, Message: "Error Processing Record" });
  //     }
});

exports.ViewResult = asynHandler(async (req, res, next) => {
  let dbresult = await LMS.getresult();

  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No result found`,
    });
  }

  res.json({
    Status: 1,
    Message: 'Record Found',
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

exports.ViewPsCount = asynHandler(async (req, res, next) => {
  let dbresult = await LMS.getpscount();

  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No result found`,
    });
  }

  res.json({
    Status: 1,
    Message: 'Record Found',
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

exports.ViewTotal = asynHandler(async (req, res, next) => {
  let dbresult = await LMS.getpscountotal();
  let dbusersresult = await LMS.getpscountusers();

  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No result found`,
    });
  }

  dbresult.users = dbusersresult;

  res.json({
    Status: 1,
    Message: 'Record Found',
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});
