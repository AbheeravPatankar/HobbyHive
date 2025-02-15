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

module.exports = { get_elements_from_db };
