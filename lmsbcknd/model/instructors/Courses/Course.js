const pool = require('../../../config/db');
let lms = {};

lms.all = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM course WHERE deletedAt IS NULL', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};


lms.create = (postData = req.body) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO course SET ?', [postData], (err, results) => {
        if (err) {
          return reject(err);
        }
  
        return resolve(results);
      });
    });
  };
  


module.exports = lms