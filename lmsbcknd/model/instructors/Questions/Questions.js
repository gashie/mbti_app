const pool = require('../../../config/db');
let quiz = {};

quiz.all = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM questions WHERE  status = 1', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

quiz.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO questions SET ?', [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};


quiz.list = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM questions WHERE  surveyId  = ?";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};


quiz.update = (postdata, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE questions SET ? WHERE id = ?",
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

module.exports = quiz