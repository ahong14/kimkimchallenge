const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("Trips.db");

//get all trips
router.get('/', (req,res) => {
    //get all trip plans from database
    db.all("SELECT * FROM trip_plans", (err, plans) => {
        if(err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        else{
            return res.status(200).json(plans);
        }
    })
})

//get all days based on trip id
router.get('/days', (req,res) => {
    var id = req.query.tripID;
    //get all trip plans from database
    db.all("SELECT * FROM days WHERE trip_ID = $tripID",{
        $tripID: id
    },(err, plans) => {
        if(err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        else{
            return res.status(200).json(plans);
        }
    })
})

module.exports = router;