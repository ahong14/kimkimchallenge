const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("Trips.db");

//remove trip record from trip_plans table based on matching id
router.delete("/", (req,res) => {
    var id = req.query.id;
    //execute sql command to delete trip_plans record
    db.run("DELETE FROM trip_plans WHERE id = $id", {
        $id: id
    }, (err) => {
        if(err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        //delete days associated with a travel plan
        db.run("DELETE FROM days WHERE trip_id = $id", {
            $id: ud
        }, (err) => {
            if (err){
                console.error(err);
                return res.status(500).send("error with database");
            }
            return res.status(200).send("record deleted");
        })
    })
})

//delete day record based on matching id
router.delete("/day", (req,res) => {
    var id = req.query.id;
    //execute sql command to delete day record
    db.run("DELETE FROM days WHERE id = $id", {
        $id: id
    }, (err) => {
        if(err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        return res.status(200).send("record deleted");
    })
})
module.exports = router;