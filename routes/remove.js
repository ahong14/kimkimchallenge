const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("Trips.db");

router.delete("/", (req,res) => {
    var id = req.query.id;

    db.run("DELETE FROM trip_plans WHERE id = $id", {
        $id: id
    }, (err) => {
        if(err){
            console.error(err);
            return res.status(500).send("error with database");
        }

        return res.status(200).send("record deleted");
    })
})

//delete day record
router.delete("/day", (req,res) => {
    var id = req.query.id;
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