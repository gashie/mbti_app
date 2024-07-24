const pool = require('../../../config/db');
let lms = {};



lms.all = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM lesson WHERE deletedAt IS NULL AND id = ?";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

lms.create = (postData = req.body) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO lesson SET ?', [postData], (err, results) => {
        if (err) {
          return reject(err);
        }
  
        return resolve(results);
      });
    });
  };
  


module.exports = lms