const express = require("express");
const app = express();
const cors = require("cors");
const { get_elements_from_db } = require("./db_interface");

app.use(
  cors({
    origin: "http://localhost:8081",
  })
);

app.use(express.json());
app.listen(3000);

count = 0;
app.post("/profiles", (req, res) => {
  count++;
  console.log("serving the post request ... req count :" + count);
  const jsonData = req.body;
  console.log(jsonData);
  get_elements_from_db(jsonData);
  res.json({ message: "this is the response " });
});
