const pool = require("../../../config/db");
let lms = {};

lms.all = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM survey WHERE deletedAt IS NULL";
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
    pool.query("INSERT INTO survey SET ?", [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};


lms.single = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM survey WHERE id = ?";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

lms.update = (postdata, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE survey SET ? WHERE id = ?",
      [postdata, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};
module.exports = lms;
