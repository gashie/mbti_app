const pool = require('../../../config/db');
let lms = {};


lms.create = (postData = req.body) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO categories SET ?', [postData], (err, results) => {
        if (err) {
          return reject(err);
        }
  
        return resolve(results);
      });
    });
  };
  


module.exports = lms