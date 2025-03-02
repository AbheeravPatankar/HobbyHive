const { createPool } = require("mysql2");

const db = createPool({
  host: "localhost",
  user: "hobby-hive",
  password: "hobby",
  database: "Sample",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to build query dynamically based on filters
function buildQuery(filters) {
  let baseQuery = "SELECT * FROM user_general_info";
  let conditions = [];

  for (let key in filters) {
    if (
      filters[key] !== null &&
      filters[key] !== "" &&
      filters[key] !== undefined
    ) {
      if (typeof filters[key] === "string") {
        conditions.push(`${key} = '${filters[key]}'`);
      } else {
        conditions.push(
          `${key} ${key === "followers" ? ">" : "="} ${filters[key]}`
        );
      }
    }
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }
  console.log("Generated Query:", baseQuery);
  return baseQuery;
}

// Function to execute database queries with proper async handling
function db_query(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { buildQuery, db_query };
