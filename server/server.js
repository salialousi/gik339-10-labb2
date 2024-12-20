const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const server = express();
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

// Starta servern
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


server.get("/users", (req, res) => {
  const db = new sqlite3.Database("./server/gik339-labb2.db");

  
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("SQL error:", err.message);
      res
        .status(500)
        .json({ error: "Failed to fetch users from the database." });
    } else {
      console.log("Users fetched:", rows); 
      res.json(rows);
    }
  });
});
