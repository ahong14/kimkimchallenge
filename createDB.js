const sqlite3 = require("sqlite3").verbose();

//create database
const db = new sqlite3.Database("Trips.db");

//create tables storing trip plans and day
var command1 = "CREATE TABLE trip_plans (id INTEGER UNIQUE NOT NULL PRIMARY KEY, title TEXT NOT NULL, summary TEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL)";
var command2 = "CREATE TABLE days (id INTEGER UNIQUE NOT NULL PRIMARY KEY, trip_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, created_at DATETIME NOT NULL, updated_AT DATETIME NOT NULL)";

//create trip plans table
db.run(command1, (err) => {
    if(err){
        console.error(err);
    }
    console.log("trip_plans table created");
});

//create day table
db.run(command2, (err) => {
    if(err){
        console.err(err);
    }
    console.log("day table created");
    db.close();
});


