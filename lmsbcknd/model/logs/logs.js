const pool = require('../../config/db');


let gatewayLog = {};
gatewayLog.PushLog = (agent, request, response, activity, status) => {
  return new Promise((resolve, reject) => {
    try {
      const loggedata = { agent, request, response, activity, status };

      var query = pool.query(
        'INSERT INTO logs SET ?',
        loggedata,
        function (err, result) {
          // Neat!
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = gatewayLog;
