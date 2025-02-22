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
