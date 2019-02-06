const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("Trips.db");

router.patch('/', (req,res) => {
    //extract params
    var tripID = req.body.params.id;
    var tripTitle = req.body.params.title;
    var dayDescription = req.body.params.summary;
    var date = new Date();
    date = date.toDateString();

    //updating summary only
    if(tripTitle.trim() === '' && dayDescription.trim() != ''){
        db.run("UPDATE trip_plans SET summary = $summary, updated_at = $updated WHERE id = $id", {
            $id: tripID,
            $summary: dayDescription,
            $updated: date
        }, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send("error with database");
            }

            else{
                return res.status(200).send("Trip Details Updated!");
            }
        })
    }

    //updating title only
    else if (tripTitle.trim() != '' && dayDescription.trim() === ''){
        db.run("UPDATE trip_plans SET title = $title, updated_at = $updated WHERE id = $id", {
            $id: tripID,
            $title: tripTitle,
            $updated: date
        }, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send("error with database");
            }

            else{
                return res.status(200).send("Trip Details Updated!");
            }
        })
    }

    //updating both title and summary
    else if (tripTitle.trim()!= '' && dayDescription.trim() != ''){
        db.run("UPDATE trip_plans SET summary = $summary , title = $title, updated_at = $updated WHERE id = $id", {
            $id: tripID,
            $summary: dayDescription,
            $title: tripTitle,
            $updated: date
        }, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send("error with database");
            }
            else{
                return res.status(200).send("Trip Details Updated!");
            }
        })
    }

    //empty search query
    else{
        return res.status(200).send("No updates with empty queries!");
    }
})

//update day
router.patch('/day', (req,res) => {
    var dayID = req.body.params.id;
    var dayTitle = req.body.params.title;
    var dayDescription = req.body.params.description;
    var date = new Date();
    date = date.toDateString();

    //updating summary only
    if(dayTitle.trim() === '' && dayDescription.trim() != ''){
        db.run("UPDATE days SET description = $description, updated_at = $updated WHERE id = $id", {
            $id: dayID,
            $description: dayDescription,
            $updated: date
        }, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send("error with database");
            }

            else{
                return res.status(200).send("Trip Details Updated!");
            }
        })
    }

    //updating title only
    else if (dayTitle.trim() != '' && dayDescription.trim() === ''){
        db.run("UPDATE days SET title = $title, updated_at = $updated WHERE id = $id", {
            $id: dayID,
            $title: dayTitle,
            $updated: date
        }, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send("error with database");
            }

            else{
                return res.status(200).send("Trip Details Updated!");
            }
        })
    }

    //updating both title and summary
    else if (dayTitle.trim()!= '' && dayDescription.trim() != ''){
        db.run("UPDATE days SET description = $description , title = $title, updated_at = $updated WHERE id = $id", {
            $id: dayID,
            $description: dayDescription,
            $title: dayTitle,
            $updated: date
        }, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send("error with database");
            }
            else{
                return res.status(200).send("Trip Details Updated!");
            }
        })
    }

    //empty search query
    else{
        return res.status(200).send("No updates with empty queries!");
    }
})

module.exports = router;