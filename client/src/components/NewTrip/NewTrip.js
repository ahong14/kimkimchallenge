import React, { Component } from 'react';
import './NewTrip.css';
import axios from 'axios';

//Component to create new trip plan to store in database
class NewTrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            summary: ''
        }
        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.createTrip = this.createTrip.bind(this);
    }

    //update values based on when input changes
    changeSearchValue(){
        this.setState({
            title: this.titleValue.value,
            summary: this.summaryValue.value
        });
    }

    //create trip function, update database with new trip_plan record
    //executed with onClick on button after user inputs title and summary
    createTrip(){
        //input handling, determine empty queries
        if(this.state.title.trim() === '' && this.state.summary.trim() === ''){
            alert("Please enter input to create plan!");
        }

        else if (this.state.title.trim() === '' && this.state.summary.trim() != ''){
            alert("Please enter title!");
        }

        else if (this.state.title.trim() != '' && this.state.summary.trim() === ''){
            alert("Please enter summary!");
        }
        
        //create and insert trip_plan record
        else{
            var date = new Date();
            axios.post('http://localhost:4000/api/newPlan/trip', {
                params:{
                    title: this.state.title,
                    summary: this.state.summary,
                    created: date,
                    updated: date
                }
            })
            .then(res => {
                //alert result
                alert(res.data);
            })
            .catch(err => {
                alert(err);
            })

        }
    }

    render(){
        return(
            <div className = "container">
                <div className = "halign-wrapper">
                    <a href = "/trip-plans"> <button className = "waves-effect waves-light btn center-align"> Back </button> </a>
                </div>
                <div className = "center-align" id = "header">
                    <h1> Submit New Trip </h1>
                </div>

                <div id = "forms">
                    <div className = "col s12">
                        <form className = "col s12">
                            <textarea ref = {input => this.titleValue = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                            <label htmlFor = "Title"> Title </label>
                        </form> 

                        <form className = "col s12">
                            <textarea ref = {input => this.summaryValue = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                            <label htmlFor = "Summary"> Summary (Provide quick summary) </label>
                        </form>
                    </div>
                </div>

                <div className = "halign-wrapper">
                    <button className = "waves-effect waves-light btn-large center-align" onClick = {this.createTrip}> Submit </button>
                </div>
            </div>
        );  
    }
}

export default NewTrip;
