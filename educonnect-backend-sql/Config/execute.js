const pool = require("./db");
executeQuery= (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  

module.exports= executeQuery;