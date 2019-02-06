const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("Trips.db");

//create new trip
router.post('/trip', (req, res) => {
    //extract parameters
    var tripTitle = req.body.params.title;
    var tripSummary = req.body.params.summary;
    var date = new Date();
    date = date.toDateString();

    //insert into table
    db.run("INSERT INTO trip_plans (title, summary, created_at, updated_at) VALUES ($title, $summary, $created, $updated)",{
        $title: tripTitle,
        $summary: tripSummary,
        $created: date,
        $updated: date
    }, (err) => {
        if (err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        else{
            db.all("SELECT * FROM trip_plans", (err, items) => {
                console.log(items)
            });
            
            return res.status(200).send("Trip Created!");
        }
    });
})

//insert new day based on trip plan's id
//days associated with a trip
router.post('/day', (req, res) => {
    //extract parameters
    var tripTitle = req.body.params.title;
    var tripSummary = req.body.params.description;
    var dateCreated = req.body.params.created;
    var dateUpdated = req.body.params.updated;
    var tripID = req.body.params.tripID;

    //insert into table
    db.run("INSERT INTO days (title, description, trip_id, created_at, updated_at) VALUES ($title, $description, $tripID, $created, $updated)",{
        $title: tripTitle,
        $description: tripSummary,
        $tripID: tripID,
        $created: dateCreated,
        $updated: dateUpdated
    }, (err) => {
        if (err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        else{
            db.all("SELECT * FROM days", (err, items) => {
                console.log(items)
            });
        
            return res.status(200).send("Day Created!");
        }
    });
})

module.exports = router;
