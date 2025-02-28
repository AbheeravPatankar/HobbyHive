const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");

const MySQLStore = require("express-mysql-session")(session);

const { get_elements_from_db } = require("./db_interface");

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

app.use(express.json());

const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "OIL@28penmysql",
  database: "hobbyhive",
});


app.use(session({
  secret: "secret_key",
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {secure: false, httpOnly: true, sameSite: "None"},
}));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "OIL@28penmysql",
  database: "hobbyhive"
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected to mysql.");
});

app.get("/me", (req, res) => {
  console.log("Session: ", req.session);
  if (!req.session.user) {
    return res.status(401).json({message: "not logged in"})
  }

  res.json({user: req.session.user});
});

app.post("/signup", (req, res) => {
  const {name, email, password} = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({error:"Database error. 1"});

    if (results.length > 0) {
      return res.status(400).json({error:"Email already in use."});
    }

    // Hashing algorithm can be added here

    const insertNewUser = "INSERT INTO users (name, email, password, followers) VALUES (?, ?, ?, 0)";
    db.query(insertNewUser, [name, email, password], (err, results) => {
      if (err) return res.status(500).json({error:"Database error."});

      req.session.user = {email: email};
      console.log("Session after signup: ", req.session);
      res.json({message: "Signup successful!", user: req.session.user});
      
    })
  })
});

app.post("/saveUserDetails", (req, res) => {
  const { city, state, country, dob, phone, education, gender, email} = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const query = `
    UPDATE users 
    SET city = ?, state = ?, country = ?, dob = ?, phone = ?, education = ?, gender = ?
    WHERE email = ?;
  `;

  db.query(query, [city, state, country, dob, phone, education, gender, email], (err) => {
    if (err)  {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "hehe" });
    }
    res.json({ message: "User details saved successfully" });
  });

})

app.post("/saveHobbies", (req, res) => {

  const { email, hobbies } = req.body;

  if (!Array.isArray(hobbies) || hobbies.length === 0) {
    return res.status(400).json({ message: "No hobbies selected" });
  }

  // Remove old hobbies before inserting new ones
  db.query("DELETE FROM user_hobbies WHERE email = ?", [email], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Insert new hobbies
    const values = hobbies.map(hobby => [email, hobby]);
    db.query("INSERT INTO user_hobbies (email, hobby) VALUES ?", [values], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hobbies saved successfully" });
    });
  });
});

app.post("/saveHobbyDetails", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "User not logged in" });
  }

  const email = req.session.user.email;

  const {hobby, description, experience } = req.body;

  const query = `
    UPDATE user_hobbies 
    SET description = ?, experience = ? 
    WHERE email = ? AND hobby = ?`;

  db.query(query, [description, experience, email, hobby], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Hobby details saved successfully!" });
  });

});

app.get("/profiles", (req, res) => {
  const query = "SELECT id, name, followers, city, state, country FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching profiles:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.listen(3000, ()=> {
  console.log("Server listening on port 3000");
});
