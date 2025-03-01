const express = require("express");
const app = express();
const cors = require("cors");
const { buildQuery, db_query } = require("./db_interface"); // Import the functions from db_interface

app.use(
  cors({
    origin: "http://localhost:8081",
  })
);

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

let count = 0; // Changed to let since it's a variable that changes

app.post("/profiles", (req, res) => {
  count++;
  console.log("serving the post request ... req count :" + count);
  const jsonData = req.body;
  console.log(jsonData);
  const query = buildQuery(jsonData); // Added const
  result = db_query(query);
  res.json(result);
});

app.get("/hobby/all", (req, res) => {
  console.log("serving the request at route /hobby/all....");

  //query the data base to get all the hobbies
  result = db_query("select hobby_name from Sample.hobbies");
  hobbies = ["select value ", "tennis", "cricket", "programming"];
  res.json(hobbies);
});

app.get("/hobby/riskData/:hobby_name", (req, res) => {
  const hobby = req.params.hobby_name; // Extract query param
  console.log("Serving request for hobby:", hobby);

  if (hobby === "tennis") return res.json([2, 3.4, 3.8, 2.1, 1, 1.9]);
  if (hobby === "cricket") return res.json([1.8, 2.9, 3.5, 2.4, 0.9, 2.1]);
  if (hobby === "programming") return res.json([3.0, 4.2, 3.6, 1.7, 1.1, 2.5]);
  return res.json([]);
});
