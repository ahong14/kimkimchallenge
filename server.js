// require packages
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');

//express setup
const app = express();

// parse body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// use cors;
app.use(cors());

//serve react files
app.use(express.static(path.join(__dirname, 'client/build')));

//use routes
const router = express.Router();
const editPlan = require('./routes/edit');
const newPlan = require('./routes/new');
const getPlans = require('./routes/plans');
const removePlan = require('./routes/remove');

app.use('/api/editPlan', editPlan);
app.use('/api/newPlan', newPlan);
app.use('/api/getPlans', getPlans);
app.use('/api/removePlan', removePlan);

//fix react app crashing on refresh
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// listen to requests on port
// choose port based on environment
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);
