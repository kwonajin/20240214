function runSql(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error);
      else {
        return resolve(results);
      }
    });
  });
}

module.exports = { runSql };
