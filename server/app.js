const express = require("express");
const cors = require("cors");
const { buildQuery, db_query } = require("./db_interface");

const app = express();
app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

let count = 0;

// POST route to fetch profiles based on user filters
app.post("/profiles", async (req, res) => {
  count++;
  console.log(`Serving POST request... Request count: ${count}`);

  try {
    const jsonData = req.body;
    console.log("Received Filters:", jsonData);

    const query = buildQuery(jsonData);
    const result = await db_query(query);

    res.json(result);
  } catch (error) {
    console.error("Error handling /profiles request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET route to fetch all hobbies
app.get("/hobby/all", async (req, res) => {
  console.log("Serving request at route /hobby/all....");

  try {
    const result = await db_query("SELECT hobby_name FROM Sample.hobbies");
    console.log(result);
    const hobbyList = result.map((item) => item.hobby_name);
    res.json(hobbyList);
  } catch (error) {
    console.error("Error fetching hobbies:", error);
    res.status(500).json({ error: "Failed to fetch hobbies" });
  }
});

// GET route to fetch risk data for a hobby
app.get("/hobby/riskData/:hobby_name", async (req, res) => {
  const hobby = req.params.hobby_name.toLowerCase();
  console.log(`Serving request for hobby: ${hobby}`);
  riskData = [];

  id_json = await db_query(
    "SELECT id FROM Sample.hobbies where hobby_name = '" + hobby + "'"
  );
  console.log("the id for the hobby :");
  console.log(id_json[0].id);

  const result = await db_query(
    "SELECT FIN,FVNC,PHYS,SOCIAL,SAT FROM Sample.hobby_risk_data where hobby_id = " +
      id_json[0].id
  );

  const valuesList = Object.values(result[0]);
  console.log(valuesList);
  res.json(valuesList);
});
