const pool = require("../../config/db");
let lms = {};

lms.all = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM surveyresult WHERE deletedAt IS NULL";
    pool.query(sql, function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

lms.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO surveyresult SET ?", [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

lms.findcompleted = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT email FROM surveyresult WHERE email = ?";
      pool.query(sql, [id], function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      });
    });
  };

  lms.getresult = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM surveyresult";
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  lms.getpscount = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT DISTINCT result,COUNT(*) AS total FROM surveyresult GROUP BY result";
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  lms.getpscountotal = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(DISTINCT result) as totalps FROM surveyresult";
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  lms.getpscountusers = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT  COUNT(email) as totalusers FROM surveyresult";
      pool.query(sql, function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      });
    });
  };





module.exports = lms;
