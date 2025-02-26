const { createPool } = require("mysql2");

const db = createPool({
  host: "localhost",
  user: "hobby-hive",
  password: "hobby",
  database: "Sample",
});

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
        if (key == "followers") {
          conditions.push(`${key} > ${filters[key]}`);
        } else {
          conditions.push(`${key} = ${filters[key]}`);
        }
      }
    }
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }
  console.log(baseQuery);
  return baseQuery;
}

function db_query(query) {
  db.query(query, (err, result, fields) => {
    if (err) {
      console.log("error occurred when querying the database ", err); // Added error logging
      return;
    }
    console.log(result);
    return result;
  });
}

function get_elements_from_db(filters) {
  let baseQuery = "SELECT * FROM profiles";
  let conditions = [];

  for (let key in filters) {
    if (filters[key] !== null && filters[key] !== undefined) {
      if (typeof filters[key] === "string") {
        conditions.push(`${key} = '${filters[key]}'`);
      } else {
        conditions.push(`${key} = ${filters[key]}`);
      }
    }
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  console.log(baseQuery);
}

module.exports = { get_elements_from_db, buildQuery, db_query };
